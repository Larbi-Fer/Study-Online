import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/challenges.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(
    private challengesService: ChallengesService,
    private lessonsService: LessonsService,
    private courseService: CourseService
  ) {}

  @Get(':userId')
  async dashboardData(@Param('userId') userId: string, @Query('topicId') topicId: string) {
    const challenges = await this.challengesService.getChallenges(topicId, 4, userId)
    const points = await this.challengesService.getUserPoints(userId)

    const lastLesson = await this.lessonsService.getLastLesson(userId)
    const currentLesson = await this.lessonsService.getCurrentLesson(userId)

    const lessonOrQuiz: any = {}

    if (!lastLesson) lessonOrQuiz.lesson = currentLesson.lesson
    else
      if (lastLesson.lesson.quiz) {
        if (lastLesson.lesson.quiz.quizResults.length == 0 || lastLesson.lesson.quiz.quizResults[0].percent < QUIZ_PASS_PERCENTAGE) {
          lessonOrQuiz.quiz = lastLesson.lesson.quiz
          lessonOrQuiz.quiz.number = Math.floor(lastLesson.lesson.number / 3)
        }
        else lessonOrQuiz.lesson = currentLesson.lesson
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
}
