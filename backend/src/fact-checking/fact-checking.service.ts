import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactCheck } from './entities/fact-check.entity';
import { CreateFactCheckDto } from './dto/create-fact-check.dto';

@Injectable()
export class FactCheckingService {
  constructor(
    @InjectRepository(FactCheck)
    private readonly repo: Repository<FactCheck>,
  ) {}

  async create(dto: CreateFactCheckDto): Promise<FactCheck> {
    const factCheck = this.repo.create(dto);
    return this.repo.save(factCheck);
  }

  async findByClaimId(claimId: string): Promise<FactCheck[]> {
    return this.repo.find({
      where: { claimId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<FactCheck> {
    const fc = await this.repo.findOne({
      where: { id },
      relations: ['claim', 'user'],
    });
    if (!fc) throw new NotFoundException('Fact check not found');
    return fc;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
