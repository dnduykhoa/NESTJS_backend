import { ProductVariantValue } from './product-variant-value.schema';
import { ProductMedia } from './product-media.schema';
export declare class ProductVariant {
    sku: string;
    price: number;
    stockQuantity: number;
    isActive: boolean;
    displayOrder: number;
    values: ProductVariantValue[];
    media: ProductMedia[];
}
export declare const ProductVariantSchema: import("mongoose").Schema<ProductVariant, import("mongoose").Model<ProductVariant, any, any, any, import("mongoose").Document<unknown, any, ProductVariant, any, {}> & ProductVariant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductVariant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductVariant>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductVariant> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
