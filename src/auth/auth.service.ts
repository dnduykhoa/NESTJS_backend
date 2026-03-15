import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { TwoFactorCode, TwoFactorCodeDocument } from './schemas/two-factor-code.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordValidator } from '../utils/password.validator';
import { PhoneValidator } from '../utils/phone.validator';
import { MailHandler } from '../utils/mail.handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(TwoFactorCode.name) private readonly twoFactorModel: Model<TwoFactorCodeDocument>,
    private readonly jwtService: JwtService,
    private readonly mailHandler: MailHandler,
    private readonly passwordValidator: PasswordValidator,
    private readonly phoneValidator: PhoneValidator,
  ) {}

  // ─── Kiểm tra tồn tại ───────────────────────────────────────────────────

  async checkUsername(username: string): Promise<boolean> {
    const exists = await this.userModel.findOne({ username });
    return !!exists;
  }

  async checkEmail(email: string): Promise<boolean> {
    const exists = await this.userModel.findOne({ email: email.toLowerCase() });
    return !!exists;
  }

  async checkPhone(phone: string): Promise<boolean> {
    const normalized = PhoneValidator.normalize(phone);
    const exists = await this.userModel.findOne({ phone: normalized });
    return !!exists;
  }

  // ─── Đăng ký ────────────────────────────────────────────────────────────

  async register(dto: RegisterDto): Promise<{ token: string; user: UserDocument }> {
    // Validate password strength
    this.passwordValidator.validate(dto.password);

    if (dto.password !== dto.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }

    const normalizedPhone = PhoneValidator.normalize(dto.phone);
    this.phoneValidator.validate(normalizedPhone);

    // Kiểm tra unique
    if (await this.userModel.findOne({ username: dto.username })) {
      throw new Error('Tên đăng nhập đã được sử dụng');
    }
    if (await this.userModel.findOne({ email: dto.email.toLowerCase() })) {
      throw new Error('Email đã được sử dụng');
    }
    if (await this.userModel.findOne({ phone: normalizedPhone })) {
      throw new Error('Số điện thoại đã được sử dụng');
    }

    // Lấy role mặc định (USER)
    let defaultRole = await this.roleModel.findOne({ name: 'USER' });
    if (!defaultRole) {
      defaultRole = await new this.roleModel({ name: 'USER', description: 'Người dùng thông thường' }).save();
    }

    const newUser = new this.userModel({
      username: dto.username,
      password: dto.password, // sẽ được hash bởi pre-save hook
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

  // ─── Đăng nhập ──────────────────────────────────────────────────────────

  async login(dto: LoginDto): Promise<any> {
    const normalizedInput = PhoneValidator.normalize(dto.emailOrPhone);

    // Tìm theo email hoặc phone
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

    // 2FA
    if (user.twoFactorEnabled) {
      const emailOrPhone = user.email;
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 phút
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
      roles: [(user.role as any)?.name].filter(Boolean),
      twoFactorEnabled: user.twoFactorEnabled,
    };
  }

  // ─── Google OAuth (qua idToken) ─────────────────────────────────────────

  async loginWithGoogle(idToken: string): Promise<{ token: string; user: any }> {
    // Verify idToken với Google
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
    );
    if (!resp.ok) {
      throw new Error('Google token không hợp lệ');
    }
    const info: any = await resp.json();
    if (info.error) throw new Error('Google token không hợp lệ: ' + info.error);

    // Kiểm tra audience
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
    const token = this.jwtService.sign({ id: (user as any)._id });
    return { token, user };
  }

  async validateGoogleUser(googleData: {
    providerId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  }): Promise<UserDocument> {
    // Tìm theo providerId
    let user = await this.userModel
      .findOne({ provider: 'google', providerId: googleData.providerId })
      .populate('role');
    if (user) {
      user.loginCount = (user.loginCount || 0) + 1;
      await user.save();
      return user;
    }

    // Tìm theo email (gộp tài khoản)
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

    // Tạo mới
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

  // ─── Verify 2FA ─────────────────────────────────────────────────────────

  async verify2FA(emailOrPhone: string, code: string): Promise<any> {
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
          { phone: PhoneValidator.normalize(emailOrPhone) },
        ],
      })
      .populate('role');

    if (!user) throw new Error('Không tìm thấy user');

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
      roles: [(user.role as any)?.name].filter(Boolean),
    };
  }

  // ─── Toggle 2FA ─────────────────────────────────────────────────────────

  async toggle2FA(userId: string, enabled: boolean): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('Không tìm thấy người dùng');
    user.twoFactorEnabled = enabled;
    return user.save();
  }

  // ─── Đổi mật khẩu ───────────────────────────────────────────────────────

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }
    this.passwordValidator.validate(dto.newPassword);

    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('Không tìm thấy người dùng');
    if (!user.password) throw new Error('Tài khoản Google không thể đổi mật khẩu');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new Error('Mật khẩu cũ không đúng');

    user.password = dto.newPassword; // pre-save hook sẽ hash lại
    await user.save();
  }

  // ─── Quên mật khẩu ──────────────────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.userModel.findOne({ email: dto.email.toLowerCase() });
    if (!user) throw new Error('Email không tồn tại trong hệ thống');
    if (!user.password) throw new Error('Tài khoản Google không thể đặt lại mật khẩu');

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const result = await this.mailHandler.sendPasswordResetEmail(dto.email, resetToken);
    if (!result.success) throw new Error('Không thể gửi email. Vui lòng thử lại');
  }

  // ─── Đặt lại mật khẩu ───────────────────────────────────────────────────

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp');
    }
    this.passwordValidator.validate(dto.newPassword);

    const user = await this.userModel.findOne({
      email: dto.email.toLowerCase(),
      resetPasswordToken: dto.resetToken,
      resetPasswordExpires: { $gt: new Date() },
    });
    if (!user) throw new Error('Mã xác thực không hợp lệ hoặc đã hết hạn');

    user.password = dto.newPassword; // pre-save hook sẽ hash
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
  }
}
