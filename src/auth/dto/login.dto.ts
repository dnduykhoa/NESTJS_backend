import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email hoặc số điện thoại không được để trống' })
  emailOrPhone: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsOptional()
  rememberMe?: boolean;
}
