import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { MailHandler } from '../utils/mail.handler';
export declare class AuthService {
    private userModel;
    private jwtService;
    private mailHandler;
    constructor(userModel: Model<User>, jwtService: JwtService, mailHandler: MailHandler);
    register(userData: {
        username: string;
        password: string;
        email: string;
        role: string;
        avatarUrl?: string;
        fullName?: string;
        birthday?: Date;
    }): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(username: string, password: string): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    } | null>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(resetToken: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    validateGoogleUser(googleData: {
        googleId: string;
        email: string;
        fullName: string;
        avatarUrl?: string;
    }): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
