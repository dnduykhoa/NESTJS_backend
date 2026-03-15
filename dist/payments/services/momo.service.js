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
exports.MomoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const https = require("https");
let MomoService = class MomoService {
    constructor() {
        this.partnerCode = process.env.MOMO_PARTNER_CODE || '';
        this.accessKey = process.env.MOMO_ACCESS_KEY || '';
        this.secretKey = process.env.MOMO_SECRET_KEY || '';
        this.apiUrl =
            process.env.MOMO_API_URL ||
                'https://test-payment.momo.vn/v2/gateway/api/create';
        this.returnUrl = process.env.MOMO_RETURN_URL || '';
        this.ipnUrl = process.env.MOMO_IPN_URL || '';
    }
    async createPaymentUrl(orderId, orderCode, amount) {
        const requestId = `${this.partnerCode}-${Date.now()}`;
        const orderInfo = `Thanh toan don hang ${orderCode}`;
        const extraData = '';
        const requestType = 'captureWallet';
        const rawSignature = [
            `accessKey=${this.accessKey}`,
            `amount=${amount}`,
            `extraData=${extraData}`,
            `ipnUrl=${this.ipnUrl}`,
            `orderId=${orderCode}`,
            `orderInfo=${orderInfo}`,
            `partnerCode=${this.partnerCode}`,
            `redirectUrl=${this.returnUrl}`,
            `requestId=${requestId}`,
            `requestType=${requestType}`,
        ].join('&');
        const signature = this.hmacSHA256(this.secretKey, rawSignature);
        const requestBody = JSON.stringify({
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId,
            amount,
            orderId: orderCode,
            orderInfo,
            redirectUrl: this.returnUrl,
            ipnUrl: this.ipnUrl,
            extraData,
            requestType,
            signature,
            lang: 'vi',
        });
        try {
            const responseData = await this.httpPost(this.apiUrl, requestBody);
            const parsed = JSON.parse(responseData);
            if (!parsed.payUrl) {
                throw new Error(parsed.message || 'Không nhận được payUrl từ MoMo');
            }
            return parsed.payUrl;
        }
        catch (error) {
            console.error('MoMo createPaymentUrl error:', error);
            throw new Error('Không thể tạo URL thanh toán MoMo');
        }
    }
    verifyCallback(body) {
        const { partnerCode, orderId, requestId, amount, orderInfo, orderType, transId, resultCode, message, payType, responseTime, extraData, signature: receivedSignature, } = body;
        const rawSignature = [
            `accessKey=${this.accessKey}`,
            `amount=${amount}`,
            `extraData=${extraData}`,
            `message=${message}`,
            `orderId=${orderId}`,
            `orderInfo=${orderInfo}`,
            `orderType=${orderType}`,
            `partnerCode=${partnerCode}`,
            `payType=${payType}`,
            `requestId=${requestId}`,
            `responseTime=${responseTime}`,
            `resultCode=${resultCode}`,
            `transId=${transId}`,
        ].join('&');
        const computedSignature = this.hmacSHA256(this.secretKey, rawSignature);
        if (computedSignature !== receivedSignature) {
            return {
                success: false,
                orderCode: orderId || '',
                message: 'Chữ ký không hợp lệ',
            };
        }
        const code = Number(resultCode);
        if (code !== 0) {
            return {
                success: false,
                orderCode: orderId || '',
                message: `Thanh toán thất bại (mã lỗi: ${resultCode})`,
            };
        }
        return { success: true, orderCode: orderId || '', message: 'Thanh toán thành công' };
    }
    hmacSHA256(key, data) {
        return crypto.createHmac('sha256', key).update(data).digest('hex');
    }
    httpPost(url, body) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname + urlObj.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                },
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => (data += chunk));
                res.on('end', () => resolve(data));
            });
            req.on('error', reject);
            req.write(body);
            req.end();
        });
    }
};
exports.MomoService = MomoService;
exports.MomoService = MomoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MomoService);
//# sourceMappingURL=momo.service.js.map