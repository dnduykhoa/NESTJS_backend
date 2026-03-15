import { Document, Types } from 'mongoose';
export type AttributeDefinitionDocument = AttributeDefinition & Document;
export declare enum DataType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    LIST = "LIST"
}
export declare class AttributeDefinition {
    name: string;
    attrKey: string;
    dataType: DataType;
    unit: string;
    isFilterable: boolean;
    isRequired: boolean;
    displayOrder: number;
    isActive: boolean;
    attributeGroup: Types.ObjectId;
}
export declare const AttributeDefinitionSchema: import("mongoose").Schema<AttributeDefinition, import("mongoose").Model<AttributeDefinition, any, any, any, Document<unknown, any, AttributeDefinition, any, {}> & AttributeDefinition & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttributeDefinition, Document<unknown, {}, import("mongoose").FlatRecord<AttributeDefinition>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AttributeDefinition> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
