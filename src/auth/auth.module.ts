import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Role, RoleSchema } from '../roles/schemas/role.schema';
import { TwoFactorCode, TwoFactorCodeSchema } from './schemas/two-factor-code.schema';
import { MailHandler } from '../utils/mail.handler';
import { PasswordValidator } from '../utils/password.validator';
import { PhoneValidator } from '../utils/phone.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: TwoFactorCode.name, schema: TwoFactorCodeSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    MailHandler,
    PasswordValidator,
    PhoneValidator,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
