import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class VnpayService {
  private readonly tmnCode: string;
  private readonly hashSecret: string;
  private readonly baseUrl: string;
  private readonly returnUrl: string;

  constructor() {
    this.tmnCode = process.env.VNPAY_TMN_CODE || '';
    this.hashSecret = process.env.VNPAY_HASH_SECRET || '';
    this.baseUrl =
      process.env.VNPAY_BASE_URL ||
      'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    this.returnUrl = process.env.VNPAY_RETURN_URL || '';
  }

  createPaymentUrl(
    orderId: string,
    orderCode: string,
    amount: number,
    ipAddr: string,
    orderInfo: string,
  ): string {
    const createDate = this.formatDate(new Date());

    const params: Record<string, string> = {
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

    // Sort params alphabetically (TreeMap equivalent)
    const sortedKeys = Object.keys(params).sort();
    const sortedParams: Record<string, string> = {};
    for (const key of sortedKeys) {
      sortedParams[key] = params[key];
    }

    // Build query string and sign
    const signData = sortedKeys.map((k) => `${k}=${sortedParams[k]}`).join('&');
    const signed = this.hmacSHA512(this.hashSecret, signData);

    const finalQueryString =
      signData + `&vnp_SecureHash=${signed}`;

    return `${this.baseUrl}?${finalQueryString}`;
  }

  verifyCallback(query: any): {
    success: boolean;
    orderCode: string;
    message: string;
  } {
    const vnpSecureHash = query['vnp_SecureHash'];
    const queryData: Record<string, string> = { ...query };
    delete queryData['vnp_SecureHash'];
    delete queryData['vnp_SecureHashType'];

    const sortedKeys = Object.keys(queryData).sort();
    const signData = sortedKeys.map((k) => `${k}=${queryData[k]}`).join('&');
    const signed = this.hmacSHA512(this.hashSecret, signData);

    const orderCode: string = query['vnp_TxnRef'] || '';
    const responseCode: string = query['vnp_ResponseCode'];

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

  private hmacSHA512(key: string, data: string): string {
    return crypto.createHmac('sha512', key).update(data).digest('hex');
  }

  private formatDate(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }
}
