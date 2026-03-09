import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AttributeGroup extends Document {
  @Prop({ required: true, maxlength: 100 })
  name!: string;

  @Prop({ maxlength: 500 })
  description?: string;

  @Prop({ default: 0 })
  displayOrder!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const AttributeGroupSchema = SchemaFactory.createForClass(AttributeGroup);

AttributeGroupSchema.index({ isActive: 1 });
AttributeGroupSchema.index({ displayOrder: 1 });
