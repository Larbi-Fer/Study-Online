import { Injectable } from '@nestjs/common';
import { CODES } from 'src/lib/codes';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async nextLesson(id: string) {
    console.log('open');
    
    const user = (await this.prisma.user.findUnique({
      where: { id },
      select: {lesson: {select: {number: true, topicId: true}}}
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
        } }
      },
      where: {id},
      select: { lesson: { select: {id: true, number: true, topicId: true} } }
    })

    return { message: 'SUCCESS', payload: newLesson }
  }
}