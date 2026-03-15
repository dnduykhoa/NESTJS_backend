import { Document, Types } from 'mongoose';
import { OrderItem } from './order-item.schema';
export type OrderDocument = Order & Document;
export declare enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare enum PaymentMethod {
    CASH = "CASH",
    VNPAY = "VNPAY",
    MOMO = "MOMO"
}
export declare class Order {
    orderCode: string;
    user: Types.ObjectId;
    fullName: string;
    phone: string;
    email: string;
    shippingAddress: string;
    note: string;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    totalAmount: number;
    items: OrderItem[];
    cancelledAt: Date;
    cancelReason: string;
    paymentDeadline: Date;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, {}> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
