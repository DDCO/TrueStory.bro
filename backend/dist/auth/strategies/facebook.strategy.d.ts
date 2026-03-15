import { Strategy } from 'passport-facebook';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
interface FacebookProfile {
    id: string;
    displayName?: string;
    name?: {
        givenName?: string;
        familyName?: string;
    };
    emails?: {
        value: string;
    }[];
}
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: FacebookProfile, done: (err: null, user: User) => void): Promise<void>;
}
export {};
