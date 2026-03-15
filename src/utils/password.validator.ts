import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordValidator {
  private static readonly MIN_LENGTH = 8;
  private static readonly UPPERCASE_PATTERN = /.*[A-Z].*/;
  private static readonly LOWERCASE_PATTERN = /.*[a-z].*/;
  private static readonly DIGIT_PATTERN = /.*[0-9].*/;
  private static readonly SPECIAL_CHAR_PATTERN =
    /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;

  validate(password: string): void {
    if (!password || password.length < PasswordValidator.MIN_LENGTH) {
      throw new Error(
        `Mật khẩu phải có ít nhất ${PasswordValidator.MIN_LENGTH} ký tự`,
      );
    }
    if (!PasswordValidator.UPPERCASE_PATTERN.test(password)) {
      throw new Error('Mật khẩu phải chứa ít nhất 1 chữ hoa');
    }
    if (!PasswordValidator.LOWERCASE_PATTERN.test(password)) {
      throw new Error('Mật khẩu phải chứa ít nhất 1 chữ thường');
    }
    if (!PasswordValidator.DIGIT_PATTERN.test(password)) {
      throw new Error('Mật khẩu phải chứa ít nhất 1 chữ số');
    }
    if (!PasswordValidator.SPECIAL_CHAR_PATTERN.test(password)) {
      throw new Error('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
    }
  }

  isValid(password: string): boolean {
    try {
      this.validate(password);
      return true;
    } catch {
      return false;
    }
  }
}
