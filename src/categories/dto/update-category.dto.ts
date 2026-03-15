import { IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  parentId?: string;
}
