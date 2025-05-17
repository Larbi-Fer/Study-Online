import { Prisma } from "@prisma/client"
import { Allow, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetChallengesDto {
  @IsNotEmpty()
  @IsString()
  topicId: string

  @Allow()
  take?: string
  
  @Allow()
  userId: string
}

export class ChallengeDoneDto {
  @IsString()
  userId: string
}

export class ProgrammeIdDto {
  @IsString()
  programmeId: string
}

export class ProgrammeArgsDto {
  @IsString()
  code: string;
  @IsString()
  description: string;
  @IsString()
  goal: string;
  @IsString()
  title: string;
}

export class createChallengeDto {
  @Allow()
  data: ProgrammeArgsDto;
  @IsString()
  type: ProgrammeTypes;
  @IsString()
  topicId: string;
}

export class UpdateChallengeDto {
  @Allow()
  data: Prisma.ProgrammeUpdateInput
}