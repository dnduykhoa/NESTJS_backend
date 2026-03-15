import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, IsArray } from 'class-validator';

export class ProductVariantValueDto {
  @IsOptional()
  attrDefId?: string;

  @IsNotEmpty({ message: 'attrKey không được để trống' })
  attrKey: string;

  @IsOptional()
  attrValue?: string;

  @IsOptional()
  @IsNumber()
  valueNumber?: number;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}

export class CreateProductVariantDto {
  @IsNotEmpty({ message: 'SKU không được để trống' })
  sku: string;

  @IsNotEmpty({ message: 'Giá biến thể không được để trống' })
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsArray()
  values?: ProductVariantValueDto[];
}

export class UpdateProductVariantDto {
  @IsOptional()
  sku?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsArray()
  values?: ProductVariantValueDto[];
}
