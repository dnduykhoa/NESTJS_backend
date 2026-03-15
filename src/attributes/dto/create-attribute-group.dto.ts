import { IsNotEmpty, IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';

export class CreateAttributeGroupDto {
  @IsNotEmpty({ message: 'Tên nhóm thuộc tính không được để trống' })
  @MaxLength(100)
  name: string;

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
