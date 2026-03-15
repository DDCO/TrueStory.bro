import { Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DevOnlyGuard } from './guards/dev-only.guard';
import { GoogleOAuthEnabledGuard, FacebookOAuthEnabledGuard } from './guards/oauth-enabled.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Which OAuth providers are configured (no auth required). */
  @Get('providers')
  providers() {
    return {
      google: !!process.env.GOOGLE_CLIENT_ID,
      facebook: !!process.env.FACEBOOK_APP_ID,
    };
  }

  @Get('google')
  @UseGuards(GoogleOAuthEnabledGuard, AuthGuard('google'))
  googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthEnabledGuard, AuthGuard('google'))
  async googleAuthCallback(@Req() req: { user: User }, @Res() res: Response) {
    const { access_token } = await this.authService.login(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${access_token}`);
  }

  @Get('facebook')
  @UseGuards(FacebookOAuthEnabledGuard, AuthGuard('facebook'))
  facebookAuth() {
    // Guard redirects to Facebook
  }

  @Get('facebook/callback')
  @UseGuards(FacebookOAuthEnabledGuard, AuthGuard('facebook'))
  async facebookAuthCallback(@Req() req: { user: User }, @Res() res: Response) {
    const { access_token } = await this.authService.login(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${access_token}`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user: User }) {
    return req.user;
  }

  /**
   * Dev only: get a JWT for an existing user by ID (no password).
   * Only available when NODE_ENV !== 'production'. Use for local testing without OAuth.
   */
  @Post('dev-login')
  @UseGuards(DevOnlyGuard)
  async devLogin(@Body() body: { userId: string }) {
    const user = await this.authService.validateUserById(body.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.authService.login(user);
  }
}
