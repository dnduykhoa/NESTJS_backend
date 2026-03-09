import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum, MaxLength } from 'class-validator';
import { DataType } from '../../schemas/attribute-definition.schema';

export class CreateAttributeDefinitionDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(100)
  attrKey!: string;

  @IsEnum(DataType)
  dataType!: DataType;

  @IsOptional()
  @IsString()
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
  @IsString()
  attributeGroup?: string;
}
