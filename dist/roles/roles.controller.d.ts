import { Response } from 'express';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateRoleDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateRoleDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
