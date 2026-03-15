import { Model } from 'mongoose';
import { RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private readonly roleModel;
    constructor(roleModel: Model<RoleDocument>);
    create(createRoleDto: CreateRoleDto): Promise<RoleDocument>;
    findAll(): Promise<RoleDocument[]>;
    findById(id: string): Promise<RoleDocument>;
    findByName(name: string): Promise<RoleDocument | null>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDocument>;
    remove(id: string): Promise<void>;
}
