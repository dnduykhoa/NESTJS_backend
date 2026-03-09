import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateCategoryAttributeDto {
  @IsString()
  category!: string;

  @IsString()
  attributeDefinition!: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}
