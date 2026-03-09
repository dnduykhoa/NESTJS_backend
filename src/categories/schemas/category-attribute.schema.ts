import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: false })
export class CategoryAttribute extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true, index: true })
  category!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AttributeDefinition', required: true, index: true })
  attributeDefinition!: Types.ObjectId;

  @Prop({ default: false })
  isRequired!: boolean;

  @Prop({ default: 0 })
  displayOrder!: number;
}

export const CategoryAttributeSchema = SchemaFactory.createForClass(CategoryAttribute);

CategoryAttributeSchema.index(
  { category: 1, attributeDefinition: 1 }, 
  { unique: true }
);
CategoryAttributeSchema.index({ displayOrder: 1 });
