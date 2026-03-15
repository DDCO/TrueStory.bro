import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class GoogleOAuthEnabledGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.GOOGLE_CLIENT_ID) return true;
    throw new ServiceUnavailableException(
      'Google login is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable.',
    );
  }
}

@Injectable()
export class FacebookOAuthEnabledGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.FACEBOOK_APP_ID) return true;
    throw new ServiceUnavailableException(
      'Facebook login is not configured. Set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to enable.',
    );
  }
}
