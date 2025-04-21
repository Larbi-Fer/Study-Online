import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}
  
  async fetchDiscussions({
    userId,
    take = 10,
    skip = 0,
    q,
    tag
  }: {
    userId?: string,
    take?: number,
    skip?: number,
    q?: string,
    tag?: string
  }) {
    const where = {
      AND: [
        q ? {
          OR: [
            { title: { contains: q } },
            { content: { contains: q } }
          ]
        } : {},
        tag ? {
          tags: {
            array_contains: tag
          }
        } : {}
      ]
    };

    const [discussions, total] = await Promise.all([
      this.prisma.discussion.findMany({
        where,
        take,
        skip,
        orderBy: {
          votes: {
            _count: 'desc'
          }
        },
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
          votes: {
            where: {
              userId
            }
          }
        }
      }),
      this.prisma.discussion.count({ where })
    ]);

    return {
      discussions,
      total,
      hasMore: skip + take < total
    };
  }

  async voteDiscussion(id: string, userId: string) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_discussionId: {
          userId,
          discussionId: id
        }
      }
    });

    if (existingVote) {
      // Remove vote if already voted
      await this.prisma.vote.delete({
        where: {
          userId_discussionId: {
            userId,
            discussionId: id
          }
        }
      });
    } else {
      // Add vote if not voted
      await this.prisma.vote.create({
        data: {
          userId,
          discussionId: id
        }
      });
    }

    return this.prisma.discussion.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            votes: true
          }
        }
      }
    });
  }
}
