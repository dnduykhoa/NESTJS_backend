import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserRolesDto {
  @IsArray()
  roles: string[]; // Mảng tên roles: ["ADMIN", "USER"]
}
