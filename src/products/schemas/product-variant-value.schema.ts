import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

/**
 * EAV giá trị thuộc tính một biến thể sản phẩm.
 * VD: attrKey="color", attrValue="Đen Vũ Trụ"
 */
@Schema({ _id: true })
export class ProductVariantValue {
  @Prop({ type: Types.ObjectId, ref: 'AttributeDefinition', default: null })
  attributeDefinition: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  attrKey: string; // VD: "color", "storage", "ram"

  @Prop({ default: null, maxlength: 200 })
  attrValue: string; // VD: "Đen Vũ Trụ", "256GB"

  @Prop({ default: null, type: Number })
  valueNumber: number;

  @Prop({ default: 0 })
  displayOrder: number;
}

export const ProductVariantValueSchema = SchemaFactory.createForClass(ProductVariantValue);
