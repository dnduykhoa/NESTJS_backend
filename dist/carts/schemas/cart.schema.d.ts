import { Document, Types } from 'mongoose';
export type CartDocument = Cart & Document;
export declare class CartItem {
    product: Types.ObjectId;
    variantId: string;
    variantSku: string;
    quantity: number;
    addedAt: Date;
}
export declare const CartItemSchema: import("mongoose").Schema<CartItem, import("mongoose").Model<CartItem, any, any, any, Document<unknown, any, CartItem, any, {}> & CartItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CartItem, Document<unknown, {}, import("mongoose").FlatRecord<CartItem>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<CartItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Cart {
    user: Types.ObjectId;
    items: CartItem[];
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart, any, {}> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Cart> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
