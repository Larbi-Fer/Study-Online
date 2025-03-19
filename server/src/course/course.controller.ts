import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/challenges.service';
import { LessonsService } from 'src/lessons/lessons.service';

@Controller('course')
export class CourseController {
  constructor(
    private challengesService: ChallengesService,
    private lessonsService: LessonsService
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
        if (lastLesson.lesson.quiz.quizResults.length == 0) {
          lessonOrQuiz.quiz = lastLesson.lesson.quiz
          lessonOrQuiz.quiz.number = Math.floor(lastLesson.lesson.number / 3)
        }
        else lessonOrQuiz.lesson = currentLesson.lesson
      } else lessonOrQuiz.lesson = currentLesson.lesson

    // console.log(lessonOrQuiz);
    

    const lessonsC = await this.lessonsService.getCompletedLessons(topicId, userId)
    const lessonsN = (await this.lessonsService.getLessons(topicId, userId)).payload.length

    return {
      message: 'SUCCESS',
      payload: {
        challenges, points, lessonsC, lessonsN, lessonOrQuiz
      }
    }
  }
}
