"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcrypt"));
const user_schema_1 = require("../users/schemas/user.schema");
const mail_handler_1 = require("../utils/mail.handler");
let AuthService = class AuthService {
    userModel;
    jwtService;
    mailHandler;
    constructor(userModel, jwtService, mailHandler) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.mailHandler = mailHandler;
    }
    async register(userData) {
        const newUser = new this.userModel({
            ...userData,
            status: false,
            loginCount: 0,
        });
        await newUser.save();
        return newUser;
    }
    async login(username, password) {
        const user = await this.userModel.findOne({ username });
        if (!user || !user.password) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token, user };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            return { success: false, message: 'Người dùng không tồn tại' };
        }
        if (!user.password) {
            return { success: false, message: 'Tài khoản đăng nhập bằng Google không thể đổi mật khẩu' };
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return { success: false, message: 'Mật khẩu cũ không đúng' };
        }
        user.password = newPassword;
        await user.save();
        return { success: true, message: 'Đổi mật khẩu thành công' };
    }
    async forgotPassword(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return { success: false, message: 'Email không tồn tại trong hệ thống' };
        }
        if (!user.password) {
            return { success: false, message: 'Tài khoản đăng nhập bằng Google không thể đặt lại mật khẩu' };
        }
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        const emailResult = await this.mailHandler.sendPasswordResetEmail(email, resetToken);
        if (!emailResult.success) {
            return { success: false, message: 'Không thể gửi email. Vui lòng thử lại sau' };
        }
        return { success: true, message: 'Mã xác thực đã được gửi đến email của bạn' };
    }
    async resetPassword(resetToken, newPassword) {
        const user = await this.userModel.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: new Date() },
        });
        if (!user) {
            return { success: false, message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' };
        }
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return { success: true, message: 'Đặt lại mật khẩu thành công' };
    }
    async validateGoogleUser(googleData) {
        let user = await this.userModel.findOne({ googleId: googleData.googleId });
        if (user) {
            user.loginCount = (user.loginCount || 0) + 1;
            user.status = true;
            await user.save();
            return user;
        }
        user = await this.userModel.findOne({ email: googleData.email });
        if (user) {
            user.googleId = googleData.googleId;
            user.loginCount = (user.loginCount || 0) + 1;
            user.status = true;
            await user.save();
            return user;
        }
        const newUser = new this.userModel({
            googleId: googleData.googleId,
            email: googleData.email,
            fullName: googleData.fullName,
            avatarUrl: googleData.avatarUrl || 'https://i.sstatic.net/l60Hf.png',
            username: googleData.email.split('@')[0],
            password: null,
            role: process.env.DEFAULT_ROLE_ID || '',
            status: true,
            loginCount: 1,
        });
        await newUser.save();
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mail_handler_1.MailHandler])
], AuthService);
//# sourceMappingURL=auth.service.js.map