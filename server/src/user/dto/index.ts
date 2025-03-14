import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewAnswers {
  @IsNotEmpty()
  @IsString()
  quizId: string;

  @IsNotEmpty()
  answers: quizStatistics[]

  @IsNumber()
  percent: number
}