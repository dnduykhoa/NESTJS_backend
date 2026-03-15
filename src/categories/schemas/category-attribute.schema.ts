import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryAttributeDocument = CategoryAttribute & Document;

/**
 * Liên kết Category <-> AttributeDefinition
 * Xác định thuộc tính nào áp dụng cho danh mục nào.
 */
@Schema({ timestamps: true })
export class CategoryAttribute {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true, index: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AttributeDefinition', required: true })
  attributeDefinition: Types.ObjectId;

  // Thuộc tính bắt buộc với danh mục này (ghi đè isRequired của AttributeDefinition)
  @Prop({ default: false })
  isRequired: boolean;

  @Prop({ default: 0, type: Number })
  displayOrder: number;
}

export const CategoryAttributeSchema = SchemaFactory.createForClass(CategoryAttribute);

// Unique constraint: mỗi cặp (category, attributeDefinition) chỉ tồn tại 1 lần
CategoryAttributeSchema.index({ category: 1, attributeDefinition: 1 }, { unique: true });
CategoryAttributeSchema.index({ category: 1, displayOrder: 1 });
