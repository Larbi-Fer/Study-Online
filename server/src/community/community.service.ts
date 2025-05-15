import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService, private utils: UtilsService) {}
  
  async fetchDiscussions({
    userId,
    take = 10,
    skip = 0,
    q,
    tag,
    orderBy = 'newer'
  }: {
    userId?: string,
    take?: number,
    skip?: number,
    q?: string,
    tag?: string,
    orderBy?: 'vote' | 'newer'
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
        orderBy: orderBy === 'vote' ? {
          votes: {
            _count: 'desc'
          }
        } : {
          createdAt: 'desc'
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

  async fetchDiscussionDetails(id: string, userId?: string) {
    return this.prisma.discussion.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            icon: true
          }
        },
        comments: {
          orderBy: {
            createdAt: 'asc'
          },
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                icon: true
              }
            }
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
    });
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

  async addComment(discussionId: string, content: string, userId: string) {
    const comment = await this.prisma.comment.create({
      data: {
        content,
        userId,
        discussionId
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true
          }
        },
        discussion: {
          select: {
            title: true,
            userId: true,
          }
        }
      }
    });

    const discussion = comment.discussion

    if (userId != discussion.userId) {
      console.log('test');
      
      this.utils.createNotification({
        content: 'You have new comments on your discussion: ' + discussion.title,
        id: comment.discussionId,
        link: '/community/discussion/' + comment.discussionId,
        type: 'discussion',
        userId: discussion.userId
      })
    }

    delete comment.discussion

    return comment;
  }

  async createDiscussion(data: {
    title: string,
    content: string,
    userId: string,
    tags: string[]
  }) {
    return this.prisma.discussion.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
        tags: data.tags
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true
          }
        }
      }
    });
  }

  async updateDiscussion(id: string, data: {
    title: string,
    content: string,
    tags: string[]
  }) {
    return this.prisma.discussion.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        tags: data.tags,
        isUpdated: true
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            email: true
          }
        }
      }
    });
  }
}
