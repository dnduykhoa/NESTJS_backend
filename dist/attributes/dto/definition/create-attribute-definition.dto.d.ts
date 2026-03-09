import { DataType } from '../../schemas/attribute-definition.schema';
export declare class CreateAttributeDefinitionDto {
    name: string;
    attrKey: string;
    dataType: DataType;
    unit?: string;
    isFilterable?: boolean;
    isRequired?: boolean;
    displayOrder?: number;
    isActive?: boolean;
    attributeGroup?: string;
}
