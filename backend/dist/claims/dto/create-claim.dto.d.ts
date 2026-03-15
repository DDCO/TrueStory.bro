import { ClaimStatus } from '../entities/claim.entity';
export declare class CreateClaimDto {
    eventId: string;
    authorId: string;
    content: string;
    status?: ClaimStatus;
}
