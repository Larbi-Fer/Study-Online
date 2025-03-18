import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async getLessons(topicId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {topicId},
      omit: {data: true, topicId: true},
      include: {
        _count: {select: {programmes: true}},
        quiz: {
          select: {id: true }
        }
      }
    })

    return {message: 'SUCCESS', payload: lessons}
  }

  async getLessonById(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {id: lessonId},
      omit: {topicId: true},
      include: {
        programmes: {
          select: { title: true, description: true, code: true, goal: true }
        }
      }
    })

    return {message: 'SUCCESS', payload: lesson}
  }

  async getCompletedLessons(topicId: string, userId: string) {
    return await this.prisma.completedLessons.count({
      where: {userId, lesson: {topicId}}
    })
  }
}
