import { IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateCategoryAttributeDto {
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}
