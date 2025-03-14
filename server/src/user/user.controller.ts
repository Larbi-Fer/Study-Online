import { Body, Controller, Param, Patch, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { NewAnswers } from './dto';

@Controller('user/:id')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/next-lesson')
  nextLesson(@Param('id') id: string) {
    return this.userService.nextLesson(id)
  }

  @Put('/quiz/answers')
  setNewAnswers(@Param('id') userId: string, @Body() {quizId, answers, percent}: NewAnswers) {
    return this.userService.setNewAnswers(userId, quizId, answers, percent)
  }
}
