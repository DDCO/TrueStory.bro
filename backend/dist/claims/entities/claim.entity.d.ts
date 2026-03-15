import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';
import { Evidence } from '../../evidence/entities/evidence.entity';
import { FactCheck } from '../../fact-checking/entities/fact-check.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';
export declare enum ClaimStatus {
    Unverified = "unverified",
    EvidenceProvided = "evidence_provided",
    MultipleConfirmations = "multiple_confirmations",
    Confirmed = "confirmed"
}
export declare class Claim {
    id: string;
    eventId: string;
    authorId: string;
    content: string;
    status: ClaimStatus;
    createdAt: Date;
    event: Event;
    author: User;
    evidence: Evidence[];
    factChecks: FactCheck[];
    predictions: Prediction[];
}
