import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { RoleDocument } from '../roles/schemas/role.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { AttributeGroupDocument } from '../attributes/schemas/attribute-group.schema';
import { AttributeDefinitionDocument } from '../attributes/schemas/attribute-definition.schema';
export declare class DataSeedService implements OnApplicationBootstrap {
    private readonly roleModel;
    private readonly userModel;
    private readonly attrGroupModel;
    private readonly attrDefModel;
    private readonly logger;
    constructor(roleModel: Model<RoleDocument>, userModel: Model<UserDocument>, attrGroupModel: Model<AttributeGroupDocument>, attrDefModel: Model<AttributeDefinitionDocument>);
    onApplicationBootstrap(): Promise<void>;
    private seedRoles;
    private seedAdminUser;
    private seedAttributeGroups;
    private seedAttributeDefinitions;
}
