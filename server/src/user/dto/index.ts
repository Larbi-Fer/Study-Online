import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class QuizIdDto {
  @IsNotEmpty()
  @IsString()
  quizId: string;
}

export class NewAnswersDto extends QuizIdDto {

  @IsNotEmpty()
  answers: quizStatistics[]

  @IsNumber()
  percent: number
}