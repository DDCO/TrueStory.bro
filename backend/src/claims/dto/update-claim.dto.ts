import { IsEnum, IsOptional } from 'class-validator';
import { ClaimStatus } from '../entities/claim.entity';

export class UpdateClaimDto {
  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;
}
