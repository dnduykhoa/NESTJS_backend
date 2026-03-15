import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSeedService } from './data-seed.service';
import { Role, RoleSchema } from '../roles/schemas/role.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  AttributeGroup,
  AttributeGroupSchema,
} from '../attributes/schemas/attribute-group.schema';
import {
  AttributeDefinition,
  AttributeDefinitionSchema,
} from '../attributes/schemas/attribute-definition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name,                schema: RoleSchema },
      { name: User.name,                schema: UserSchema },
      { name: AttributeGroup.name,      schema: AttributeGroupSchema },
      { name: AttributeDefinition.name, schema: AttributeDefinitionSchema },
    ]),
  ],
  providers: [DataSeedService],
})
export class DatabaseModule {}
