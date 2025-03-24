import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  completedLessonsForMonth = async (userId: string, month: number) => {
    return await this.prisma.completedLessons.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), month, 1),
          lt: new Date(new Date().getFullYear(), month + 1, 1)
        }
      },
      select: {createdAt: true}
    });
  }
}
