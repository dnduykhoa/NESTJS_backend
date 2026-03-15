import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { RoleDocument } from '../roles/schemas/role.schema';
import { TwoFactorCodeDocument } from './schemas/two-factor-code.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordValidator } from '../utils/password.validator';
import { PhoneValidator } from '../utils/phone.validator';
import { MailHandler } from '../utils/mail.handler';
export declare class AuthService {
    private readonly userModel;
    private readonly roleModel;
    private readonly twoFactorModel;
    private readonly jwtService;
    private readonly mailHandler;
    private readonly passwordValidator;
    private readonly phoneValidator;
    constructor(userModel: Model<UserDocument>, roleModel: Model<RoleDocument>, twoFactorModel: Model<TwoFactorCodeDocument>, jwtService: JwtService, mailHandler: MailHandler, passwordValidator: PasswordValidator, phoneValidator: PhoneValidator);
    checkUsername(username: string): Promise<boolean>;
    checkEmail(email: string): Promise<boolean>;
    checkPhone(phone: string): Promise<boolean>;
    register(dto: RegisterDto): Promise<{
        token: string;
        user: UserDocument;
    }>;
    login(dto: LoginDto): Promise<any>;
    loginWithGoogle(idToken: string): Promise<{
        token: string;
        user: any;
    }>;
    validateGoogleUser(googleData: {
        providerId: string;
        email: string;
        fullName: string;
        avatarUrl?: string;
    }): Promise<UserDocument>;
    verify2FA(emailOrPhone: string, code: string): Promise<any>;
    toggle2FA(userId: string, enabled: boolean): Promise<UserDocument>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
    forgotPassword(dto: ForgotPasswordDto): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
}
