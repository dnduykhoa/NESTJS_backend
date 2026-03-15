import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneValidator {
  // Hỗ trợ: Viettel, Mobifone, Vinaphone, Vietnamobile, Reddi, Gmobile
  private static readonly PHONE_REGEX =
    /^(\+84|84|0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;

  /**
   * Chuẩn hóa số điện thoại: +84/84 → 0
   */
  static normalize(phone: string): string {
    if (!phone) return phone;
    const cleaned = phone.replace(/[\s\-]/g, '');
    if (cleaned.startsWith('+84')) return '0' + cleaned.slice(3);
    if (cleaned.startsWith('84') && cleaned.length === 11)
      return '0' + cleaned.slice(2);
    return cleaned;
  }

  static isValid(phone: string): boolean {
    if (!phone) return false;
    return PhoneValidator.PHONE_REGEX.test(phone);
  }

  validate(phone: string): void {
    if (!PhoneValidator.isValid(phone)) {
      throw new Error(
        'Số điện thoại Việt Nam không hợp lệ (VD: 0912345678 hoặc +84912345678)',
      );
    }
  }
}
