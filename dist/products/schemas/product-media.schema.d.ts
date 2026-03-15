export declare class ProductMedia {
    mediaUrl: string;
    mediaType: string;
    isPrimary: boolean;
    displayOrder: number;
    altText: string;
}
export declare const ProductMediaSchema: import("mongoose").Schema<ProductMedia, import("mongoose").Model<ProductMedia, any, any, any, import("mongoose").Document<unknown, any, ProductMedia, any, {}> & ProductMedia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductMedia, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ProductMedia>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ProductMedia> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
