import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/role.schema").Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/role.schema").Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/role.schema").Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/role.schema").Role & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        role: import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/role.schema").Role & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
