import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<User>);
    create(dto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByGoogleId(googleId: string): Promise<User | null>;
    findByFacebookId(facebookId: string): Promise<User | null>;
    findOrCreateByGoogle(profile: {
        id: string;
        displayName?: string;
        emails?: {
            value: string;
        }[];
    }): Promise<User>;
    findOrCreateByFacebook(profile: {
        id: string;
        displayName?: string;
        name?: {
            givenName?: string;
            familyName?: string;
        };
        emails?: {
            value: string;
        }[];
    }): Promise<User>;
    adjustReputation(userId: string, delta: number): Promise<User>;
}
