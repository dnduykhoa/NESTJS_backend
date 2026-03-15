import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MinLength(3, { message: 'Tên đăng nhập phải từ 3 đến 50 ký tự' })
  @MaxLength(50, { message: 'Tên đăng nhập phải từ 3 đến 50 ký tự' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsOptional()
  fullName?: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @Matches(
    /^(\+84|84|0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/,
    { message: 'Số điện thoại Việt Nam không hợp lệ (VD: 0912345678)' },
  )
  phone: string;

  @IsOptional()
  birthDate?: string;
}
