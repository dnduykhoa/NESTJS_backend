import { IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class UpdateBrandDto {
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
}
