import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

/**
 * EAV Value — giá trị đặc tả kỹ thuật của sản phẩm.
 * specKey: khóa tự do (legacy / fallback)
 * attributeDefinition: ref đến AttributeDefinition (chuẩn hóa)
 */
@Schema({ _id: true })
export class ProductSpecification {
  @Prop({ required: false, type: Types.ObjectId, ref: 'AttributeDefinition', default: null })
  attributeDefinition: Types.ObjectId;

  @Prop({ required: false, maxlength: 100 })
  specKey: string; // VD: "CPU", "RAM" — dùng khi không có attributeDefinition

  @Prop({ required: false, maxlength: 500 })
  specValue: string; // VD: "AMD Ryzen 5 5600X", "8GB DDR4"

  @Prop({ required: false, type: Number, default: null })
  valueNumber: number; // Số cho bộ lọc: 8 (GB RAM), 15.6 (inch)

  @Prop({ default: 0 })
  displayOrder: number;
}

export const ProductSpecificationSchema = SchemaFactory.createForClass(ProductSpecification);
