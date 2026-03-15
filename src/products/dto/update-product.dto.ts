import { IsOptional, IsNumber, IsEnum, Min } from 'class-validator';
import { ProductStatus } from '../schemas/product.schema';

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  // IDs của media cần xóa (mảng string)
  @IsOptional()
  deleteMediaIds?: string[];
}
