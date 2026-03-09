import { Document, Types } from 'mongoose';
export declare enum DataType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    LIST = "LIST"
}
export declare class AttributeDefinition extends Document {
    name: string;
    attrKey: string;
    dataType: DataType;
    unit?: string;
    isFilterable: boolean;
    isRequired: boolean;
    displayOrder: number;
    isActive: boolean;
    attributeGroup?: Types.ObjectId;
}
export declare const AttributeDefinitionSchema: import("mongoose").Schema<AttributeDefinition, import("mongoose").Model<AttributeDefinition, any, any, any, (Document<unknown, any, AttributeDefinition, any, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, AttributeDefinition, any, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, AttributeDefinition>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isRequired?: import("mongoose").SchemaDefinitionProperty<boolean, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attrKey?: import("mongoose").SchemaDefinitionProperty<string, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dataType?: import("mongoose").SchemaDefinitionProperty<DataType, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    unit?: import("mongoose").SchemaDefinitionProperty<string | undefined, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isFilterable?: import("mongoose").SchemaDefinitionProperty<boolean, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attributeGroup?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, AttributeDefinition, Document<unknown, {}, AttributeDefinition, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeDefinition & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AttributeDefinition>;
