import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsArray,
  Min,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  variantId?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @Matches(/^(\+84|84|0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phone: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  shippingAddress: string;

  @IsOptional()
  note?: string;

  @IsNotEmpty()
  paymentMethod: string; // CASH | VNPAY | MOMO

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];
}
