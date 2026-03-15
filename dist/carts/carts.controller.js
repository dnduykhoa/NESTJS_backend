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
exports.CartsController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const cart_item_dto_1 = require("./dto/cart-item.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let CartsController = class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async getCart(userId, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const cart = await this.cartsService.getCartByUserId(userId);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy giỏ hàng thành công', cart));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async validateCart(userId, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const result = await this.cartsService.validateCartForCheckout(userId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Kiểm tra giỏ hàng thành công', result));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async addItem(userId, dto, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const cart = await this.cartsService.addToCart(userId, dto);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Thêm sản phẩm vào giỏ hàng thành công', cart));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateItem(userId, itemId, dto, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const cart = await this.cartsService.updateCartItem(userId, itemId, dto);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật giỏ hàng thành công', cart));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async removeItem(userId, itemId, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const cart = await this.cartsService.removeCartItem(userId, itemId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa sản phẩm khỏi giỏ hàng thành công', cart));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async clearCart(userId, res) {
        try {
            if (!userId)
                throw new Error('userId là bắt buộc');
            const cart = await this.cartsService.clearCart(userId);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa toàn bộ giỏ hàng thành công', cart));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getCart", null);
__decorate([
    (0, common_1.Get)('validate'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "validateCart", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cart_item_dto_1.AddCartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)('items/:itemId'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, cart_item_dto_1.UpdateCartItemDto, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:itemId'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "clearCart", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map