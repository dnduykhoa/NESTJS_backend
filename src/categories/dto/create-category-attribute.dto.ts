import { IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateCategoryAttributeDto {
  @IsNotEmpty({ message: 'categoryId không được để trống' })
  categoryId: string;

  @IsNotEmpty({ message: 'attrDefId không được để trống' })
  attrDefId: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}
