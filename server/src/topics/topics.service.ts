import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopicDto, Topic, UpdateTopicDto } from './dto/topics.dto';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async fetchTopics() {
    return await this.prisma.topic.findMany({
      include: {
        dependencies: {
          select: {title: true, id: true}
        }
      }
    });
  }

  async fetchTopic(id: string) {
    return await this.prisma.topic.findUnique({
      where: { id },
      include: {
        dependencies: true
      }
    });
  }

  // Admin
  async createTopic({dependencies, ...topic}: CreateTopicDto) {
    const number = await this.prisma.topic.count()+1
    return await this.prisma.topic.create({
      data: {
        number,
        dependencies: dependencies ? {
          connect: dependencies
        } : null,
        ...topic
      },
      select: { id: true }
    });
  }

  async updateTopic(id: string, {dependencies, ...topic}: UpdateTopicDto) {
    return await this.prisma.topic.update({
      where: { id },
      data: {
        dependencies,
        ...topic
      },
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
