import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createChallengeDto } from './dto';
import { CHALLENGES_PONTS_REQUIRED, QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ChallengesService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService
  ) {}

  async getChallenges(topicId: string, take?: number, userId?: string) {
    const query: {
      where: Prisma.ProgrammeWhereInput,
      take?: number
    } = {
      where: {
        topicId
      },
    }
    if (userId) query.where.challenge = {
      every: {
        NOT: {
          userId
        }
      }
    }

    if (take) query.take = take

    return await this.prisma.programme.findMany({
      ...query,
      select: {
        title: true, points: true, requiredLvl: true, id: true
      }
    })
  }

  async getUserPoints(userId: string, topicId?: string) {
    const challenges = await this.prisma.challenge.findMany({
      where: { userId, programme: { topicId: topicId || undefined } },
      include: {
        programme: {
          select: {
            points: true,
            topicId: true
          }
        }
      }
    })

    const totalPoints = challenges.reduce((sum, challenge) => {
      return sum + (challenge.programme?.points || 0);
    }, 0);

    return totalPoints
  }

  async getProgramme(id: string) {
    return await this.prisma.programme.findUnique({
      where: {id},
      select: { title: true, description: true, goal: true, code: true }
    })
  }

  async challangeDone(programmeId: string, userId: string) {
    const { programme: {topicId, points, topic: {type: topicType, number}} } = await this.prisma.challenge.upsert({
      where: {
        userId_programmeId: { userId, programmeId }
      },
      update: {},
      create: { userId, programmeId },
      select: {
        programme: {
          select: {
            topicId: true,
            points: true,
            topic: {
              select: {type: true, number: true}
            }
          }
        }
      }
    });

    if (topicType == 'optional') return

    // calculate user points
    const userPoints = await this.getUserPoints(userId, topicId)

    if (userPoints >= CHALLENGES_PONTS_REQUIRED && (userPoints - points) < CHALLENGES_PONTS_REQUIRED) {
      // Check if the user solved last quiz
      const quizResult = await this.prisma.quizResults.findFirst({
        where: {
          userId,
          quiz: {
            topicId,
            type: 'finalQuiz'
          },
          percent: {
            gte: QUIZ_PASS_PERCENTAGE
          }
        },
      });

      console.log(quizResult);
      if (!quizResult) return;
      // enroll user in next topic
      const nextTopicId = await this.utils.enrollNextTopic(userId, topicId, number)
      return nextTopicId
    }
  }

  // Admin
  async createChallenge({data, type, topicId}: createChallengeDto) {
    console.log('open');
    
    return await this.prisma.programme.create({
      data: {
        ...data,
        type,
        topicId
      },
      select: {id: true}
    })
  }
  async updateChallenge(id: string, data: Prisma.ProgrammeUpdateInput) {
    await this.prisma.programme.update({
      where: { id },
      data
    })
  }
  async deleteChallenge(id: string) {
    return await this.prisma.programme.delete({
      where: { id }
    })
  }
}

