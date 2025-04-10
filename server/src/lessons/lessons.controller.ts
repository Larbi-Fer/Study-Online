import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Get()
  getLessons(@Query('topicId') topicId: string, @Query('userId') userId: string) {
    return this.lessonService.getLessons(topicId, userId)
  }

  @Get('/:id')
  getLesson(@Param('id') lessonId: string) {
    return this.lessonService.getLessonById(lessonId)
  }
}
