import { Model } from 'mongoose';
import { AttributeGroup } from '../schemas/attribute-group.schema';
import { CreateAttributeGroupDto } from '../dto/group/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/group/update-attribute-group.dto';
export declare class AttributeGroupsService {
    private attributeGroupModel;
    private attributeDefinitionModel;
    constructor(attributeGroupModel: Model<AttributeGroup>, attributeDefinitionModel: Model<any>);
    create(dto: CreateAttributeGroupDto): Promise<import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateAttributeGroupDto): Promise<import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        group: import("mongoose").Document<unknown, {}, AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & AttributeGroup & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
