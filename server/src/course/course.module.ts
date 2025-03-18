import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ChallengesService } from 'src/challenges/challenges.service';
import { LessonsService } from 'src/lessons/lessons.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, ChallengesService, LessonsService]
})
export class CourseModule {}
