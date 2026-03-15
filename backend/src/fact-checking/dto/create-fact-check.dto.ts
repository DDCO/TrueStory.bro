import { IsString, IsUUID, IsEnum } from 'class-validator';
import { FactCheckType } from '../entities/fact-check.entity';

export class CreateFactCheckDto {
  @IsUUID()
  claimId: string;

  @IsUUID()
  userId: string;

  @IsEnum(FactCheckType)
  type: FactCheckType;

  @IsString()
  content: string;
}
