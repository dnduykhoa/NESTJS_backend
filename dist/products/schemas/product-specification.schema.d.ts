import { Types } from 'mongoose';
export declare class ProductSpecification {
    attributeDefinition: Types.ObjectId;
    specKey: string;
    specValue: string;
    valueNumber: number;
    displayOrder: number;
}
export declare const ProductSpecificationSchema: import("mongoose").Schema<ProductSpecification, import("mongoose").Model<ProductSpecification, any, any, any, import("mongoose").Document<unknown, any, ProductSpecification, any, {}> & ProductSpecification & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductSpecification, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductSpecification>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductSpecification> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
