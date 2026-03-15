import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartItem } from './schemas/cart.schema';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';
import { ProductStatus } from '../products/schemas/product.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel('Product') private readonly productModel: Model<any>,
  ) {}

  async getOrCreateCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('items.product')
      .exec();

    if (!cart) {
      const newCart = new this.cartModel({
        user: new Types.ObjectId(userId),
        items: [],
      });
      await newCart.save();
      cart = await this.cartModel
        .findOne({ user: new Types.ObjectId(userId) })
        .populate('items.product')
        .exec();
    }

    return cart;
  }

  async getCartByUserId(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return this.buildCartResponse(cart);
  }

  async addToCart(userId: string, dto: AddCartItemDto) {
    // Work on unpopulated cart for mutation
    let cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .exec();

    if (!cart) {
      cart = new this.cartModel({ user: new Types.ObjectId(userId), items: [] });
      await cart.save();
    }

    // Check product exists and is ACTIVE
    const product = await this.productModel.findById(dto.productId).exec();
    if (!product) throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${dto.productId}`);
    if (product.status !== ProductStatus.ACTIVE) {
      throw new BadRequestException('Sản phẩm không có sẵn để thêm vào giỏ hàng');
    }

    // Get available stock
    const availableStock = this.getAvailableStock(product, dto.variantId);
    if (availableStock <= 0) {
      throw new BadRequestException('Sản phẩm hiện đã hết hàng');
    }

    // Get variant SKU if variantId provided
    let variantSku: string | null = null;
    if (dto.variantId) {
      const variant = product.variants?.find(
        (v: any) => v._id.toString() === dto.variantId,
      );
      if (!variant) throw new NotFoundException('Không tìm thấy biến thể sản phẩm');
      variantSku = variant.sku;
    }

    // Find existing cart item: same productId AND variantId
    const existingItemIndex = (cart.items as any[]).findIndex((item: CartItem) => {
      const sameProduct = item.product.toString() === dto.productId;
      const sameVariant =
        (!item.variantId && !dto.variantId) ||
        (item.variantId && dto.variantId && item.variantId === dto.variantId);
      return sameProduct && sameVariant;
    });

    if (existingItemIndex >= 0) {
      const currentQty = (cart.items as any[])[existingItemIndex].quantity;
      const newQty = currentQty + dto.quantity;
      if (newQty > availableStock) {
        throw new BadRequestException(
          `Không đủ hàng. Tồn kho hiện tại: ${availableStock}, số lượng trong giỏ: ${currentQty}`,
        );
      }
      (cart.items as any[])[existingItemIndex].quantity = newQty;
    } else {
      if (dto.quantity > availableStock) {
        throw new BadRequestException(`Không đủ hàng. Tồn kho hiện tại: ${availableStock}`);
      }
      (cart.items as any[]).push({
        product: new Types.ObjectId(dto.productId),
        variantId: dto.variantId || null,
        variantSku,
        quantity: dto.quantity,
        addedAt: new Date(),
      });
    }

    await cart.save();

    const updatedCart = await this.cartModel
      .findById(cart._id)
      .populate('items.product')
      .exec();
    return this.buildCartResponse(updatedCart);
  }

  async updateCartItem(userId: string, itemId: string, dto: UpdateCartItemDto) {
    const cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .exec();
    if (!cart) throw new NotFoundException('Không tìm thấy giỏ hàng');

    const itemIndex = (cart.items as any[]).findIndex(
      (item) => item._id.toString() === itemId,
    );
    if (itemIndex === -1) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong giỏ hàng');
    }

    if (dto.quantity === 0) {
      (cart.items as any[]).splice(itemIndex, 1);
    } else {
      const item = (cart.items as any[])[itemIndex];
      const product = await this.productModel.findById(item.product).exec();
      if (product) {
        const availableStock = this.getAvailableStock(product, item.variantId);
        if (dto.quantity > availableStock) {
          throw new BadRequestException(
            `Không đủ hàng. Tồn kho hiện tại: ${availableStock}`,
          );
        }
      }
      (cart.items as any[])[itemIndex].quantity = dto.quantity;
    }

    await cart.save();

    const updatedCart = await this.cartModel
      .findById(cart._id)
      .populate('items.product')
      .exec();
    return this.buildCartResponse(updatedCart);
  }

  async removeCartItem(userId: string, itemId: string) {
    const cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .exec();
    if (!cart) throw new NotFoundException('Không tìm thấy giỏ hàng');

    (cart as any).items = (cart.items as any[]).filter(
      (item) => item._id.toString() !== itemId,
    );

    await cart.save();

    const updatedCart = await this.cartModel
      .findById(cart._id)
      .populate('items.product')
      .exec();
    return this.buildCartResponse(updatedCart);
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .exec();
    if (!cart) throw new NotFoundException('Không tìm thấy giỏ hàng');

    (cart as any).items = [];
    await cart.save();
    return this.buildCartResponse(cart);
  }

  async validateCartForCheckout(userId: string): Promise<{
    valid: boolean;
    issues: { productId: string; message: string }[];
  }> {
    const cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('items.product')
      .exec();

    if (!cart || cart.items.length === 0) {
      return { valid: false, issues: [{ productId: '', message: 'Giỏ hàng trống' }] };
    }

    const issues: { productId: string; message: string }[] = [];

    for (const item of cart.items as any[]) {
      const product = item.product;
      if (!product) {
        issues.push({
          productId: item.product?.toString() || '',
          message: 'Sản phẩm không tồn tại',
        });
        continue;
      }

      if (product.status !== ProductStatus.ACTIVE) {
        issues.push({
          productId: product._id.toString(),
          message: `Sản phẩm "${product.name}" hiện không còn bán`,
        });
        continue;
      }

      const availableStock = this.getAvailableStock(product, item.variantId);
      if (item.quantity > availableStock) {
        issues.push({
          productId: product._id.toString(),
          message: `Sản phẩm "${product.name}" không đủ số lượng (tồn kho: ${availableStock})`,
        });
      }
    }

    return { valid: issues.length === 0, issues };
  }

  private buildCartResponse(cart: CartDocument | null) {
    if (!cart) return { items: [], totalItems: 0, totalAmount: 0 };

    const items = (cart.items as any[]).map((item) => {
      const product = item.product as any;
      let unitPrice = 0;

      if (product) {
        if (item.variantId) {
          const variant = product.variants?.find(
            (v: any) => v._id.toString() === item.variantId,
          );
          unitPrice = variant?.price ?? product.price ?? 0;
        } else {
          unitPrice = product.price ?? 0;
        }
      }

      return {
        _id: item._id,
        product,
        variantId: item.variantId,
        variantSku: item.variantSku,
        quantity: item.quantity,
        unitPrice,
        subtotal: unitPrice * item.quantity,
        addedAt: item.addedAt,
      };
    });

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce((sum, i) => sum + i.subtotal, 0);

    return {
      _id: (cart as any)._id,
      user: cart.user,
      items,
      totalItems,
      totalAmount,
    };
  }

  private getAvailableStock(product: any, variantId?: string | null): number {
    if (variantId) {
      const variant = product.variants?.find(
        (v: any) => v._id.toString() === variantId,
      );
      return variant?.stockQuantity ?? 0;
    }
    return product.stockQuantity ?? 0;
  }
}
