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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const vnpay_service_1 = require("./services/vnpay.service");
const momo_service_1 = require("./services/momo.service");
const orders_service_1 = require("../orders/orders.service");
const order_schema_1 = require("../orders/schemas/order.schema");
let PaymentsController = class PaymentsController {
    constructor(vnpayService, momoService, ordersService) {
        this.vnpayService = vnpayService;
        this.momoService = momoService;
        this.ordersService = ordersService;
    }
    async vnpayCallback(query, res) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        try {
            const result = this.vnpayService.verifyCallback(query);
            if (result.success) {
                try {
                    await this.ordersService.updateOrderStatus(result.orderCode, {
                        status: order_schema_1.OrderStatus.CONFIRMED,
                    });
                }
                catch (err) {
                    console.error('Failed to confirm order after VNPAY payment:', err);
                }
                return res.redirect(`${frontendUrl}/payment/success?orderCode=${encodeURIComponent(result.orderCode)}`);
            }
            else {
                return res.redirect(`${frontendUrl}/payment/failure?orderCode=${encodeURIComponent(result.orderCode)}&message=${encodeURIComponent(result.message)}`);
            }
        }
        catch (e) {
            return res.redirect(`${frontendUrl}/payment/failure?message=${encodeURIComponent(e.message)}`);
        }
    }
    async momoCallback(query, res) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        try {
            const result = this.momoService.verifyCallback(query);
            if (result.success) {
                try {
                    await this.ordersService.updateOrderStatus(result.orderCode, {
                        status: order_schema_1.OrderStatus.CONFIRMED,
                    });
                }
                catch (err) {
                    console.error('Failed to confirm order after MoMo payment:', err);
                }
                return res.redirect(`${frontendUrl}/payment/success?orderCode=${encodeURIComponent(result.orderCode)}`);
            }
            else {
                return res.redirect(`${frontendUrl}/payment/failure?orderCode=${encodeURIComponent(result.orderCode)}&message=${encodeURIComponent(result.message)}`);
            }
        }
        catch (e) {
            return res.redirect(`${frontendUrl}/payment/failure?message=${encodeURIComponent(e.message)}`);
        }
    }
    async momoIpn(body, res) {
        try {
            const result = this.momoService.verifyCallback(body);
            if (result.success) {
                try {
                    await this.ordersService.updateOrderStatus(result.orderCode, {
                        status: order_schema_1.OrderStatus.CONFIRMED,
                    });
                }
                catch (err) {
                    console.error('Failed to confirm order after MoMo IPN:', err);
                }
            }
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        }
        catch (e) {
            console.error('MoMo IPN processing error:', e);
            return res.status(common_1.HttpStatus.NO_CONTENT).send();
        }
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)('vnpay/callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "vnpayCallback", null);
__decorate([
    (0, common_1.Get)('momo/callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "momoCallback", null);
__decorate([
    (0, common_1.Post)('momo/ipn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "momoIpn", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => orders_service_1.OrdersService))),
    __metadata("design:paramtypes", [vnpay_service_1.VnpayService,
        momo_service_1.MomoService,
        orders_service_1.OrdersService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map