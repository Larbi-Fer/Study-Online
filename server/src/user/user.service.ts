import { Injectable } from '@nestjs/common';
import { CODES } from 'src/lib/codes';
import { QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserMainData(id: string) {
    return await this.prisma.user.findUnique({
      where: {id},
      include: {
        lesson: {select: {id: true, number: true, topicId: true}},
        topicEnrollments: {select: {topic: {select: {id: true, title: true, type: true, color: true}}}}
      }
    })
  }

  async nextLesson(id: string) {
    const user = (await this.prisma.user.findUnique({
      where: { id },
      select: {lesson: {select: {number: true, topicId: true, id: true}}}
    }))

    if (!user) return { message: CODES.USER.USER_NOT_FOUND }

    const { lesson: { number, topicId } } = user

    const {lesson: newLesson} = await this.prisma.user.update({
      data: {
        lesson: { connect: {
          topicId_number: {
            number: number + 1,
            topicId
          }
        } },
        completedLessons: {
          create: {
            lesson: { connect: { id: user.lesson.id } },
          }
        }
      },
      where: {id},
      select: { lesson: { select: {id: true, number: true, topicId: true} } }
    })

    return { message: 'SUCCESS', payload: newLesson }
  }

  async setNewAnswers(userId: string, quizId: string, answers: quizStatistics[], percent: number) {
    // First update/create the quiz results
    const res = await this.prisma.quizResults.upsert({
      create: {
        userId, quizId,
        statistics: answers,
        percent: percent
      },
      update: {
        statistics: answers,
        percent: percent
      },
      where: { userId_quizId: {userId, quizId} },
      omit: {userId: true}
    })

    // If score is > 80%, increase user level
    if (percent > QUIZ_PASS_PERCENTAGE) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          level: {
            increment: 1
          }
        }
      })
    }

    return { message: "SUCCESS" }
  }

  async quizResult(userId: string, quizId: string) {
    const res = await this.prisma.quizResults.findUnique({
      where: {userId_quizId: {userId, quizId}},
      select: {statistics: true, percent: true}
    })
    return { message: 'SUCCESS', payload: res }
  }
}