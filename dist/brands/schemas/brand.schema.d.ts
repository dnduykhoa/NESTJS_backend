import { Document } from 'mongoose';
export declare class Brand extends Document {
    name: string;
    logoUrl?: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
}
export declare const BrandSchema: import("mongoose").Schema<Brand, import("mongoose").Model<Brand, any, any, any, (Document<unknown, any, Brand, any, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Brand, any, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}), any, Brand>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, Document<unknown, {}, Brand, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number | undefined, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    logoUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Brand, Document<unknown, {}, Brand, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Brand>;
