export declare class ProductMedia {
    mediaUrl: string;
    mediaType: string;
    isPrimary?: boolean;
    displayOrder?: number;
    altText?: string;
}
export declare const ProductMediaSchema: import("mongoose").Schema<ProductMedia, import("mongoose").Model<ProductMedia, any, any, any, (import("mongoose").Document<unknown, any, ProductMedia, any, import("mongoose").DefaultSchemaOptions> & ProductMedia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, ProductMedia, any, import("mongoose").DefaultSchemaOptions> & ProductMedia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, ProductMedia>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    mediaUrl?: import("mongoose").SchemaDefinitionProperty<string, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mediaType?: import("mongoose").SchemaDefinitionProperty<string, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isPrimary?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number | undefined, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    altText?: import("mongoose").SchemaDefinitionProperty<string | undefined, ProductMedia, import("mongoose").Document<unknown, {}, ProductMedia, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductMedia & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductMedia>;
