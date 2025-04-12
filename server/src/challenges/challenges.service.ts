import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createChallengeDto } from './dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

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
    await this.prisma.challenge.upsert({
      where: {
        userId_programmeId: { userId, programmeId }
      },
      update: {},
      create: { userId, programmeId }
    });
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
