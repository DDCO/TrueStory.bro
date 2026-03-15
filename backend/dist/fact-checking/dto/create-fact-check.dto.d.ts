import { FactCheckType } from '../entities/fact-check.entity';
export declare class CreateFactCheckDto {
    claimId: string;
    userId: string;
    type: FactCheckType;
    content: string;
}
