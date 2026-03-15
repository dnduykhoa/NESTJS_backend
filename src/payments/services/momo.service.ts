import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as https from 'https';

@Injectable()
export class MomoService {
  private readonly partnerCode: string;
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly apiUrl: string;
  private readonly returnUrl: string;
  private readonly ipnUrl: string;

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

  async createPaymentUrl(
    orderId: string,
    orderCode: string,
    amount: number,
  ): Promise<string> {
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
    } catch (error) {
      console.error('MoMo createPaymentUrl error:', error);
      throw new Error('Không thể tạo URL thanh toán MoMo');
    }
  }

  verifyCallback(body: any): {
    success: boolean;
    orderCode: string;
    message: string;
  } {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature: receivedSignature,
    } = body;

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

  private hmacSHA256(key: string, data: string): string {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
  }

  /** Minimal HTTPS POST using built-in Node.js https module (no axios needed) */
  private httpPost(url: string, body: string): Promise<string> {
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
}
