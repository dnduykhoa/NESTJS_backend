import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(body: any): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/schemas/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        token?: undefined;
    } | {
        success: boolean;
        message: string;
        token: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any): Promise<{
        success: boolean;
        message: string;
        token: string;
        user: {
            email: any;
            fullName: any;
            avatarUrl: any;
        };
    }>;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: {
        resetToken: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
