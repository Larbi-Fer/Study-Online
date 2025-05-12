import { Injectable } from '@nestjs/common';
import { ChallengesService } from 'src/challenges/challenges.service';
import { CODES } from 'src/lib/codes';
import { CHALLENGES_PONTS_REQUIRED, QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
    private challengesService: ChallengesService
  ) {}

  async getUserMainData(id: string) {
    return await this.prisma.user.findUnique({
      where: {id},
      include: {
        lesson: {select: {id: true, number: true, topicId: true}},
        topicEnrollments: {select: {
          currentLesson: {select: { id: true, number: true }},
          level: true,
          completed: true,
          topic: {select: {id: true, title: true, type: true, color: true}}
        }}
      }
    })
  }

  async nextLesson(id: string, topicId: string) {
    const enrollment = (await this.prisma.topicEnrollment.findUnique({
      where: { userId_topicId: {userId: id, topicId} },
      select: {currentLesson: {select: {number: true, topicId: true, id: true}}}
    }))

    if (!enrollment) return { message: CODES.USER.NO_ENROLLMENT }

    const { currentLesson: { number } } = enrollment
    
    // create completed lesson
    await this.prisma.completedLessons.upsert({
      create: {
        lessonId: enrollment.currentLesson.id,
        userId: id
      },
      update: {},
      where: {userId_lessonId: {lessonId: enrollment.currentLesson.id, userId: id}}
    })

    // check if it is the last lesson
    const nextLesson = await this.prisma.lesson.findUnique({
      where: {topicId_number: {number: number + 1, topicId}},
      select: {id: true}
    })

    console.log(nextLesson);
    if (!nextLesson) return { message: 'SUCCESS', payload: null }

    // update current lesson on topicEnrollment to next lesson
    const {currentLesson: newLesson} = await this.prisma.topicEnrollment.update({
      where: { userId_topicId: {userId: id, topicId} },
      data: {currentLessonId: nextLesson.id},
      select: {currentLesson: {select: {id: true, number: true}}}
    })

    return { message: 'SUCCESS', payload: newLesson }
  }

  async setNewAnswers(userId: string, quizId: string, answers: quizStatistics[], percent: number, topicId: string) {
    // First update/create the quiz results
    const {quiz} = await this.prisma.quizResults.upsert({
      create: {
        userId, quizId,
        statistics: answers,
        percent: percent
      },
      update: {
        statistics: answers,
        percent: percent
      },
      where: { userId_quizId: {userId, quizId} },
      select: {
        quiz: {select: {type: true}}
      },
    })

    // If score is > 80%, increase user level
    if (percent > QUIZ_PASS_PERCENTAGE) {
      // update user level on topicEnrollment and user
      await this.prisma.user.update({
        where: {id: userId},
        data: {
          level: {increment: 1},
          topicEnrollments: {
            update: {
              where: { userId_topicId: {userId, topicId} },
              data: {
                level: {increment: 1},
              }
            },
          }
        }
      })

      if (quiz.type !== 'finalQuiz') return

      const {type: topicType, number: topicNumber} = await this.prisma.topic.findUnique({
        where: {id: topicId},
        select: {type: true, number: true}
      })

      if (topicType == 'required') return

      const userPoints = await this.challengesService.getUserPoints(userId, topicId)

      if (userPoints >= CHALLENGES_PONTS_REQUIRED) {
        // enroll user in next topic
        const nextTopicId = await this.utils.enrollNextTopic(userId, topicId, topicNumber)

        return nextTopicId
      }
    }

    return
  }

  async quizResult(userId: string, quizId: string) {
    const res = await this.prisma.quizResults.findUnique({
      where: {userId_quizId: {userId, quizId}},
      select: {statistics: true, percent: true}
    })
    return { message: 'SUCCESS', payload: res }
  }

  async getProfile(profileId: string, userId?: string) {
    return await this.prisma.user.findUnique({
      where: {id: profileId},
      select: {
        fullname: true,
        email: true,
        icon: true,
        level: true,
        role: true,
        topicEnrollments: {
          where: {completed: true},
          select: {
            topic: {
              select: {title: true, icon: true}
            }
          }
        },
        discussions: {
          take: 4,
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                email: true
              }
            },
            _count: {
              select: {
                comments: true,
                votes: true
              }
            },
            votes: userId ? {
              where: {
                userId
              }
            } : {}
          }
        },
      }
    })
  }
}