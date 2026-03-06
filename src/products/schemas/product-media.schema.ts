import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class ProductMedia {
  @Prop({ required: true })
  mediaUrl!: string;

  @Prop({ required: true, enum: ['IMAGE', 'VIDEO'], default: 'IMAGE' })
  mediaType!: string;

  @Prop({ default: false })
  isPrimary?: boolean;

  @Prop({ default: 0 })
  displayOrder?: number;

  @Prop()
  altText?: string;
}

export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);