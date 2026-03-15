import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttributeGroupDocument = AttributeGroup & Document;

@Schema({ timestamps: true })
export class AttributeGroup {
  @Prop({ required: true, unique: true, maxlength: 100 })
  name: string; // VD: "Hiệu năng", "Màn hình", "Kết nối"

  @Prop({ default: null, type: String, maxlength: 500 })
  description: string;

  @Prop({ default: 0, type: Number })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const AttributeGroupSchema = SchemaFactory.createForClass(AttributeGroup);
