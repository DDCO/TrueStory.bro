import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({
      order: { reputationScore: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.repo.findOne({ where: { googleId } });
  }

  async findByFacebookId(facebookId: string): Promise<User | null> {
    return this.repo.findOne({ where: { facebookId } });
  }

  async findOrCreateByGoogle(profile: { id: string; displayName?: string; emails?: { value: string }[] }): Promise<User> {
    let user = await this.findByGoogleId(profile.id);
    if (user) return user;
    const displayName = profile.displayName || profile.emails?.[0]?.value?.split('@')[0] || `User ${profile.id.slice(0, 8)}`;
    const email = profile.emails?.[0]?.value ?? null;
    user = this.repo.create({ displayName, email, googleId: profile.id });
    return this.repo.save(user);
  }

  async findOrCreateByFacebook(profile: { id: string; displayName?: string; name?: { givenName?: string; familyName?: string }; emails?: { value: string }[] }): Promise<User> {
    let user = await this.findByFacebookId(profile.id);
    if (user) return user;
    const displayName = profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' ') || profile.emails?.[0]?.value?.split('@')[0] || `User ${profile.id.slice(0, 8)}`;
    const email = profile.emails?.[0]?.value ?? null;
    user = this.repo.create({ displayName, email, facebookId: profile.id });
    return this.repo.save(user);
  }

  async adjustReputation(userId: string, delta: number): Promise<User> {
    const user = await this.findOne(userId);
    user.reputationScore = Math.max(0, user.reputationScore + delta);
    return this.repo.save(user);
  }
}
