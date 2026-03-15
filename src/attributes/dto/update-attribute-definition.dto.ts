import { IsOptional, IsBoolean, IsNumber, IsEnum, MaxLength, IsMongoId } from 'class-validator';
import { DataType } from '../schemas/attribute-definition.schema';

export class UpdateAttributeDefinitionDto {
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @MaxLength(100)
  attrKey?: string;

  @IsOptional()
  @IsEnum(DataType, { message: 'Kiểu dữ liệu không hợp lệ' })
  dataType?: DataType;

  @IsOptional()
  @MaxLength(50)
  unit?: string;

  @IsOptional()
  @IsBoolean()
  isFilterable?: boolean;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsMongoId({ message: 'groupId phải là ObjectId hợp lệ' })
  groupId?: string; // ObjectId of AttributeGroup
}
