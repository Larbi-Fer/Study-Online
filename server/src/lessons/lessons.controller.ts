import { Controller, Get, Param, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonService: LessonsService) {}

  @Get()
  getLessons(@Query('topicId') topicId: string) {
    return this.lessonService.getLessons(topicId)
  }

  @Get('/:id')
  getLesson(@Param('id') lessonId: string) {
    return this.lessonService.getLessonById(lessonId)
  }
}
