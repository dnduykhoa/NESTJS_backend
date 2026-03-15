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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./schemas/cart.schema");
const product_schema_1 = require("../products/schemas/product.schema");
let CartsService = class CartsService {
    constructor(cartModel, productModel) {
        this.cartModel = cartModel;
        this.productModel = productModel;
    }
    async getOrCreateCart(userId) {
        let cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate('items.product')
            .exec();
        if (!cart) {
            const newCart = new this.cartModel({
                user: new mongoose_2.Types.ObjectId(userId),
                items: [],
            });
            await newCart.save();
            cart = await this.cartModel
                .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
                .populate('items.product')
                .exec();
        }
        return cart;
    }
    async getCartByUserId(userId) {
        const cart = await this.getOrCreateCart(userId);
        return this.buildCartResponse(cart);
    }
    async addToCart(userId, dto) {
        let cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        if (!cart) {
            cart = new this.cartModel({ user: new mongoose_2.Types.ObjectId(userId), items: [] });
            await cart.save();
        }
        const product = await this.productModel.findById(dto.productId).exec();
        if (!product)
            throw new common_1.NotFoundException(`Không tìm thấy sản phẩm với ID: ${dto.productId}`);
        if (product.status !== product_schema_1.ProductStatus.ACTIVE) {
            throw new common_1.BadRequestException('Sản phẩm không có sẵn để thêm vào giỏ hàng');
        }
        const availableStock = this.getAvailableStock(product, dto.variantId);
        if (availableStock <= 0) {
            throw new common_1.BadRequestException('Sản phẩm hiện đã hết hàng');
        }
        let variantSku = null;
        if (dto.variantId) {
            const variant = product.variants?.find((v) => v._id.toString() === dto.variantId);
            if (!variant)
                throw new common_1.NotFoundException('Không tìm thấy biến thể sản phẩm');
            variantSku = variant.sku;
        }
        const existingItemIndex = cart.items.findIndex((item) => {
            const sameProduct = item.product.toString() === dto.productId;
            const sameVariant = (!item.variantId && !dto.variantId) ||
                (item.variantId && dto.variantId && item.variantId === dto.variantId);
            return sameProduct && sameVariant;
        });
        if (existingItemIndex >= 0) {
            const currentQty = cart.items[existingItemIndex].quantity;
            const newQty = currentQty + dto.quantity;
            if (newQty > availableStock) {
                throw new common_1.BadRequestException(`Không đủ hàng. Tồn kho hiện tại: ${availableStock}, số lượng trong giỏ: ${currentQty}`);
            }
            cart.items[existingItemIndex].quantity = newQty;
        }
        else {
            if (dto.quantity > availableStock) {
                throw new common_1.BadRequestException(`Không đủ hàng. Tồn kho hiện tại: ${availableStock}`);
            }
            cart.items.push({
                product: new mongoose_2.Types.ObjectId(dto.productId),
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
    async updateCartItem(userId, itemId, dto) {
        const cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        if (!cart)
            throw new common_1.NotFoundException('Không tìm thấy giỏ hàng');
        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            throw new common_1.NotFoundException('Không tìm thấy sản phẩm trong giỏ hàng');
        }
        if (dto.quantity === 0) {
            cart.items.splice(itemIndex, 1);
        }
        else {
            const item = cart.items[itemIndex];
            const product = await this.productModel.findById(item.product).exec();
            if (product) {
                const availableStock = this.getAvailableStock(product, item.variantId);
                if (dto.quantity > availableStock) {
                    throw new common_1.BadRequestException(`Không đủ hàng. Tồn kho hiện tại: ${availableStock}`);
                }
            }
            cart.items[itemIndex].quantity = dto.quantity;
        }
        await cart.save();
        const updatedCart = await this.cartModel
            .findById(cart._id)
            .populate('items.product')
            .exec();
        return this.buildCartResponse(updatedCart);
    }
    async removeCartItem(userId, itemId) {
        const cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        if (!cart)
            throw new common_1.NotFoundException('Không tìm thấy giỏ hàng');
        cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
        await cart.save();
        const updatedCart = await this.cartModel
            .findById(cart._id)
            .populate('items.product')
            .exec();
        return this.buildCartResponse(updatedCart);
    }
    async clearCart(userId) {
        const cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .exec();
        if (!cart)
            throw new common_1.NotFoundException('Không tìm thấy giỏ hàng');
        cart.items = [];
        await cart.save();
        return this.buildCartResponse(cart);
    }
    async validateCartForCheckout(userId) {
        const cart = await this.cartModel
            .findOne({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate('items.product')
            .exec();
        if (!cart || cart.items.length === 0) {
            return { valid: false, issues: [{ productId: '', message: 'Giỏ hàng trống' }] };
        }
        const issues = [];
        for (const item of cart.items) {
            const product = item.product;
            if (!product) {
                issues.push({
                    productId: item.product?.toString() || '',
                    message: 'Sản phẩm không tồn tại',
                });
                continue;
            }
            if (product.status !== product_schema_1.ProductStatus.ACTIVE) {
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
    buildCartResponse(cart) {
        if (!cart)
            return { items: [], totalItems: 0, totalAmount: 0 };
        const items = cart.items.map((item) => {
            const product = item.product;
            let unitPrice = 0;
            if (product) {
                if (item.variantId) {
                    const variant = product.variants?.find((v) => v._id.toString() === item.variantId);
                    unitPrice = variant?.price ?? product.price ?? 0;
                }
                else {
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
            _id: cart._id,
            user: cart.user,
            items,
            totalItems,
            totalAmount,
        };
    }
    getAvailableStock(product, variantId) {
        if (variantId) {
            const variant = product.variants?.find((v) => v._id.toString() === variantId);
            return variant?.stockQuantity ?? 0;
        }
        return product.stockQuantity ?? 0;
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartsService);
//# sourceMappingURL=carts.service.js.map