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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnpayService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let VnpayService = class VnpayService {
    constructor() {
        this.tmnCode = process.env.VNPAY_TMN_CODE || '';
        this.hashSecret = process.env.VNPAY_HASH_SECRET || '';
        this.baseUrl =
            process.env.VNPAY_BASE_URL ||
                'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        this.returnUrl = process.env.VNPAY_RETURN_URL || '';
    }
    createPaymentUrl(orderId, orderCode, amount, ipAddr, orderInfo) {
        const createDate = this.formatDate(new Date());
        const params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.tmnCode,
            vnp_Amount: String(Math.round(amount * 100)),
            vnp_CreateDate: createDate,
            vnp_CurrCode: 'VND',
            vnp_IpAddr: ipAddr,
            vnp_Locale: 'vn',
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: 'other',
            vnp_ReturnUrl: this.returnUrl,
            vnp_TxnRef: orderCode,
        };
        const sortedKeys = Object.keys(params).sort();
        const sortedParams = {};
        for (const key of sortedKeys) {
            sortedParams[key] = params[key];
        }
        const signData = sortedKeys.map((k) => `${k}=${sortedParams[k]}`).join('&');
        const signed = this.hmacSHA512(this.hashSecret, signData);
        const finalQueryString = signData + `&vnp_SecureHash=${signed}`;
        return `${this.baseUrl}?${finalQueryString}`;
    }
    verifyCallback(query) {
        const vnpSecureHash = query['vnp_SecureHash'];
        const queryData = { ...query };
        delete queryData['vnp_SecureHash'];
        delete queryData['vnp_SecureHashType'];
        const sortedKeys = Object.keys(queryData).sort();
        const signData = sortedKeys.map((k) => `${k}=${queryData[k]}`).join('&');
        const signed = this.hmacSHA512(this.hashSecret, signData);
        const orderCode = query['vnp_TxnRef'] || '';
        const responseCode = query['vnp_ResponseCode'];
        if (signed !== vnpSecureHash) {
            return { success: false, orderCode, message: 'Chữ ký không hợp lệ' };
        }
        if (responseCode !== '00') {
            return {
                success: false,
                orderCode,
                message: `Thanh toán thất bại (mã lỗi: ${responseCode})`,
            };
        }
        return { success: true, orderCode, message: 'Thanh toán thành công' };
    }
    hmacSHA512(key, data) {
        return crypto.createHmac('sha512', key).update(data).digest('hex');
    }
    formatDate(date) {
        const pad = (n) => String(n).padStart(2, '0');
        return (date.getFullYear().toString() +
            pad(date.getMonth() + 1) +
            pad(date.getDate()) +
            pad(date.getHours()) +
            pad(date.getMinutes()) +
            pad(date.getSeconds()));
    }
};
exports.VnpayService = VnpayService;
exports.VnpayService = VnpayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VnpayService);
//# sourceMappingURL=vnpay.service.js.map