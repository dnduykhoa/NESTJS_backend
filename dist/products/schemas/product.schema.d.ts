import { Document, Types } from 'mongoose';
import { ProductMedia } from './product-media.schema';
import { ProductSpecification } from './product-specification.schema';
import { ProductVariant } from './product-variant.schema';
export type ProductDocument = Product & Document;
export declare enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    OUT_OF_STOCK = "OUT_OF_STOCK"
}
export declare class Product {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Types.ObjectId;
    brand: Types.ObjectId;
    media: ProductMedia[];
    specifications: ProductSpecification[];
    variants: ProductVariant[];
    status: ProductStatus;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product, any, {}> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
