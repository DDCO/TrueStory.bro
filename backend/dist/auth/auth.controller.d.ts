import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    providers(): {
        google: boolean;
        facebook: boolean;
    };
    googleAuth(): void;
    googleAuthCallback(req: {
        user: User;
    }, res: Response): Promise<void>;
    facebookAuth(): void;
    facebookAuthCallback(req: {
        user: User;
    }, res: Response): Promise<void>;
    me(req: {
        user: User;
    }): User;
    devLogin(body: {
        userId: string;
    }): Promise<{
        access_token: string;
        user: User;
    }>;
}
