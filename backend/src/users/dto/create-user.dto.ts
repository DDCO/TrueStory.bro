import { IsString, IsOptional, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  displayName: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
