import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
export declare class PredictionsController {
    private readonly predictionsService;
    constructor(predictionsService: PredictionsService);
    create(createPredictionDto: CreatePredictionDto): Promise<import("./entities/prediction.entity").Prediction>;
    findByClaim(claimId: string): Promise<import("./entities/prediction.entity").Prediction[]>;
    getAggregate(claimId: string): Promise<{
        avg: number;
        count: number;
    }>;
    findOne(id: string): Promise<import("./entities/prediction.entity").Prediction>;
}
