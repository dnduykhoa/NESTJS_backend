import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductMedia, ProductMediaSchema } from './product-media.schema';
import { ProductSpecification, ProductSpecificationSchema } from './product-specification.schema';
import { ProductVariant, ProductVariantSchema } from './product-variant.schema';

export type ProductDocument = Product & Document;

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, maxlength: 200, index: true })
  name: string;

  @Prop({ default: null, type: String })
  description: string;

  @Prop({ required: true, type: Number, min: 0, index: true })
  price: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  stockQuantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null, index: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand', default: null, index: true })
  brand: Types.ObjectId;

  // Embedded media
  @Prop({ type: [ProductMediaSchema], default: [] })
  media: ProductMedia[];

  // Embedded EAV specifications
  @Prop({ type: [ProductSpecificationSchema], default: [] })
  specifications: ProductSpecification[];

  // Embedded variants
  @Prop({ type: [ProductVariantSchema], default: [] })
  variants: ProductVariant[];

  @Prop({
    type: String,
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
    index: true,
  })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Instance methods
ProductSchema.methods.getPrimaryImage = function () {
  return this.media.find(
    (m: ProductMedia) => m.mediaType === 'IMAGE' && m.isPrimary,
  ) || null;
};

ProductSchema.methods.getSecondaryImages = function () {
  return this.media.filter(
    (m: ProductMedia) => m.mediaType === 'IMAGE' && !m.isPrimary,
  );
};

ProductSchema.methods.getAllImages = function () {
  return this.media.filter((m: ProductMedia) => m.mediaType === 'IMAGE');
};

ProductSchema.methods.getVideos = function () {
  return this.media.filter((m: ProductMedia) => m.mediaType === 'VIDEO');
};

ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ name: 'text' });
ProductSchema.index({ status: 1, category: 1 });
