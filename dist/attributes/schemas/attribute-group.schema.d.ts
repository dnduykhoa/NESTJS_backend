import { Document } from 'mongoose';
export type AttributeGroupDocument = AttributeGroup & Document;
export declare class AttributeGroup {
    name: string;
    description: string;
    displayOrder: number;
    isActive: boolean;
}
export declare const AttributeGroupSchema: import("mongoose").Schema<AttributeGroup, import("mongoose").Model<AttributeGroup, any, any, any, Document<unknown, any, AttributeGroup, any, {}> & AttributeGroup & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AttributeGroup, Document<unknown, {}, import("mongoose").FlatRecord<AttributeGroup>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AttributeGroup> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
