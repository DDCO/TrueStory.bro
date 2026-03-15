import { Claim } from '../../claims/entities/claim.entity';
import { FactCheck } from '../../fact-checking/entities/fact-check.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';
export declare class User {
    id: string;
    displayName: string | null;
    email: string | null;
    googleId: string | null;
    facebookId: string | null;
    reputationScore: number;
    verifiedReporter: boolean;
    createdAt: Date;
    claims: Claim[];
    factChecks: FactCheck[];
    predictions: Prediction[];
}
