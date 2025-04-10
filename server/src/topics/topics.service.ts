import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Topic } from './dto/topics.dto';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async fetchTopics() {
    return await this.prisma.topic.findMany({
      select: { title: true, id: true, description: true, image: true }
    });
  }

  async fetchTopic(id: string) {
    return await this.prisma.topic.findUnique({
      where: { id },
      select: { title: true, id: true, description: true, image: true }
    });
  }

  // Admin
  async createTopic(topic: Topic) {
    const number = await this.prisma.topic.count()+1
    return await this.prisma.topic.create({
      data: {
        number,
        ...topic
      },
      select: { id: true }
    });
  }

  async updateTopic(id: string, topic: Topic) {
    return await this.prisma.topic.update({
      where: { id },
      data: topic,
      select: { id: true }
    });
  }

  async deleteTopic(id: string) {
    return await this.prisma.topic.delete({
      where: { id },
      select: { id: true }
    });
  }
}
