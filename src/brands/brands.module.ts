import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { ProductSchema } from '../products/schemas/product.schema';
import { FileStorageService } from '../utils/file-storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService, FileStorageService],
  exports: [BrandsService],
})
export class BrandsModule {}
