import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private readonly repo: Repository<Claim>,
  ) {}

  async create(dto: CreateClaimDto): Promise<Claim> {
    const claim = this.repo.create(dto);
    return this.repo.save(claim);
  }

  async findAll(): Promise<Claim[]> {
    return this.repo.find({
      relations: ['author', 'event'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByEventId(eventId: string): Promise<Claim[]> {
    return this.repo.find({
      where: { eventId },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Claim> {
    const claim = await this.repo.findOne({
      where: { id },
      relations: ['author', 'event', 'evidence', 'factChecks', 'predictions'],
    });
    if (!claim) throw new NotFoundException('Claim not found');
    return claim;
  }

  async update(id: string, dto: UpdateClaimDto): Promise<Claim> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
