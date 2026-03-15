import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
export declare class PredictionsService {
    private readonly repo;
    constructor(repo: Repository<Prediction>);
    create(dto: CreatePredictionDto): Promise<Prediction>;
    findByClaimId(claimId: string): Promise<Prediction[]>;
    findOne(id: string): Promise<Prediction>;
    getAggregateForClaim(claimId: string): Promise<{
        avg: number;
        count: number;
    }>;
}
