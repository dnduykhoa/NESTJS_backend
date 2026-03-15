import { Response } from 'express';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(id: string, dto: UpdateProfileDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(res: Response): Promise<Response<any, Record<string, any>>>;
    searchUsers(keyword: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateRoles(id: string, dto: UpdateUserRolesDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
