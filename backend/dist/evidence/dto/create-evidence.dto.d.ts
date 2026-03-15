import { EvidenceType } from '../entities/evidence.entity';
export declare class CreateEvidenceDto {
    claimId: string;
    addedById: string;
    type: EvidenceType;
    urlOrContent: string;
    description?: string;
}
