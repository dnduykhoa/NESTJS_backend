import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        success: boolean;
        user: {
            id: any;
            username: any;
            email: any;
            fullName: any;
            avatarUrl: any;
            birthday: any;
            role: any;
            loginCount: any;
        };
    }>;
    updateProfile(req: any, body: {
        fullName?: string;
        birthday?: string;
        avatarUrl?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            fullName: string | undefined;
            birthday: Date | undefined;
            avatarUrl: string | undefined;
        };
    }>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        avatarUrl: string;
    }>;
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
