import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async fetchTopics() {
    return await this.prisma.topic.findMany({
      select: { title: true, id: true, description: true, image: true }
    });
  }
}
