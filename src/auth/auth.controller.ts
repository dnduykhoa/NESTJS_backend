import {
  Controller, Post, Put, Get,
  Body, Param, Res, HttpStatus, UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '../common/dto/api-response.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Toggle2faDto } from './dto/toggle-2fa.dto';
import { Verify2faDto } from './dto/verify-2fa.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // ── Kiểm tra tồn tại ────────────────────────────────────────────────────

  @Get('check-username/:username')
  async checkUsername(@Param('username') username: string, @Res() res: Response) {
    const exists = await this.authService.checkUsername(username);
    return res.status(HttpStatus.OK).json(new ApiResponse('Kiểm tra tên đăng nhập', { exists }));
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string, @Res() res: Response) {
    const exists = await this.authService.checkEmail(email);
    return res.status(HttpStatus.OK).json(new ApiResponse('Kiểm tra email', { exists }));
  }

  @Get('check-phone/:phone')
  async checkPhone(@Param('phone') phone: string, @Res() res: Response) {
    const exists = await this.authService.checkPhone(phone);
    return res.status(HttpStatus.OK).json(new ApiResponse('Kiểm tra số điện thoại', { exists }));
  }

  // ── Đăng ký ──────────────────────────────────────────────────────────────

  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    try {
      const result = await this.authService.register(dto);
      return res.status(HttpStatus.CREATED).json(
        new ApiResponse('Đăng ký thành công', {
          token: result.token,
          userId: (result.user as any)._id,
          username: result.user.username,
          email: result.user.email,
          fullName: result.user.fullName,
        }),
      );
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Đăng nhập ────────────────────────────────────────────────────────────

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(dto);
      return res.status(HttpStatus.OK).json(new ApiResponse(result.message || 'Đăng nhập thành công', result));
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).json(new ApiResponse(e.message, null));
    }
  }

  // ── Google OAuth (idToken) ────────────────────────────────────────────────

  @Post('google')
  async googleLogin(@Body() dto: GoogleLoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.loginWithGoogle(dto.idToken);
      const user = result.user as any;
      return res.status(HttpStatus.OK).json(
        new ApiResponse('Đăng nhập Google thành công', {
          token: result.token,
          userId: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
        }),
      );
    } catch (e) {
      return res.status(HttpStatus.UNAUTHORIZED).json(new ApiResponse(e.message, null));
    }
  }

  // ── Google OAuth2 Passport redirect flow ────────────────────────────────

  @Get('google/oauth')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@CurrentUser() user: any, @Res() res: Response) {
    const token = this.jwtService.sign({ id: user._id });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  }

  // ── Đăng xuất ────────────────────────────────────────────────────────────

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(new ApiResponse('Đăng xuất thành công', null));
  }

  // ── Đổi mật khẩu ─────────────────────────────────────────────────────────

  @Put('change-password/:id')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    try {
      await this.authService.changePassword(id, dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Đổi mật khẩu thành công', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Quên mật khẩu ────────────────────────────────────────────────────────

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Res() res: Response) {
    try {
      await this.authService.forgotPassword(dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Mã xác thực đã gửi đến email của bạn', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Đặt lại mật khẩu ─────────────────────────────────────────────────────

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res: Response) {
    try {
      await this.authService.resetPassword(dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Đặt lại mật khẩu thành công', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Toggle 2FA ────────────────────────────────────────────────────────────

  @Put('toggle-2fa/:id')
  @UseGuards(JwtAuthGuard)
  async toggle2FA(
    @Param('id') id: string,
    @Body() dto: Toggle2faDto,
    @Res() res: Response,
  ) {
    try {
      await this.authService.toggle2FA(id, dto.enabled);
      return res.status(HttpStatus.OK).json(
        new ApiResponse(
          dto.enabled ? 'Đã bật xác thực 2 bước' : 'Đã tắt xác thực 2 bước',
          null,
        ),
      );
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Verify 2FA ────────────────────────────────────────────────────────────

  @Post('verify-2fa')
  async verify2FA(@Body() dto: Verify2faDto, @Res() res: Response) {
    try {
      const result = await this.authService.verify2FA(dto.emailOrPhone, dto.code);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xác thực 2 bước thành công', result));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
