import { Claim } from '../../claims/entities/claim.entity';
import { User } from '../../users/entities/user.entity';
export declare class Prediction {
    id: string;
    claimId: string;
    userId: string;
    probability: number;
    createdAt: Date;
    resolvedCorrect: boolean | null;
    claim: Claim;
    user: User;
}
