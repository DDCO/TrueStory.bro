import { IsString, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { EvidenceType } from '../entities/evidence.entity';

export class CreateEvidenceDto {
  @IsUUID()
  claimId: string;

  @IsUUID()
  addedById: string;

  @IsEnum(EvidenceType)
  type: EvidenceType;

  @IsString()
  urlOrContent: string;

  @IsOptional()
  @IsString()
  description?: string;
}
