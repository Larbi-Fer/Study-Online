import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  completedLessonsForMonth = async (userId: string, month: number) => {
    const date = new Date()

    const streaks = await this.prisma.completedLessons.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(date.getFullYear(), month, 1),
          lt: new Date(date.getFullYear(), month + 1, 1)
        }
      },
      select: {createdAt: true}
    });

    return streaks
  }
}
