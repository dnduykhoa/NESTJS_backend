import { AttributeGroupsService } from '../services/attribute-groups.service';
import { CreateAttributeGroupDto } from '../dto/group/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/group/update-attribute-group.dto';
export declare class AttributeGroupsController {
    private readonly attributeGroupsService;
    constructor(attributeGroupsService: AttributeGroupsService);
    create(dto: CreateAttributeGroupDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateAttributeGroupDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        group: import("mongoose").Document<unknown, {}, import("../schemas/attribute-group.schema").AttributeGroup, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/attribute-group.schema").AttributeGroup & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
