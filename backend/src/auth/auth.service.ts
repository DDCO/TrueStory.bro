import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ access_token: string; user: User }> {
    const payload = { sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token, user };
  }

  async validateUserById(userId: string): Promise<User | null> {
    try {
      return await this.usersService.findOne(userId);
    } catch {
      return null;
    }
  }
}
