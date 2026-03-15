import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { RoleDocument } from '../roles/schemas/role.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private readonly userModel;
    private readonly roleModel;
    constructor(userModel: Model<UserDocument>, roleModel: Model<RoleDocument>);
    findById(id: string): Promise<UserDocument>;
    getAllUsers(): Promise<UserDocument[]>;
    searchUsers(keyword: string): Promise<UserDocument[]>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserDocument>;
    updateUserRoles(userId: string, roleNames: string[]): Promise<UserDocument>;
    deleteUser(userId: string): Promise<void>;
}
