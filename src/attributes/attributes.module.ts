import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributeGroup, AttributeGroupSchema } from './schemas/attribute-group.schema';
import { AttributeDefinition, AttributeDefinitionSchema } from './schemas/attribute-definition.schema';
import { CategoryAttribute, CategoryAttributeSchema } from '../categories/schemas/category-attribute.schema';
import { AttributeGroupsController } from './controllers/attribute-groups.controller';
import { AttributeDefinitionsController } from './controllers/attribute-definitions.controller';
import { AttributeGroupsService } from './services/attribute-groups.service';
import { AttributeDefinitionsService } from './services/attribute-definitions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AttributeGroup.name, schema: AttributeGroupSchema },
      { name: AttributeDefinition.name, schema: AttributeDefinitionSchema },
      { name: CategoryAttribute.name, schema: CategoryAttributeSchema },
    ]),
  ],
  controllers: [AttributeGroupsController, AttributeDefinitionsController],
  providers: [AttributeGroupsService, AttributeDefinitionsService],
  exports: [AttributeGroupsService, AttributeDefinitionsService],
})
export class AttributesModule {}
