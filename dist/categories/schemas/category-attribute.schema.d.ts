import { Document, Types } from 'mongoose';
export type CategoryAttributeDocument = CategoryAttribute & Document;
export declare class CategoryAttribute {
    category: Types.ObjectId;
    attributeDefinition: Types.ObjectId;
    isRequired: boolean;
    displayOrder: number;
}
export declare const CategoryAttributeSchema: import("mongoose").Schema<CategoryAttribute, import("mongoose").Model<CategoryAttribute, any, any, any, Document<unknown, any, CategoryAttribute, any, {}> & CategoryAttribute & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategoryAttribute, Document<unknown, {}, import("mongoose").FlatRecord<CategoryAttribute>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<CategoryAttribute> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
