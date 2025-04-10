import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/challenges.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { CourseService } from './course.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('course')
export class CourseController {
  constructor(
    private challengesService: ChallengesService,
    private lessonsService: LessonsService,
    private courseService: CourseService,
    private prisma: PrismaService
  ) {}

  @Get(':userId')
  async dashboardData(@Param('userId') userId: string, @Query('topicId') topicId: string) {
    const challenges = await this.challengesService.getChallenges(topicId, 4, userId)
    const points = await this.challengesService.getUserPoints(userId)

    const lastLesson = await this.lessonsService.getLastLesson(userId)
    const lastLessonLevel = Math.ceil(lastLesson.lesson.number / 3)
    const currentLesson = await this.lessonsService.getCurrentLesson(userId)

    const { level } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        level: true,
      }
    })

    const lessonOrQuiz: any = {}

    if (!lastLesson) lessonOrQuiz.lesson = currentLesson.lesson
    else
      if (lastLesson.lesson.quiz) {
        if (lastLessonLevel == level) {
          lessonOrQuiz.quiz = lastLesson.lesson.quiz
          lessonOrQuiz.quiz.number = lastLessonLevel
        } else lessonOrQuiz.lesson = currentLesson.lesson
      } else lessonOrQuiz.lesson = currentLesson.lesson

    // console.log(lessonOrQuiz);

    const lessonsC = await this.lessonsService.getCompletedLessons(topicId, userId)
    const lessonsN = (await this.lessonsService.getLessons(topicId, userId)).payload.length

    // calendar
    const streaks = await this.courseService.completedLessonsForMonth(userId, new Date().getMonth())

    return {
      message: 'SUCCESS',
      payload: {
        challenges, points, lessonsC, lessonsN, lessonOrQuiz, streaks
      }
    }
  }

  @Get(':userId/streaks')
  async streaks(@Param('userId') userId: string, @Query('month') month: string) {
    const streaks = await this.courseService.completedLessonsForMonth(userId, parseInt(month))

    return {
      message: 'SUCCESS',
      payload: streaks
    }
  }
}
