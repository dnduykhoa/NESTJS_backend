import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoryAttributesController } from './controllers/category-attributes.controller';
import { CategoriesService } from './categories.service';
import { CategoryAttributesService } from './services/category-attributes.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoryAttribute, CategoryAttributeSchema } from './schemas/category-attribute.schema';
import { AttributeDefinitionSchema } from '../attributes/schemas/attribute-definition.schema';
import { ProductSchema } from '../products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: CategoryAttribute.name, schema: CategoryAttributeSchema },
      { name: 'AttributeDefinition', schema: AttributeDefinitionSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [CategoriesController, CategoryAttributesController],
  providers: [CategoriesService, CategoryAttributesService],
  exports: [CategoriesService, CategoryAttributesService],
})
export class CategoriesModule {}
