import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Brand extends Document {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ maxlength: 500 })
  logoUrl?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ default: 0, type: Number })
  displayOrder?: number;

  @Prop({ default: true, index: true })
  isActive?: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.index({ name: 'text' });
BrandSchema.index({ displayOrder: 1 });
