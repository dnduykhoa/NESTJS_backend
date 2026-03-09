import { IsString, IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  parent?: string;
}
