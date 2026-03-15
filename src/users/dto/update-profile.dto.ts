import { IsEmail, IsOptional, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  fullName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @Matches(
    /^(\+84|84|0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/,
    { message: 'Số điện thoại Việt Nam không hợp lệ' },
  )
  phone?: string;

  @IsOptional()
  birthDate?: string;

  @IsOptional()
  avatarUrl?: string;
}
