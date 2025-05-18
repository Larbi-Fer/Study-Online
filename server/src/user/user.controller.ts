import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { NewAnswersDto, QuizIdDto, TopicIdDto } from './dto';

@Controller('user/:id')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/create-reviewer')
  async createReviewer(
    @Body() data: { email: string; fullname: string; password: string }
  ) {
    const reviewer = await this.userService.createReviewer(data);
    if (!reviewer) return { message: 'ERROR', viewMessage: 'User already exists' };
    return { message: 'SUCCESS', payload: reviewer };
  }

  @Get('/main-data')
  userMainData(@Param('id') id: string) {
    return this.userService.getUserMainData(id)
  }

  @Patch('/next-lesson')
  nextLesson(@Param('id') id: string, @Query() { topicId }: TopicIdDto) {
    return this.userService.nextLesson(id, topicId)
  }

  @Put('/quiz/answers')
  async setNewAnswers(@Param('id') userId: string, @Body() { quizId, answers, percent, topicId }: NewAnswersDto) {
    const nextTopicId = await this.userService.setNewAnswers(userId, quizId, answers, percent, topicId)
    return {
      message: 'SUCCESS',
      payload: nextTopicId
    }
  }

  @Get('/quiz/result')
  quizResult(@Param('id') userId: string, @Query() { quizId }: QuizIdDto) {
    return this.userService.quizResult(userId, quizId)
  }

  @Get('/profile')
  async profile(@Param('id') profileId: string, @Query('userId') userId: string) {
    const p = await this.userService.getProfile(profileId, userId)
    if (!p) return {message: 'NOT_FOUND'}

    return {
      message: 'SUCCESS',
      payload: p
    }
  }

  @Get('/notifications')
  async getNotifs(@Param('id') id: string) {
    const notifs = await this.userService.getNotifications(id)
    
    return {
      message: 'SUCCESS',
      payload: notifs
    }
  }

  @Post('/notifications/:gid')
  async notifSeen(@Param('id') userId: string, @Param('gid') id: string) {
    await this.userService.notificationSeen(userId, id)
    return {message: 'SUCCESS'}
  }

  @Patch('/edit')
  async update(@Param('id') userId: string, @Body() data: any) {    
    await this.userService.updateProfile(userId, data)
    return {message: 'SUCCESS'}
  }
}
