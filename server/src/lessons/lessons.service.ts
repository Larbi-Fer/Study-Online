import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QUIZ_PASS_PERCENTAGE } from 'src/lib/constant';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async getLessons(topicId: string, userId: string) {
    // First get the user's current level
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { topicEnrollments: {where: {userId, topicId}, select: {level: true}} }
    });

    const lessons = await this.prisma.lesson.findMany({
      where: {topicId},
      omit: {topicId: true},
      include: {
        completed: {where: {userId}, select: {createdAt: true}},
        topic: {select: {title: true}},
        quiz: {
          select: {
            id: true,
            type: true,
            quizResults: {
              where: {userId},
              orderBy: { lastAttempt: 'desc' },
              take: 1,
              select: {
                percent: true,
                lastAttempt: true
              }
            }
          },
        }
      }
    })

    // Process each lesson to add quiz locking information
    const processedLessons = lessons.map(lesson => {
      if (!lesson.quiz) return lesson;
    
      const quizWithLock = lesson.quiz as unknown as { 
        id: string; 
        quizResults: { lastAttempt: Date; percent: number; }[];
        locked?: boolean; 
        unlockTime?: Date;
      };

      const lessonLevel = Math.ceil(lesson.number / 3);
    
      // Lock quiz if it's not the user's current level
      if (lessonLevel !== user.topicEnrollments[0].level) {
        return {
          ...lesson,
          quiz: { ...quizWithLock, locked: true }
        };
      }
    
      // Check quiz result if it's the current level
      if (quizWithLock.quizResults.length > 0) {
        const lastResult = quizWithLock.quizResults[0];
        if (lastResult.percent < QUIZ_PASS_PERCENTAGE) {
          const hoursSinceLastAttempt = Math.floor(
            (Date.now() - new Date(lastResult.lastAttempt).getTime()) / (1000 * 60 * 60)
          );
          if (hoursSinceLastAttempt < 24) {
            return {
              ...lesson,
              quiz: {
                ...quizWithLock,
                locked: true,
                unlockTime: new Date(new Date(lastResult.lastAttempt).getTime() + 24 * 60 * 60 * 1000)
              }
            };
          }
        }
      }
    
      return lesson;
    });    

    return {message: 'SUCCESS', payload: processedLessons}
  }

  async getLessonById(lessonId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {id: lessonId},
      omit: {topicId: true},
      include: {
        programmes: {
          select: { title: true, description: true, code: true, goal: true }
        }
      }
    })

    return {message: 'SUCCESS', payload: lesson}
  }

  async getCompletedLessons(topicId: string, userId: string) {
    return await this.prisma.completedLessons.count({
      where: {userId, lesson: {topicId}}
    })
  }

  async getLastLesson(userId: string, topicId: string) {
    return await this.prisma.completedLessons.findFirst({
      where: {userId, lesson: {topicId}},
      orderBy: {createdAt: 'desc'},
      select: {
        lesson: {
          select: {
            number: true,
            quiz: {
              select: {
                id: true,
                quizResults: {
                  where: {userId},
                  orderBy: { lastAttempt: 'desc' },
                  take: 1,
                  select: {
                    percent: true,
                    lastAttempt: true
                  }
                }
              }
            },
          }
        }
      }
    })
  }

  async getCurrentLesson(userId: string, topicId: string) {
    const {currentLesson} = await this.prisma.topicEnrollment.findUnique({
      where: {userId_topicId: {userId, topicId}},
      select: {
        currentLesson: {
          include: {
            _count: {select: {programmes: true}},
            completed: {where: {userId}, select: {createdAt: true}},
            topic: {select: {title: true}},
            quiz: {
              select: {
                id: true,
                quizResults: {
                  where: {userId},
                  select: {percent: true}
                }
              }
            }
          }
        }
      }
    })
    return currentLesson
    return this.prisma.user.findUnique({
      where: {id: userId},
      select: {
        lesson: {
          include: {
            _count: {select: {programmes: true}},
            completed: {where: {userId}, select: {createdAt: true}},
            topic: {select: {title: true}},
            quiz: {
              select: {
                id: true,
                quizResults: {
                  where: {userId},
                  select: {percent: true}
                }
              },
            }
          }
        }
      }
    })
  }
}
