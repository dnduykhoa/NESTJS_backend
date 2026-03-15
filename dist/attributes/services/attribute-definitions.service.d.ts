import { Model } from 'mongoose';
import { AttributeDefinitionDocument } from '../schemas/attribute-definition.schema';
import { AttributeGroupDocument } from '../schemas/attribute-group.schema';
import { CreateAttributeDefinitionDto } from '../dto/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/update-attribute-definition.dto';
export declare class AttributeDefinitionsService {
    private readonly attributeDefinitionModel;
    private readonly attributeGroupModel;
    constructor(attributeDefinitionModel: Model<AttributeDefinitionDocument>, attributeGroupModel: Model<AttributeGroupDocument>);
    getAllDefinitions(): Promise<AttributeDefinitionDocument[]>;
    getActiveDefinitions(): Promise<AttributeDefinitionDocument[]>;
    getFilterableDefinitions(): Promise<AttributeDefinitionDocument[]>;
    getDefinitionsByGroup(groupId: string): Promise<AttributeDefinitionDocument[]>;
    getDefinitionById(id: string): Promise<AttributeDefinitionDocument>;
    getDefinitionByKey(attrKey: string): Promise<AttributeDefinitionDocument | null>;
    createDefinition(dto: CreateAttributeDefinitionDto): Promise<AttributeDefinitionDocument>;
    updateDefinition(id: string, dto: UpdateAttributeDefinitionDto): Promise<AttributeDefinitionDocument>;
    deleteDefinition(id: string): Promise<void>;
}
