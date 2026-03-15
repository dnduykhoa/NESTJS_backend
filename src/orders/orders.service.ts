import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderStatus, PaymentMethod } from './schemas/order.schema';
import { Cart, CartDocument } from '../carts/schemas/cart.schema';
import { ProductStatus } from '../products/schemas/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { MailHandler } from '../utils/mail.handler';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel('Product') private readonly productModel: Model<any>,
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private readonly mailHandler: MailHandler,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<any> {
    // Validate paymentMethod
    const validMethods = Object.values(PaymentMethod);
    if (!validMethods.includes(dto.paymentMethod as PaymentMethod)) {
      throw new BadRequestException(
        `Phương thức thanh toán không hợp lệ. Hợp lệ: ${validMethods.join(', ')}`,
      );
    }

    let sourceItems: { productId: string; variantId?: string; quantity: number }[] = [];
    let fromCart = false;

    if (dto.items && dto.items.length > 0) {
      sourceItems = dto.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
    } else {
      // Get cart for userId
      const cart = await this.cartModel
        .findOne({ user: new Types.ObjectId(userId) })
        .exec();
      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng');
      }
      sourceItems = (cart.items as any[]).map((item) => ({
        productId: item.product.toString(),
        variantId: item.variantId || undefined,
        quantity: item.quantity,
      }));
      fromCart = true;
    }

    // Build order items with stock validation
    const orderItems: any[] = [];
    let totalAmount = 0;

    for (const src of sourceItems) {
      const product = await this.productModel.findById(src.productId).exec();
      if (!product) {
        throw new NotFoundException(`Không tìm thấy sản phẩm ID: ${src.productId}`);
      }
      if (product.status !== ProductStatus.ACTIVE) {
        throw new BadRequestException(`Sản phẩm "${product.name}" hiện không bán`);
      }

      let unitPrice: number = product.price;
      let variantSku: string | null = null;
      let variantOptions: string[] = [];
      let availableStock: number = product.stockQuantity;

      if (src.variantId) {
        const variant = product.variants?.find(
          (v: any) => v._id.toString() === src.variantId,
        );
        if (!variant) {
          throw new NotFoundException(`Không tìm thấy biến thể ID: ${src.variantId}`);
        }
        unitPrice = variant.price ?? product.price;
        variantSku = variant.sku;
        availableStock = variant.stockQuantity;
        variantOptions = variant.values?.map((v: any) => v.value) ?? [];
      }

      if (src.quantity > availableStock) {
        throw new BadRequestException(
          `Sản phẩm "${product.name}" không đủ hàng (tồn kho: ${availableStock})`,
        );
      }

      const subtotal = unitPrice * src.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: new Types.ObjectId(src.productId),
        productName: product.name,
        productImageUrl: product.media?.[0]?.mediaUrl ?? null,
        variantId: src.variantId || null,
        variantSku,
        variantOptions,
        quantity: src.quantity,
        unitPrice,
        subtotal,
      });
    }

    // Create order with PENDING status
    const order = new this.orderModel({
      user: new Types.ObjectId(userId),
      fullName: dto.fullName,
      phone: dto.phone,
      email: dto.email || null,
      shippingAddress: dto.shippingAddress,
      note: dto.note || null,
      paymentMethod: dto.paymentMethod,
      status: OrderStatus.PENDING,
      totalAmount,
      items: orderItems,
    });

    // Set payment deadline for online payments
    if (
      dto.paymentMethod === PaymentMethod.VNPAY ||
      dto.paymentMethod === PaymentMethod.MOMO
    ) {
      const deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + 30);
      order.paymentDeadline = deadline;
    }

    await order.save();

    // Deduct stock
    await this.deductStock(orderItems);

    // If from cart: clear cart items
    if (fromCart) {
      await this.cartModel.findOneAndUpdate(
        { user: new Types.ObjectId(userId) },
        { $set: { items: [] } },
      );
    }

    // Send confirmation email for CASH orders
    if (dto.paymentMethod === PaymentMethod.CASH && dto.email) {
      await this.mailHandler.sendOrderConfirmationEmail(
        dto.email,
        order.orderCode,
        totalAmount,
      );
    }

    // For VNPAY/MOMO: return stub paymentUrl (TODO: integrate payment services)
    const paymentUrl: string | null = null;

    return {
      ...this.buildOrderResponse(order),
      paymentUrl,
    };
  }

  async getOrdersByUser(userId: string): Promise<any[]> {
    const orders = await this.orderModel
      .find({ user: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
    return orders.map((o) => this.buildOrderResponse(o));
  }

  async getOrderById(id: string, userId?: string): Promise<any> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException(`Không tìm thấy đơn hàng ID: ${id}`);
    if (userId && order.user.toString() !== userId) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return this.buildOrderResponse(order);
  }

  async getAllOrders(): Promise<any[]> {
    const orders = await this.orderModel.find().sort({ createdAt: -1 }).exec();
    return orders.map((o) => this.buildOrderResponse(o));
  }

  async updateOrderStatus(id: string, dto: UpdateOrderStatusDto): Promise<any> {
    // Support lookup by MongoDB ObjectId or by orderCode string
    let order: OrderDocument | null = null;
    if (Types.ObjectId.isValid(id)) {
      order = await this.orderModel.findById(id).exec();
    }
    if (!order) {
      order = await this.orderModel.findOne({ orderCode: id }).exec();
    }
    if (!order) throw new NotFoundException(`Không tìm thấy đơn hàng: ${id}`);

    const validTransitions: Record<string, string[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPING]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!validTransitions[order.status]?.includes(dto.status)) {
      throw new BadRequestException(
        `Không thể chuyển trạng thái từ ${order.status} sang ${dto.status}`,
      );
    }

    if (dto.status === OrderStatus.CANCELLED) {
      await this.restoreStock(order.items as any[]);
      order.cancelledAt = new Date();
      order.cancelReason = dto.cancelReason || null;
      if (order.email) {
        await this.mailHandler.sendOrderCancelledEmail(
          order.email,
          order.orderCode,
          dto.cancelReason,
        );
      }
    }

    order.status = dto.status as OrderStatus;
    await order.save();
    return this.buildOrderResponse(order);
  }

  async cancelOrder(id: string, userId: string, reason?: string): Promise<any> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    if (order.user.toString() !== userId) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Chỉ có thể hủy đơn hàng đang chờ xác nhận');
    }

    await this.restoreStock(order.items as any[]);
    order.status = OrderStatus.CANCELLED;
    order.cancelledAt = new Date();
    order.cancelReason = reason || null;
    await order.save();

    if (order.email) {
      await this.mailHandler.sendOrderCancelledEmail(order.email, order.orderCode, reason);
    }

    return this.buildOrderResponse(order);
  }

  async retryPayment(id: string, userId: string): Promise<any> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    if (order.user.toString() !== userId) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Chỉ có thể thanh toán lại đơn hàng đang chờ thanh toán');
    }
    if (order.paymentMethod === PaymentMethod.CASH) {
      throw new BadRequestException('Đơn hàng COD không cần thanh toán lại');
    }

    // Extend payment deadline
    const deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 30);
    order.paymentDeadline = deadline;
    await order.save();

    // TODO: regenerate payment URL from VnpayService/MomoService
    const paymentUrl: string | null = null;

    return {
      ...this.buildOrderResponse(order),
      paymentUrl,
    };
  }

  async expireUnpaidOrders(): Promise<void> {
    const now = new Date();
    const expiredOrders = await this.orderModel
      .find({
        status: OrderStatus.PENDING,
        paymentMethod: { $in: [PaymentMethod.VNPAY, PaymentMethod.MOMO] },
        paymentDeadline: { $lt: now },
      })
      .exec();

    for (const order of expiredOrders) {
      await this.restoreStock(order.items as any[]);
      order.status = OrderStatus.CANCELLED;
      order.cancelledAt = now;
      order.cancelReason = 'Hết hạn thanh toán tự động';
      await order.save();

      if (order.email) {
        await this.mailHandler.sendPaymentExpiredEmail(order.email, order.orderCode);
      }
    }
  }

  private async deductStock(items: any[]): Promise<void> {
    for (const item of items) {
      const product = await this.productModel.findById(item.product).exec();
      if (!product) continue;

      if (item.variantId) {
        const variantIndex = product.variants.findIndex(
          (v: any) => v._id.toString() === item.variantId,
        );
        if (variantIndex >= 0) {
          product.variants[variantIndex].stockQuantity = Math.max(
            0,
            product.variants[variantIndex].stockQuantity - item.quantity,
          );
        }
      } else {
        product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
        if (product.stockQuantity === 0) {
          product.status = ProductStatus.OUT_OF_STOCK;
        }
      }

      product.markModified('variants');
      await product.save();
    }
  }

  private async restoreStock(items: any[]): Promise<void> {
    for (const item of items) {
      const product = await this.productModel.findById(item.product).exec();
      if (!product) continue;

      if (item.variantId) {
        const variantIndex = product.variants.findIndex(
          (v: any) => v._id.toString() === item.variantId,
        );
        if (variantIndex >= 0) {
          product.variants[variantIndex].stockQuantity += item.quantity;
        }
      } else {
        product.stockQuantity += item.quantity;
        if (
          product.status === ProductStatus.OUT_OF_STOCK &&
          product.stockQuantity > 0
        ) {
          product.status = ProductStatus.ACTIVE;
        }
      }

      product.markModified('variants');
      await product.save();
    }
  }

  private buildOrderResponse(order: OrderDocument): any {
    const obj = (order as any).toObject
      ? (order as any).toObject({ virtuals: true })
      : order;
    return obj;
  }
}
