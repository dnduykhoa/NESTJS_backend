import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarouselSlideDocument = CarouselSlide & Document;

@Schema({ timestamps: true })
export class CarouselSlide {
  @Prop({ default: null, maxlength: 1000 })
  image: string; // URL ảnh hoặc video

  @Prop({ default: 'IMAGE', enum: ['IMAGE', 'VIDEO'] })
  mediaType: string;

  @Prop({ default: null, maxlength: 100 })
  badge: string;

  @Prop({ default: null, maxlength: 500 })
  title: string;

  @Prop({ default: null, type: String })
  subtitle: string;

  @Prop({ default: null, maxlength: 100 })
  buttonText: string;

  @Prop({ default: null, maxlength: 500 })
  buttonLink: string;

  @Prop({ default: 0, type: Number })
  displayOrder: number;

  @Prop({ default: 4000, type: Number })
  intervalMs: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const CarouselSlideSchema = SchemaFactory.createForClass(CarouselSlide);
CarouselSlideSchema.index({ isActive: 1, displayOrder: 1 });
