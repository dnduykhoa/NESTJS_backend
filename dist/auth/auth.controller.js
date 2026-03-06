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
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    authService;
    jwtService;
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register(body) {
        if (!body.password || body.password.trim() === '') {
            throw new common_1.BadRequestException('Password là bắt buộc');
        }
        if (!body.confirmPassword) {
            throw new common_1.BadRequestException('Vui lòng xác nhận lại mật khẩu');
        }
        if (body.password !== body.confirmPassword) {
            throw new common_1.BadRequestException('Mật khẩu xác nhận không khớp');
        }
        if (body.password.length < 8) {
            throw new common_1.BadRequestException('Password phải có ít nhất 8 ký tự');
        }
        if (!/[A-Z]/.test(body.password)) {
            throw new common_1.BadRequestException('Password phải có ít nhất 1 chữ hoa');
        }
        if (!/[a-z]/.test(body.password)) {
            throw new common_1.BadRequestException('Password phải có ít nhất 1 chữ thường');
        }
        if (!/[0-9]/.test(body.password)) {
            throw new common_1.BadRequestException('Password phải có ít nhất 1 chữ số');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.password)) {
            throw new common_1.BadRequestException('Password phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)');
        }
        const newUser = await this.authService.register({
            username: body.username,
            password: body.password,
            email: body.email,
            role: process.env.DEFAULT_ROLE_ID || '',
            avatarUrl: body.avatarUrl,
            fullName: body.fullName,
            birthday: body.birthday,
        });
        return newUser;
    }
    async login(body) {
        const result = await this.authService.login(body.username, body.password);
        if (!result) {
            return {
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng',
            };
        }
        return {
            success: true,
            message: 'Đăng nhập thành công',
            token: result.token,
        };
    }
    async googleAuth() {
    }
    async googleAuthCallback(req) {
        const user = req.user;
        const token = this.jwtService.sign({ id: user._id });
        return {
            success: true,
            message: 'Đăng nhập Google thành công',
            token,
            user: {
                email: user.email,
                fullName: user.fullName,
                avatarUrl: user.avatarUrl,
            },
        };
    }
    async changePassword(req, body) {
        if (!body.oldPassword || !body.newPassword || !body.confirmNewPassword) {
            throw new common_1.BadRequestException('Vui lòng nhập đầy đủ mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới');
        }
        if (body.newPassword !== body.confirmNewPassword) {
            throw new common_1.BadRequestException('Mật khẩu mới và xác nhận mật khẩu không khớp');
        }
        if (body.newPassword.length < 8) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 8 ký tự');
        }
        if (!/[A-Z]/.test(body.newPassword)) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ hoa');
        }
        if (!/[a-z]/.test(body.newPassword)) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ thường');
        }
        if (!/[0-9]/.test(body.newPassword)) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ số');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.newPassword)) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)');
        }
        if (body.oldPassword === body.newPassword) {
            throw new common_1.BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
        }
        const result = await this.authService.changePassword(req.user._id, body.oldPassword, body.newPassword);
        if (!result.success) {
            throw new common_1.BadRequestException(result.message);
        }
        return {
            success: true,
            message: 'Đổi mật khẩu thành công',
        };
    }
    async forgotPassword(body) {
        if (!body.email) {
            throw new common_1.BadRequestException('Vui lòng nhập email');
        }
        const result = await this.authService.forgotPassword(body.email);
        if (!result.success) {
            throw new common_1.BadRequestException(result.message);
        }
        return {
            success: true,
            message: result.message,
        };
    }
    async resetPassword(body) {
        if (!body.resetToken || !body.newPassword) {
            throw new common_1.BadRequestException('Vui lòng nhập mã xác thực và mật khẩu mới');
        }
        if (body.newPassword.length < 6) {
            throw new common_1.BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
        }
        const result = await this.authService.resetPassword(body.resetToken, body.newPassword);
        if (!result.success) {
            throw new common_1.BadRequestException(result.message);
        }
        return {
            success: true,
            message: 'Đặt lại mật khẩu thành công',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map