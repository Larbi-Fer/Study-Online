import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async getChallenges(topicId: string, take?: number, userId?: string) {
    const query: {
      where: Prisma.ProgrammeWhereInput,
      take?: number
    } = {
      where: {
        lesson: {topicId},
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

  async getUserPoints(userId: string) {
    const challenges = await this.prisma.challenge.findMany({
      where: { userId },
      include: {
        programme: {
          select: {
            points: true
          }
        }
      }
    })

    const totalPoints = challenges.reduce((sum, challenge) => {
      return sum + (challenge.programme?.points || 0); // Add the points of each related Programme
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
    await this.prisma.challenge.upsert({
      where: {
        userId_programmeId: { userId, programmeId }
      },
      update: {},
      create: { userId, programmeId }
    });
  }
}
