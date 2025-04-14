import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getQuizById(id: string) {
    return await this.prisma.quiz.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        questions: {
          omit: {quizId: true}
        },
        lesson: {
          select: {
            number: true
          }
        },
        quizResults: {
          orderBy: { lastAttempt: 'desc' },
          take: 1,
          select: {
            percent: true,
            lastAttempt: true
          }
        },
      }
    })
  }
}
