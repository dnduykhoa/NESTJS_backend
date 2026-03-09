import { Document, Types } from 'mongoose';
export declare class CategoryAttribute extends Document {
    category: Types.ObjectId;
    attributeDefinition: Types.ObjectId;
    isRequired: boolean;
    displayOrder: number;
}
export declare const CategoryAttributeSchema: import("mongoose").Schema<CategoryAttribute, import("mongoose").Model<CategoryAttribute, any, any, any, (Document<unknown, any, CategoryAttribute, any, import("mongoose").DefaultSchemaOptions> & CategoryAttribute & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, CategoryAttribute, any, import("mongoose").DefaultSchemaOptions> & CategoryAttribute & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, CategoryAttribute>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isRequired?: import("mongoose").SchemaDefinitionProperty<boolean, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attributeDefinition?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CategoryAttribute, Document<unknown, {}, CategoryAttribute, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CategoryAttribute & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, CategoryAttribute>;
