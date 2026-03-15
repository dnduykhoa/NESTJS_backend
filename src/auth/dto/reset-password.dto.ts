import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
  @MinLength(6) @MaxLength(6, { message: 'Mã xác thực phải có 6 ký tự' })
  resetToken: string;

  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' })
  newPassword: string;

  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirmPassword: string;
}
