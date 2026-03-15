import { Model } from 'mongoose';
import { AttributeGroupDocument } from '../schemas/attribute-group.schema';
import { AttributeDefinitionDocument } from '../schemas/attribute-definition.schema';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';
export declare class AttributeGroupsService {
    private readonly attributeGroupModel;
    private readonly attributeDefinitionModel;
    constructor(attributeGroupModel: Model<AttributeGroupDocument>, attributeDefinitionModel: Model<AttributeDefinitionDocument>);
    getAllGroups(): Promise<AttributeGroupDocument[]>;
    getActiveGroups(): Promise<AttributeGroupDocument[]>;
    getGroupById(id: string): Promise<AttributeGroupDocument>;
    createGroup(dto: CreateAttributeGroupDto): Promise<AttributeGroupDocument>;
    updateGroup(id: string, dto: UpdateAttributeGroupDto): Promise<AttributeGroupDocument>;
    deleteGroup(id: string): Promise<void>;
}
