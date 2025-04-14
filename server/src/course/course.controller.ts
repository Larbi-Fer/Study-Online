import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/challenges.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';
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
    // wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000))
    const challenges = await this.challengesService.getChallenges(topicId, 4, userId)
    const points = await this.challengesService.getUserPoints(userId, topicId)

    const lastLesson = await this.lessonsService.getLastLesson(userId, topicId)
    const currentLesson = await this.lessonsService.getCurrentLesson(userId, topicId)

    const { level } = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        level: true,
      }
    })

    const lessonOrQuiz: any = {}

    if (!lastLesson) lessonOrQuiz.lesson = currentLesson
    else
      if (lastLesson.lesson.quiz) {
        const lastLessonLevel = Math.ceil(lastLesson.lesson.number / 3)
        if (lastLessonLevel == level) {
          // Check if quiz has been attempted and failed recently
          const lastQuizResult = lastLesson.lesson.quiz.quizResults[0]
          if (lastQuizResult && lastQuizResult.percent < QUIZ_PASS_PERCENTAGE) {
            const hoursSinceLastAttempt = Math.floor(
              (new Date().getTime() - new Date(lastQuizResult.lastAttempt).getTime()) / (1000 * 60 * 60)
            )
            
            // If less than 24 hours have passed since last attempt
            if (hoursSinceLastAttempt < 24) {
              lessonOrQuiz.quiz = lastLesson.lesson.quiz
              lessonOrQuiz.quiz.number = lastLessonLevel
              lessonOrQuiz.quizLocked = true
              lessonOrQuiz.unlockTime = new Date(lastQuizResult.lastAttempt.getTime() + 24 * 60 * 60 * 1000)
            } else {
              lessonOrQuiz.quiz = lastLesson.lesson.quiz
              lessonOrQuiz.quiz.number = lastLessonLevel
            }
          } else {
            lessonOrQuiz.quiz = lastLesson.lesson.quiz
            lessonOrQuiz.quiz.number = lastLessonLevel
          }
        } else lessonOrQuiz.lesson = currentLesson
      } else lessonOrQuiz.lesson = currentLesson

    // console.log(lessonOrQuiz);

    const lessonsC = await this.lessonsService.getCompletedLessons(topicId, userId)
    const lessonsN = (await this.lessonsService.getLessons(topicId, userId)).payload.length

    const topicEnrollments = await this.prisma.topicEnrollment.findMany({
      where: {
        userId
      },
      select: {
        topic: {
          select: {
            title: true,
            type: true,
            color: true,
            id: true,
            icon: true
          }
        },
        currentLesson: { select: {id: true, number: true} },
        level: true,
        completed: true
      }
    })
    
    // calendar
    const streaks = await this.courseService.completedLessonsForMonth(userId, new Date().getMonth())

    return {
      message: 'SUCCESS',
      payload: {
        challenges, points, lessonsC, lessonsN, lessonOrQuiz, streaks, topicEnrollments
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
