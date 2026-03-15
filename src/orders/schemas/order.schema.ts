import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'PENDING',       // Chờ xác nhận
  CONFIRMED = 'CONFIRMED',   // Đã xác nhận
  SHIPPING = 'SHIPPING',     // Đang giao hàng
  DELIVERED = 'DELIVERED',   // Đã giao hàng
  CANCELLED = 'CANCELLED',   // Đã hủy
}

export enum PaymentMethod {
  CASH = 'CASH',   // COD
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true, maxlength: 20 })
  orderCode: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  fullName: string;

  @Prop({ required: true, maxlength: 20 })
  phone: string;

  @Prop({ default: null, maxlength: 100 })
  email: string;

  @Prop({ required: true, maxlength: 500 })
  shippingAddress: string;

  @Prop({ default: null })
  note: string;

  @Prop({ type: String, enum: PaymentMethod, required: true })
  paymentMethod: PaymentMethod;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    index: true,
  })
  status: OrderStatus;

  @Prop({ required: true, type: Number, min: 0 })
  totalAmount: number;

  // Embedded order items
  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: null })
  cancelledAt: Date;

  @Prop({ default: null })
  cancelReason: string;

  // Deadline thanh toán online (VNPay/MoMo)
  @Prop({ default: null })
  paymentDeadline: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Tự động sinh orderCode trước khi save
OrderSchema.pre('save', function (next) {
  if (!this.orderCode) {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let rand = '';
    for (let i = 0; i < 6; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.orderCode = datePart + rand;
  }
  next();
});

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentDeadline: 1 });
