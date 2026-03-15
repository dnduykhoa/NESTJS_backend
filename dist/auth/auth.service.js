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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../users/schemas/user.schema");
const role_schema_1 = require("../roles/schemas/role.schema");
const two_factor_code_schema_1 = require("./schemas/two-factor-code.schema");
const password_validator_1 = require("../utils/password.validator");
const phone_validator_1 = require("../utils/phone.validator");
const mail_handler_1 = require("../utils/mail.handler");
let AuthService = class AuthService {
    constructor(userModel, roleModel, twoFactorModel, jwtService, mailHandler, passwordValidator, phoneValidator) {
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.twoFactorModel = twoFactorModel;
        this.jwtService = jwtService;
        this.mailHandler = mailHandler;
        this.passwordValidator = passwordValidator;
        this.phoneValidator = phoneValidator;
    }
    async checkUsername(username) {
        const exists = await this.userModel.findOne({ username });
        return !!exists;
    }
    async checkEmail(email) {
        const exists = await this.userModel.findOne({ email: email.toLowerCase() });
        return !!exists;
    }
    async checkPhone(phone) {
        const normalized = phone_validator_1.PhoneValidator.normalize(phone);
        const exists = await this.userModel.findOne({ phone: normalized });
        return !!exists;
    }
    async register(dto) {
        this.passwordValidator.validate(dto.password);
        if (dto.password !== dto.confirmPassword) {
            throw new Error('Mật khẩu xác nhận không khớp');
        }
        const normalizedPhone = phone_validator_1.PhoneValidator.normalize(dto.phone);
        this.phoneValidator.validate(normalizedPhone);
        if (await this.userModel.findOne({ username: dto.username })) {
            throw new Error('Tên đăng nhập đã được sử dụng');
        }
        if (await this.userModel.findOne({ email: dto.email.toLowerCase() })) {
            throw new Error('Email đã được sử dụng');
        }
        if (await this.userModel.findOne({ phone: normalizedPhone })) {
            throw new Error('Số điện thoại đã được sử dụng');
        }
        let defaultRole = await this.roleModel.findOne({ name: 'USER' });
        if (!defaultRole) {
            defaultRole = await new this.roleModel({ name: 'USER', description: 'Người dùng thông thường' }).save();
        }
        const newUser = new this.userModel({
            username: dto.username,
            password: dto.password,
            email: dto.email.toLowerCase(),
            fullName: dto.fullName || '',
            phone: normalizedPhone,
            birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
            provider: 'local',
            role: defaultRole._id,
            loginCount: 0,
        });
        const saved = await newUser.save();
        const token = this.jwtService.sign({ id: saved._id });
        return { token, user: saved };
    }
    async login(dto) {
        const normalizedInput = phone_validator_1.PhoneValidator.normalize(dto.emailOrPhone);
        const user = await this.userModel
            .findOne({
            $or: [
                { email: dto.emailOrPhone.toLowerCase() },
                { phone: normalizedInput },
            ],
        })
            .populate('role');
        if (!user) {
            throw new Error('Email/số điện thoại hoặc mật khẩu không đúng');
        }
        if (!user.password) {
            throw new Error('Tài khoản này đăng nhập bằng Google. Vui lòng dùng Google đăng nhập');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new Error('Email/số điện thoại hoặc mật khẩu không đúng');
        }
        if (user.twoFactorEnabled) {
            const emailOrPhone = user.email;
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiryDate = new Date(Date.now() + 5 * 60 * 1000);
            await this.twoFactorModel.deleteMany({ emailOrPhone });
            await new this.twoFactorModel({ emailOrPhone, code, expiryDate }).save();
            await this.mailHandler.sendTwoFactorCode(emailOrPhone, code);
            return {
                requiresTwoFactor: true,
                message: 'Mã xác thực 2 bước đã được gửi đến email của bạn',
                emailOrPhone,
            };
        }
        user.loginCount = (user.loginCount || 0) + 1;
        await user.save();
        const expiresIn = dto.rememberMe ? '30d' : '24h';
        const token = this.jwtService.sign({ id: user._id }, { expiresIn });
        return {
            message: 'Đăng nhập thành công',
            token,
            userId: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            birthDate: user.birthDate,
            roles: [user.role?.name].filter(Boolean),
            twoFactorEnabled: user.twoFactorEnabled,
        };
    }
    async loginWithGoogle(idToken) {
        const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
        if (!resp.ok) {
            throw new Error('Google token không hợp lệ');
        }
        const info = await resp.json();
        if (info.error)
            throw new Error('Google token không hợp lệ: ' + info.error);
        const clientId = process.env.GOOGLE_CLIENT_ID;
        if (clientId && info.aud !== clientId) {
            throw new Error('Google token không hợp lệ (audience mismatch)');
        }
        const googleData = {
            providerId: info.sub,
            email: info.email,
            fullName: info.name || '',
            avatarUrl: info.picture || 'https://i.sstatic.net/l60Hf.png',
        };
        const user = await this.validateGoogleUser(googleData);
        const token = this.jwtService.sign({ id: user._id });
        return { token, user };
    }
    async validateGoogleUser(googleData) {
        let user = await this.userModel
            .findOne({ provider: 'google', providerId: googleData.providerId })
            .populate('role');
        if (user) {
            user.loginCount = (user.loginCount || 0) + 1;
            await user.save();
            return user;
        }
        user = await this.userModel
            .findOne({ email: googleData.email.toLowerCase() })
            .populate('role');
        if (user) {
            user.provider = 'google';
            user.providerId = googleData.providerId;
            user.loginCount = (user.loginCount || 0) + 1;
            await user.save();
            return user;
        }
        let defaultRole = await this.roleModel.findOne({ name: 'USER' });
        if (!defaultRole) {
            defaultRole = await new this.roleModel({ name: 'USER', description: 'Người dùng thông thường' }).save();
        }
        const username = googleData.email.split('@')[0] + '_' + Date.now();
        const newUser = new this.userModel({
            username,
            password: null,
            email: googleData.email.toLowerCase(),
            fullName: googleData.fullName,
            avatarUrl: googleData.avatarUrl || 'https://i.sstatic.net/l60Hf.png',
            provider: 'google',
            providerId: googleData.providerId,
            role: defaultRole._id,
            loginCount: 1,
        });
        return newUser.save();
    }
    async verify2FA(emailOrPhone, code) {
        const record = await this.twoFactorModel.findOne({
            emailOrPhone,
            code,
            used: false,
            expiryDate: { $gt: new Date() },
        });
        if (!record) {
            throw new Error('Mã xác thực không hợp lệ hoặc đã hết hạn');
        }
        record.used = true;
        await record.save();
        await this.twoFactorModel.deleteMany({ emailOrPhone });
        const user = await this.userModel
            .findOne({
            $or: [
                { email: emailOrPhone.toLowerCase() },
                { phone: phone_validator_1.PhoneValidator.normalize(emailOrPhone) },
            ],
        })
            .populate('role');
        if (!user)
            throw new Error('Không tìm thấy user');
        user.loginCount = (user.loginCount || 0) + 1;
        await user.save();
        const token = this.jwtService.sign({ id: user._id });
        return {
            message: 'Xác thực thành công',
            token,
            userId: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            birthDate: user.birthDate,
            roles: [user.role?.name].filter(Boolean),
        };
    }
    async toggle2FA(userId, enabled) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error('Không tìm thấy người dùng');
        user.twoFactorEnabled = enabled;
        return user.save();
    }
    async changePassword(userId, dto) {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new Error('Mật khẩu xác nhận không khớp');
        }
        this.passwordValidator.validate(dto.newPassword);
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new Error('Không tìm thấy người dùng');
        if (!user.password)
            throw new Error('Tài khoản Google không thể đổi mật khẩu');
        const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isMatch)
            throw new Error('Mật khẩu cũ không đúng');
        user.password = dto.newPassword;
        await user.save();
    }
    async forgotPassword(dto) {
        const user = await this.userModel.findOne({ email: dto.email.toLowerCase() });
        if (!user)
            throw new Error('Email không tồn tại trong hệ thống');
        if (!user.password)
            throw new Error('Tài khoản Google không thể đặt lại mật khẩu');
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        const result = await this.mailHandler.sendPasswordResetEmail(dto.email, resetToken);
        if (!result.success)
            throw new Error('Không thể gửi email. Vui lòng thử lại');
    }
    async resetPassword(dto) {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new Error('Mật khẩu xác nhận không khớp');
        }
        this.passwordValidator.validate(dto.newPassword);
        const user = await this.userModel.findOne({
            email: dto.email.toLowerCase(),
            resetPasswordToken: dto.resetToken,
            resetPasswordExpires: { $gt: new Date() },
        });
        if (!user)
            throw new Error('Mã xác thực không hợp lệ hoặc đã hết hạn');
        user.password = dto.newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __param(2, (0, mongoose_1.InjectModel)(two_factor_code_schema_1.TwoFactorCode.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        mail_handler_1.MailHandler,
        password_validator_1.PasswordValidator,
        phone_validator_1.PhoneValidator])
], AuthService);
//# sourceMappingURL=auth.service.js.map