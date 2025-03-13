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
        questions: {
          omit: {quizId: true}
        }
      }
    })
  }
}
