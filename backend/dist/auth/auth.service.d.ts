import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: User): Promise<{
        access_token: string;
        user: User;
    }>;
    validateUserById(userId: string): Promise<User | null>;
}
