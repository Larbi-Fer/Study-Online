import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/:quizId')
  getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.getQuizById(quizId)
  }
}
