import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { MailHandler } from '../utils/mail.handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService,
    private mailHandler: MailHandler,
  ) {}

  async register(userData: {
    username: string;
    password: string;
    email: string;
    role: string;
    avatarUrl?: string;
    fullName?: string;
    birthday?: Date;
  }) {
    const newUser = new this.userModel({
      ...userData,
      status: false,
      loginCount: 0,
    });
    await newUser.save();
    return newUser;
  }

  async login(username: string, password: string) {
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

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId);
    
    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại' };
    }

    // Kiểm tra nếu user đăng nhập bằng Google (không có password)
    if (!user.password) {
      return { success: false, message: 'Tài khoản đăng nhập bằng Google không thể đổi mật khẩu' };
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return { success: false, message: 'Mật khẩu cũ không đúng' };
    }

    // Cập nhật mật khẩu mới (schema sẽ tự động hash)
    user.password = newPassword;
    await user.save();

    return { success: true, message: 'Đổi mật khẩu thành công' };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    
    if (!user) {
      return { success: false, message: 'Email không tồn tại trong hệ thống' };
    }

    // Kiểm tra nếu user đăng nhập bằng Google
    if (!user.password) {
      return { success: false, message: 'Tài khoản đăng nhập bằng Google không thể đặt lại mật khẩu' };
    }

    // Tạo reset token (6 số ngẫu nhiên)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Lưu token và thời gian hết hạn (15 phút)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
    await user.save();

    // Gửi email
    const emailResult = await this.mailHandler.sendPasswordResetEmail(email, resetToken);
    
    if (!emailResult.success) {
      return { success: false, message: 'Không thể gửi email. Vui lòng thử lại sau' };
    }

    return { success: true, message: 'Mã xác thực đã được gửi đến email của bạn' };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const user = await this.userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: new Date() }, // Token chưa hết hạn
    });

    if (!user) {
      return { success: false, message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' };
    }

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { success: true, message: 'Đặt lại mật khẩu thành công' };
  }

  async validateGoogleUser(googleData: {
    googleId: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  }) {
    // Tìm user theo googleId
    let user = await this.userModel.findOne({ googleId: googleData.googleId });
    
    if (user) {
      // Cập nhật loginCount
      user.loginCount = (user.loginCount || 0) + 1;
      user.status = true;
      await user.save();
      return user;
    }

    // Kiểm tra xem email đã tồn tại chưa
    user = await this.userModel.findOne({ email: googleData.email });
    
    if (user) {
      // Cập nhật googleId cho user đã tồn tại
      user.googleId = googleData.googleId;
      user.loginCount = (user.loginCount || 0) + 1;
      user.status = true;
      await user.save();
      return user;
    }

    // Tạo user mới với Google
    const newUser = new this.userModel({
      googleId: googleData.googleId,
      email: googleData.email,
      fullName: googleData.fullName,
      avatarUrl: googleData.avatarUrl || 'https://i.sstatic.net/l60Hf.png',
      username: googleData.email.split('@')[0],
      password: null, // Không cần password khi đăng nhập bằng Google
      role: process.env.DEFAULT_ROLE_ID || '', // Default role
      status: true,
      loginCount: 1,
    });

    await newUser.save();
    return newUser;
  }
}
