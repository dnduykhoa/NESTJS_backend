import { IsNotEmpty } from 'class-validator';

export class Verify2faDto {
  @IsNotEmpty({ message: 'Email hoặc số điện thoại không được để trống' })
  emailOrPhone: string;

  @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
  code: string;
}
