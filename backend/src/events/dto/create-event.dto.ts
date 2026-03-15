import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(300)
  title: string;

  @IsString()
  @MaxLength(200)
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
