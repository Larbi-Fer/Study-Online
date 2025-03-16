import { Body, Controller, Get, Param, Patch, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { NewAnswersDto, QuizIdDto } from './dto';

@Controller('user/:id')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/next-lesson')
  nextLesson(@Param('id') id: string) {
    return this.userService.nextLesson(id)
  }

  @Put('/quiz/answers')
  setNewAnswers(@Param('id') userId: string, @Body() {quizId, answers, percent}: NewAnswersDto) {
    return this.userService.setNewAnswers(userId, quizId, answers, percent)
  }

  @Get('/quiz/result')
  quizResult(@Param('id') userId: string, @Query() { quizId }: QuizIdDto) {
    return this.userService.quizResult(userId, quizId)
  }
}
