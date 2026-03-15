import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ProductVariantValue,
  ProductVariantValueSchema,
} from './product-variant-value.schema';
import { ProductMedia, ProductMediaSchema } from './product-media.schema';

@Schema({ _id: true, timestamps: true })
export class ProductVariant {
  @Prop({ required: true, maxlength: 100 })
  sku: string;

  @Prop({ required: true, type: Number, min: 0 })
  price: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  stockQuantity: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  displayOrder: number;

  // EAV attribute values (embedded)
  @Prop({ type: [ProductVariantValueSchema], default: [] })
  values: ProductVariantValue[];

  // Media riêng của biến thể (embedded)
  @Prop({ type: [ProductMediaSchema], default: [] })
  media: ProductMedia[];
}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);
