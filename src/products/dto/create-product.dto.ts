import { IsNotEmpty, IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../schemas/product.schema';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Giá không được để trống' })
  @IsNumber({}, { message: 'Giá phải là số' })
  @Min(0, { message: 'Giá không được âm' })
  price: number;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  @IsNumber()
  @Min(0, { message: 'Số lượng không được âm' })
  stockQuantity: number;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
