import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class ProductSpecification {
  @Prop({ required: true })
  key!: string;

  @Prop({ required: true })
  value!: string;

  @Prop({ default: 0 })
  displayOrder?: number;
}

export const ProductSpecificationSchema = SchemaFactory.createForClass(ProductSpecification);