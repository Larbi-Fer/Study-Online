import { Allow, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class GetChallengesDto {
  @IsNotEmpty()
  @IsString()
  topicId: string

  @Allow()
  take?: string
  
  @IsString()
  userId: string
}