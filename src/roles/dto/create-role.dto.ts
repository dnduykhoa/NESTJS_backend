import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
