export declare class ProductSpecification {
    key: string;
    value: string;
    displayOrder?: number;
}
export declare const ProductSpecificationSchema: import("mongoose").Schema<ProductSpecification, import("mongoose").Model<ProductSpecification, any, any, any, (import("mongoose").Document<unknown, any, ProductSpecification, any, import("mongoose").DefaultSchemaOptions> & ProductSpecification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, ProductSpecification, any, import("mongoose").DefaultSchemaOptions> & ProductSpecification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, ProductSpecification>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProductSpecification, import("mongoose").Document<unknown, {}, ProductSpecification, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ProductSpecification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    key?: import("mongoose").SchemaDefinitionProperty<string, ProductSpecification, import("mongoose").Document<unknown, {}, ProductSpecification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSpecification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<string, ProductSpecification, import("mongoose").Document<unknown, {}, ProductSpecification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSpecification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    displayOrder?: import("mongoose").SchemaDefinitionProperty<number | undefined, ProductSpecification, import("mongoose").Document<unknown, {}, ProductSpecification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ProductSpecification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductSpecification>;
