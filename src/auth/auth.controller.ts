import { Controller, Post, Body, Get, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    // Validation: Bắt buộc phải có password khi đăng ký thông thường
    if (!body.password || body.password.trim() === '') {
      throw new BadRequestException('Password là bắt buộc');
    }

    // Kiểm tra xác nhận mật khẩu
    if (!body.confirmPassword) {
      throw new BadRequestException('Vui lòng xác nhận lại mật khẩu');
    }

    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }
    
    if (body.password.length < 8) {
      throw new BadRequestException('Password phải có ít nhất 8 ký tự');
    }

    // Kiểm tra password phải có chữ hoa
    if (!/[A-Z]/.test(body.password)) {
      throw new BadRequestException('Password phải có ít nhất 1 chữ hoa');
    }

    // Kiểm tra password phải có chữ thường
    if (!/[a-z]/.test(body.password)) {
      throw new BadRequestException('Password phải có ít nhất 1 chữ thường');
    }

    // Kiểm tra password phải có số
    if (!/[0-9]/.test(body.password)) {
      throw new BadRequestException('Password phải có ít nhất 1 chữ số');
    }

    // Kiểm tra password phải có ký tự đặc biệt
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.password)) {
      throw new BadRequestException('Password phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)');
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

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard sẽ redirect đến Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
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

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Req() req,
    @Body() body: { oldPassword: string; newPassword: string; confirmNewPassword: string },
  ) {
    // Validation
    if (!body.oldPassword || !body.newPassword || !body.confirmNewPassword) {
      throw new BadRequestException('Vui lòng nhập đầy đủ mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu mới');
    }

    // Kiểm tra xác nhận mật khẩu mới
    if (body.newPassword !== body.confirmNewPassword) {
      throw new BadRequestException('Mật khẩu mới và xác nhận mật khẩu không khớp');
    }

    if (body.newPassword.length < 8) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 8 ký tự');
    }

    // Kiểm tra mật khẩu mới phải có chữ hoa
    if (!/[A-Z]/.test(body.newPassword)) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ hoa');
    }

    // Kiểm tra mật khẩu mới phải có chữ thường
    if (!/[a-z]/.test(body.newPassword)) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ thường');
    }

    // Kiểm tra mật khẩu mới phải có số
    if (!/[0-9]/.test(body.newPassword)) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 1 chữ số');
    }

    // Kiểm tra mật khẩu mới phải có ký tự đặc biệt
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.newPassword)) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)');
    }

    if (body.oldPassword === body.newPassword) {
      throw new BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
    }

    const result = await this.authService.changePassword(
      req.user._id,
      body.oldPassword,
      body.newPassword,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return {
      success: true,
      message: 'Đổi mật khẩu thành công',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    if (!body.email) {
      throw new BadRequestException('Vui lòng nhập email');
    }

    const result = await this.authService.forgotPassword(body.email);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return {
      success: true,
      message: result.message,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { resetToken: string; newPassword: string }) {
    if (!body.resetToken || !body.newPassword) {
      throw new BadRequestException('Vui lòng nhập mã xác thực và mật khẩu mới');
    }

    if (body.newPassword.length < 6) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
    }

    const result = await this.authService.resetPassword(
      body.resetToken,
      body.newPassword,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return {
      success: true,
      message: 'Đặt lại mật khẩu thành công',
    };
  }
}
