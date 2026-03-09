import { Model } from 'mongoose';
import { AttributeDefinition } from '../schemas/attribute-definition.schema';
import { CreateAttributeDefinitionDto } from '../dto/definition/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/definition/update-attribute-definition.dto';
export declare class AttributeDefinitionsService {
    private attributeDefinitionModel;
    private categoryAttributeModel;
    constructor(attributeDefinitionModel: Model<AttributeDefinition>, categoryAttributeModel: Model<any>);
    create(dto: CreateAttributeDefinitionDto): Promise<import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findFilterable(): Promise<(import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findByGroup(groupId: string): Promise<(import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByKey(attrKey: string): Promise<import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateAttributeDefinitionDto): Promise<import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        definition: import("mongoose").Document<unknown, {}, AttributeDefinition, {}, import("mongoose").DefaultSchemaOptions> & AttributeDefinition & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
