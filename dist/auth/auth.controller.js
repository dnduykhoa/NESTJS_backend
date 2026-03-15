"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_1 = require("@nestjs/jwt");
const api_response_dto_1 = require("../common/dto/api-response.dto");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const toggle_2fa_dto_1 = require("./dto/toggle-2fa.dto");
const verify_2fa_dto_1 = require("./dto/verify-2fa.dto");
const google_login_dto_1 = require("./dto/google-login.dto");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async checkUsername(username, res) {
        const exists = await this.authService.checkUsername(username);
        return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Kiểm tra tên đăng nhập', { exists }));
    }
    async checkEmail(email, res) {
        const exists = await this.authService.checkEmail(email);
        return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Kiểm tra email', { exists }));
    }
    async checkPhone(phone, res) {
        const exists = await this.authService.checkPhone(phone);
        return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Kiểm tra số điện thoại', { exists }));
    }
    async register(dto, res) {
        try {
            const result = await this.authService.register(dto);
            return res.status(common_1.HttpStatus.CREATED).json(new api_response_dto_1.ApiResponse('Đăng ký thành công', {
                token: result.token,
                userId: result.user._id,
                username: result.user.username,
                email: result.user.email,
                fullName: result.user.fullName,
            }));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async login(dto, res) {
        try {
            const result = await this.authService.login(dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse(result.message || 'Đăng nhập thành công', result));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async googleLogin(dto, res) {
        try {
            const result = await this.authService.loginWithGoogle(dto.idToken);
            const user = result.user;
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Đăng nhập Google thành công', {
                token: result.token,
                userId: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                avatarUrl: user.avatarUrl,
            }));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async googleAuth() { }
    async googleCallback(user, res) {
        const token = this.jwtService.sign({ id: user._id });
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }
    async logout(res) {
        return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Đăng xuất thành công', null));
    }
    async changePassword(id, dto, res) {
        try {
            await this.authService.changePassword(id, dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Đổi mật khẩu thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async forgotPassword(dto, res) {
        try {
            await this.authService.forgotPassword(dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Mã xác thực đã gửi đến email của bạn', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async resetPassword(dto, res) {
        try {
            await this.authService.resetPassword(dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Đặt lại mật khẩu thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async toggle2FA(id, dto, res) {
        try {
            await this.authService.toggle2FA(id, dto.enabled);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse(dto.enabled ? 'Đã bật xác thực 2 bước' : 'Đã tắt xác thực 2 bước', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async verify2FA(dto, res) {
        try {
            const result = await this.authService.verify2FA(dto.emailOrPhone, dto.code);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xác thực 2 bước thành công', result));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('check-username/:username'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkUsername", null);
__decorate([
    (0, common_1.Get)('check-email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Get)('check-phone/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkPhone", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_login_dto_1.GoogleLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Get)('google/oauth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('change-password/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('toggle-2fa/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, toggle_2fa_dto_1.Toggle2faDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "toggle2FA", null);
__decorate([
    (0, common_1.Post)('verify-2fa'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_2fa_dto_1.Verify2faDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify2FA", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map