import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCodeReviewDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  explication: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  programmeId?: string;
}