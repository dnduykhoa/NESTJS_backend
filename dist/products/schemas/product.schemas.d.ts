import { Document, Types } from 'mongoose';
import { ProductMedia } from './product-media.schema';
import { ProductSpecification } from './product-specification.schema';
export declare class Product extends Document {
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    category?: Types.ObjectId;
    brand?: Types.ObjectId;
    media: ProductMedia[];
    specifications: ProductSpecification[];
    isActive?: boolean;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, (Document<unknown, any, Product, any, import("mongoose").DefaultSchemaOptions> & Product & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Product, any, import("mongoose").DefaultSchemaOptions> & Product & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}), any, Product>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, Product, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stockQuantity?: import("mongoose").SchemaDefinitionProperty<number, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    brand?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    media?: import("mongoose").SchemaDefinitionProperty<ProductMedia[], Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    specifications?: import("mongoose").SchemaDefinitionProperty<ProductSpecification[], Product, Document<unknown, {}, Product, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Product>;
