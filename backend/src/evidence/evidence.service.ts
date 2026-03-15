import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evidence } from './entities/evidence.entity';
import { CreateEvidenceDto } from './dto/create-evidence.dto';

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(Evidence)
    private readonly repo: Repository<Evidence>,
  ) {}

  async create(dto: CreateEvidenceDto): Promise<Evidence> {
    const evidence = this.repo.create(dto);
    return this.repo.save(evidence);
  }

  async findByClaimId(claimId: string): Promise<Evidence[]> {
    return this.repo.find({
      where: { claimId },
      relations: ['addedBy'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Evidence> {
    const evidence = await this.repo.findOne({
      where: { id },
      relations: ['claim', 'addedBy'],
    });
    if (!evidence) throw new NotFoundException('Evidence not found');
    return evidence;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
