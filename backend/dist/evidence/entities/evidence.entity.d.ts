import { Claim } from '../../claims/entities/claim.entity';
import { User } from '../../users/entities/user.entity';
export declare enum EvidenceType {
    Document = "document",
    Video = "video",
    Link = "link",
    Statement = "statement",
    Photo = "photo"
}
export declare class Evidence {
    id: string;
    claimId: string;
    addedById: string;
    type: EvidenceType;
    urlOrContent: string;
    description: string | null;
    createdAt: Date;
    claim: Claim;
    addedBy: User;
}
