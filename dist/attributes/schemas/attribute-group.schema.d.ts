import { Document } from 'mongoose';
export declare class AttributeGroup extends Document {
    name: string;
    description?: string;
    displayOrder: number;
    isActive: boolean;
}
export declare const AttributeGroupSchema: import("mongoose").Schema<AttributeGroup, import("mongoose").Model<AttributeGroup, any, any, any, (Document<unknown, any, AttributeGroup, any, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, AttributeGroup, any, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, AttributeGroup>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttributeGroup, Document<unknown, {}, AttributeGroup, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, AttributeGroup, Document<unknown, {}, AttributeGroup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, AttributeGroup, Document<unknown, {}, AttributeGroup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, AttributeGroup, Document<unknown, {}, AttributeGroup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AttributeGroup, Document<unknown, {}, AttributeGroup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AttributeGroup, Document<unknown, {}, AttributeGroup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AttributeGroup>;
