import { IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ClaimStatus } from '../entities/claim.entity';

export class CreateClaimDto {
  @IsUUID()
  eventId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;
}
