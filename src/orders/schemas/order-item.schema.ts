import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

/**
 * Snapshot thông tin item khi đặt hàng
 * Lưu giá tại thời điểm đặt để tránh thay đổi giá sau này
 */
@Schema({ _id: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  // Snapshot tên sản phẩm
  @Prop({ required: true })
  productName: string;

  // Snapshot ảnh sản phẩm
  @Prop({ default: null })
  productImageUrl: string;

  // Snapshot variant ID (nếu có)
  @Prop({ type: String, default: null })
  variantId: string;

  // Snapshot variant SKU
  @Prop({ default: null })
  variantSku: string;

  // Snapshot tên các tùy chọn biến thể VD: ["Đen", "256GB"]
  @Prop({ type: [String], default: [] })
  variantOptions: string[];

  @Prop({ required: true, type: Number, min: 1 })
  quantity: number;

  // Giá tại thời điểm đặt
  @Prop({ required: true, type: Number, min: 0 })
  unitPrice: number;

  // Thành tiền = quantity * unitPrice
  @Prop({ required: true, type: Number, min: 0 })
  subtotal: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
