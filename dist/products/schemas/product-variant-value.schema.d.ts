import { Types } from 'mongoose';
export declare class ProductVariantValue {
    attributeDefinition: Types.ObjectId;
    attrKey: string;
    attrValue: string;
    valueNumber: number;
    displayOrder: number;
}
export declare const ProductVariantValueSchema: import("mongoose").Schema<ProductVariantValue, import("mongoose").Model<ProductVariantValue, any, any, any, import("mongoose").Document<unknown, any, ProductVariantValue, any, {}> & ProductVariantValue & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductVariantValue, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductVariantValue>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductVariantValue> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
