import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(8, { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' })
  newPassword: string;

  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirmPassword: string;
}
