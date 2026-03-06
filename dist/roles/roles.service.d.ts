import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './schemas/role.schema';
export declare class RolesService {
    private roleModel;
    constructor(roleModel: Model<Role>);
    create(createRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        role: import("mongoose").Document<unknown, {}, Role, {}, import("mongoose").DefaultSchemaOptions> & Role & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
