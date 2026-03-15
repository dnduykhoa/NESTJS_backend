import { Types } from 'mongoose';
export declare class OrderItem {
    product: Types.ObjectId;
    productName: string;
    productImageUrl: string;
    variantId: string;
    variantSku: string;
    variantOptions: string[];
    quantity: number;
    unitPrice: number;
    subtotal: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, import("mongoose").Document<unknown, any, OrderItem, any, {}> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OrderItem>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<OrderItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
