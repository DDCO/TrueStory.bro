import { Claim } from '../../claims/entities/claim.entity';
import { User } from '../../users/entities/user.entity';
export declare enum FactCheckType {
    Challenge = "challenge",
    Confirm = "confirm",
    CounterEvidence = "counter_evidence",
    Context = "context"
}
export declare class FactCheck {
    id: string;
    claimId: string;
    userId: string;
    type: FactCheckType;
    content: string;
    createdAt: Date;
    claim: Claim;
    user: User;
}
