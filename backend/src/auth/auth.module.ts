import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleOAuthEnabledGuard, FacebookOAuthEnabledGuard } from './guards/oauth-enabled.guard';
import { DevOnlyGuard } from './guards/dev-only.guard';

const googleEnabled = !!process.env.GOOGLE_CLIENT_ID;
const facebookEnabled = !!process.env.FACEBOOK_APP_ID;

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'truestory-dev-secret-change-in-production',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleOAuthEnabledGuard,
    FacebookOAuthEnabledGuard,
    DevOnlyGuard,
    ...(googleEnabled ? [GoogleStrategy] : []),
    ...(facebookEnabled ? [FacebookStrategy] : []),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
