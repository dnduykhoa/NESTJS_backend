import { IsNotEmpty, IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty({ message: 'Tên thương hiệu không được để trống' })
  @MaxLength(100)
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
