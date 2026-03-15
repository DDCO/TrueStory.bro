import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';

@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private readonly repo: Repository<Prediction>,
  ) {}

  async create(dto: CreatePredictionDto): Promise<Prediction> {
    const prediction = this.repo.create(dto);
    return this.repo.save(prediction);
  }

  async findByClaimId(claimId: string): Promise<Prediction[]> {
    return this.repo.find({
      where: { claimId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Prediction> {
    const prediction = await this.repo.findOne({
      where: { id },
      relations: ['claim', 'user'],
    });
    if (!prediction) throw new NotFoundException('Prediction not found');
    return prediction;
  }

  async getAggregateForClaim(claimId: string): Promise<{ avg: number; count: number }> {
    const result = await this.repo
      .createQueryBuilder('p')
      .select('AVG(p.probability)', 'avg')
      .addSelect('COUNT(p.id)', 'count')
      .where('p.claimId = :claimId', { claimId })
      .getRawOne<{ avg: string; count: string }>();
    return {
      avg: result?.avg ? parseFloat(result.avg) : 0,
      count: result?.count ? parseInt(result.count, 10) : 0,
    };
  }
}
