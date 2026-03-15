import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

/**
 * CartItem — embedded trong Cart
 */
@Schema({ _id: true })
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  // Variant ID + SKU (snapshot để hiển thị)
  @Prop({ type: String, default: null })
  variantId: string; // ObjectId của variant trong product.variants[]

  @Prop({ default: null })
  variantSku: string;

  @Prop({ required: true, type: Number, min: 1 })
  quantity: number;

  @Prop({ default: () => new Date() })
  addedAt: Date;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

/**
 * Cart — mỗi user có đúng 1 giỏ hàng
 */
@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop({ type: [CartItemSchema], default: [] })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.index({ user: 1 });
