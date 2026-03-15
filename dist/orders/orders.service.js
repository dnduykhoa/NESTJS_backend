"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const cart_schema_1 = require("../carts/schemas/cart.schema");
const product_schema_1 = require("../products/schemas/product.schema");
const mail_handler_1 = require("../utils/mail.handler");
let OrdersService = class OrdersService {
    constructor(orderModel, productModel, cartModel, mailHandler) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.cartModel = cartModel;
        this.mailHandler = mailHandler;
    }
    async createOrder(userId, dto) {
        const validMethods = Object.values(order_schema_1.PaymentMethod);
        if (!validMethods.includes(dto.paymentMethod)) {
            throw new common_1.BadRequestException(`Phương thức thanh toán không hợp lệ. Hợp lệ: ${validMethods.join(', ')}`);
        }
        let sourceItems = [];
        let fromCart = false;
        if (dto.items && dto.items.length > 0) {
            sourceItems = dto.items.map((i) => ({
                productId: i.productId,
                variantId: i.variantId,
                quantity: i.quantity,
            }));
        }
        else {
            const cart = await this.cartModel
                .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
                .exec();
            if (!cart || cart.items.length === 0) {
                throw new common_1.BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng');
            }
            sourceItems = cart.items.map((item) => ({
                productId: item.product.toString(),
                variantId: item.variantId || undefined,
                quantity: item.quantity,
            }));
            fromCart = true;
        }
        const orderItems = [];
        let totalAmount = 0;
        for (const src of sourceItems) {
            const product = await this.productModel.findById(src.productId).exec();
            if (!product) {
                throw new common_1.NotFoundException(`Không tìm thấy sản phẩm ID: ${src.productId}`);
            }
            if (product.status !== product_schema_1.ProductStatus.ACTIVE) {
                throw new common_1.BadRequestException(`Sản phẩm "${product.name}" hiện không bán`);
            }
            let unitPrice = product.price;
            let variantSku = null;
            let variantOptions = [];
            let availableStock = product.stockQuantity;
            if (src.variantId) {
                const variant = product.variants?.find((v) => v._id.toString() === src.variantId);
                if (!variant) {
                    throw new common_1.NotFoundException(`Không tìm thấy biến thể ID: ${src.variantId}`);
                }
                unitPrice = variant.price ?? product.price;
                variantSku = variant.sku;
                availableStock = variant.stockQuantity;
                variantOptions = variant.values?.map((v) => v.value) ?? [];
            }
            if (src.quantity > availableStock) {
                throw new common_1.BadRequestException(`Sản phẩm "${product.name}" không đủ hàng (tồn kho: ${availableStock})`);
            }
            const subtotal = unitPrice * src.quantity;
            totalAmount += subtotal;
            orderItems.push({
                product: new mongoose_2.Types.ObjectId(src.productId),
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
        const order = new this.orderModel({
            user: new mongoose_2.Types.ObjectId(userId),
            fullName: dto.fullName,
            phone: dto.phone,
            email: dto.email || null,
            shippingAddress: dto.shippingAddress,
            note: dto.note || null,
            paymentMethod: dto.paymentMethod,
            status: order_schema_1.OrderStatus.PENDING,
            totalAmount,
            items: orderItems,
        });
        if (dto.paymentMethod === order_schema_1.PaymentMethod.VNPAY ||
            dto.paymentMethod === order_schema_1.PaymentMethod.MOMO) {
            const deadline = new Date();
            deadline.setMinutes(deadline.getMinutes() + 30);
            order.paymentDeadline = deadline;
        }
        await order.save();
        await this.deductStock(orderItems);
        if (fromCart) {
            await this.cartModel.findOneAndUpdate({ user: new mongoose_2.Types.ObjectId(userId) }, { $set: { items: [] } });
        }
        if (dto.paymentMethod === order_schema_1.PaymentMethod.CASH && dto.email) {
            await this.mailHandler.sendOrderConfirmationEmail(dto.email, order.orderCode, totalAmount);
        }
        const paymentUrl = null;
        return {
            ...this.buildOrderResponse(order),
            paymentUrl,
        };
    }
    async getOrdersByUser(userId) {
        const orders = await this.orderModel
            .find({ user: new mongoose_2.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
        return orders.map((o) => this.buildOrderResponse(o));
    }
    async getOrderById(id, userId) {
        const order = await this.orderModel.findById(id).exec();
        if (!order)
            throw new common_1.NotFoundException(`Không tìm thấy đơn hàng ID: ${id}`);
        if (userId && order.user.toString() !== userId) {
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        }
        return this.buildOrderResponse(order);
    }
    async getAllOrders() {
        const orders = await this.orderModel.find().sort({ createdAt: -1 }).exec();
        return orders.map((o) => this.buildOrderResponse(o));
    }
    async updateOrderStatus(id, dto) {
        let order = null;
        if (mongoose_2.Types.ObjectId.isValid(id)) {
            order = await this.orderModel.findById(id).exec();
        }
        if (!order) {
            order = await this.orderModel.findOne({ orderCode: id }).exec();
        }
        if (!order)
            throw new common_1.NotFoundException(`Không tìm thấy đơn hàng: ${id}`);
        const validTransitions = {
            [order_schema_1.OrderStatus.PENDING]: [order_schema_1.OrderStatus.CONFIRMED, order_schema_1.OrderStatus.CANCELLED],
            [order_schema_1.OrderStatus.CONFIRMED]: [order_schema_1.OrderStatus.SHIPPING, order_schema_1.OrderStatus.CANCELLED],
            [order_schema_1.OrderStatus.SHIPPING]: [order_schema_1.OrderStatus.DELIVERED, order_schema_1.OrderStatus.CANCELLED],
            [order_schema_1.OrderStatus.DELIVERED]: [],
            [order_schema_1.OrderStatus.CANCELLED]: [],
        };
        if (!validTransitions[order.status]?.includes(dto.status)) {
            throw new common_1.BadRequestException(`Không thể chuyển trạng thái từ ${order.status} sang ${dto.status}`);
        }
        if (dto.status === order_schema_1.OrderStatus.CANCELLED) {
            await this.restoreStock(order.items);
            order.cancelledAt = new Date();
            order.cancelReason = dto.cancelReason || null;
            if (order.email) {
                await this.mailHandler.sendOrderCancelledEmail(order.email, order.orderCode, dto.cancelReason);
            }
        }
        order.status = dto.status;
        await order.save();
        return this.buildOrderResponse(order);
    }
    async cancelOrder(id, userId, reason) {
        const order = await this.orderModel.findById(id).exec();
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        if (order.user.toString() !== userId) {
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        }
        if (order.status !== order_schema_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Chỉ có thể hủy đơn hàng đang chờ xác nhận');
        }
        await this.restoreStock(order.items);
        order.status = order_schema_1.OrderStatus.CANCELLED;
        order.cancelledAt = new Date();
        order.cancelReason = reason || null;
        await order.save();
        if (order.email) {
            await this.mailHandler.sendOrderCancelledEmail(order.email, order.orderCode, reason);
        }
        return this.buildOrderResponse(order);
    }
    async retryPayment(id, userId) {
        const order = await this.orderModel.findById(id).exec();
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        if (order.user.toString() !== userId) {
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        }
        if (order.status !== order_schema_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Chỉ có thể thanh toán lại đơn hàng đang chờ thanh toán');
        }
        if (order.paymentMethod === order_schema_1.PaymentMethod.CASH) {
            throw new common_1.BadRequestException('Đơn hàng COD không cần thanh toán lại');
        }
        const deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 30);
        order.paymentDeadline = deadline;
        await order.save();
        const paymentUrl = null;
        return {
            ...this.buildOrderResponse(order),
            paymentUrl,
        };
    }
    async expireUnpaidOrders() {
        const now = new Date();
        const expiredOrders = await this.orderModel
            .find({
            status: order_schema_1.OrderStatus.PENDING,
            paymentMethod: { $in: [order_schema_1.PaymentMethod.VNPAY, order_schema_1.PaymentMethod.MOMO] },
            paymentDeadline: { $lt: now },
        })
            .exec();
        for (const order of expiredOrders) {
            await this.restoreStock(order.items);
            order.status = order_schema_1.OrderStatus.CANCELLED;
            order.cancelledAt = now;
            order.cancelReason = 'Hết hạn thanh toán tự động';
            await order.save();
            if (order.email) {
                await this.mailHandler.sendPaymentExpiredEmail(order.email, order.orderCode);
            }
        }
    }
    async deductStock(items) {
        for (const item of items) {
            const product = await this.productModel.findById(item.product).exec();
            if (!product)
                continue;
            if (item.variantId) {
                const variantIndex = product.variants.findIndex((v) => v._id.toString() === item.variantId);
                if (variantIndex >= 0) {
                    product.variants[variantIndex].stockQuantity = Math.max(0, product.variants[variantIndex].stockQuantity - item.quantity);
                }
            }
            else {
                product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
                if (product.stockQuantity === 0) {
                    product.status = product_schema_1.ProductStatus.OUT_OF_STOCK;
                }
            }
            product.markModified('variants');
            await product.save();
        }
    }
    async restoreStock(items) {
        for (const item of items) {
            const product = await this.productModel.findById(item.product).exec();
            if (!product)
                continue;
            if (item.variantId) {
                const variantIndex = product.variants.findIndex((v) => v._id.toString() === item.variantId);
                if (variantIndex >= 0) {
                    product.variants[variantIndex].stockQuantity += item.quantity;
                }
            }
            else {
                product.stockQuantity += item.quantity;
                if (product.status === product_schema_1.ProductStatus.OUT_OF_STOCK &&
                    product.stockQuantity > 0) {
                    product.status = product_schema_1.ProductStatus.ACTIVE;
                }
            }
            product.markModified('variants');
            await product.save();
        }
    }
    buildOrderResponse(order) {
        const obj = order.toObject
            ? order.toObject({ virtuals: true })
            : order;
        return obj;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __param(2, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mail_handler_1.MailHandler])
], OrdersService);
//# sourceMappingURL=orders.service.js.map