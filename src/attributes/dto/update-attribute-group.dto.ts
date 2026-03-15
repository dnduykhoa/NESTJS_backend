import { IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class UpdateAttributeGroupDto {
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
