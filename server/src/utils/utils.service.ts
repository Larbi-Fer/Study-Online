import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketGateway } from 'src/socket/socket.gateway';

type NotificationProps = {
  id: string
  userId: string
  content: string
  link: string
  type: string
}


@Injectable()
export class UtilsService {
  constructor(private prisma: PrismaService, private socket: SocketGateway) {}
  
  async enrollNextTopic(userId: string, topicId: string, topicNumber: number) {
    const nextTopic = await this.prisma.topic.findFirst({
      where: {number: topicNumber+1},
      select: {id: true}
    })

    if (!nextTopic) return null;
    const {id: nextTopicId} = nextTopic;

    await this.prisma.topicEnrollment.update({
      where: {userId_topicId: {userId, topicId}},
      data: {completed: true}
    })

    await this.prisma.topicEnrollment.create({
      data: {
        user: { connect: { id: userId } },
        topic: { connect: { id: nextTopicId } },
        currentLesson: {
          connect: {
            topicId_number: {topicId: nextTopicId, number: 1}
          }
        }
      },
    })

    return nextTopicId
  }

  async createNotification(data: NotificationProps) {
    await this.prisma.notification.upsert({
      create: { ...data, isSeen: false },
      update: { ...data, isSeen: false },
      where: {id_userId: {
        id: data.id,
        userId: data.userId
      }}
    })

    this.socket.notifyUser(data.userId, {
      ...data,
      isSeen: false,
      time: new Date()
    })
  }

}