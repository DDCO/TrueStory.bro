import { IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreatePredictionDto {
  @IsUUID()
  claimId: string;

  @IsUUID()
  userId: string;

  /** Probability 0–100 that the claim will turn out true */
  @IsInt()
  @Min(0)
  @Max(100)
  probability: number;
}
