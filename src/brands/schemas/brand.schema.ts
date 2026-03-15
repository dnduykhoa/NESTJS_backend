import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true, unique: true, maxlength: 100 })
  name: string;

  @Prop({ default: null, maxlength: 500 })
  logoUrl: string;

  @Prop({ default: null, type: String })
  description: string;

  @Prop({ default: 0, type: Number })
  displayOrder: number;

  @Prop({ default: true, index: true })
  isActive: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.index({ name: 'text' });
BrandSchema.index({ displayOrder: 1 });
