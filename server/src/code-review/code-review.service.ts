import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCodeReviewDto } from './dto/create-code-review.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { Role } from '@prisma/client';

@Injectable()
export class CodeReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createCodeReviewDto: CreateCodeReviewDto) {
    const codeReview = await this.prisma.codeReview.create({
      data: {
        userId: createCodeReviewDto.userId,
        subject: createCodeReviewDto.subject,
        explication: createCodeReviewDto.explication,
        code: createCodeReviewDto.code,
        programmeId: createCodeReviewDto.programmeId,
        comments: [],
      },
    });

    return codeReview;
  }

  async findAll(userId: string, role: string) {
    // If user is a student, return only their reviews
    if (role === Role.student) {
      return this.prisma.codeReview.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    
    // If user is a code reviewer, return all reviews
    if (role === Role.code_reviewer) {
      return this.prisma.codeReview.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    // Otherwise, return their assigned reviews if they're a reviewer
    return this.prisma.codeReview.findMany({
      where: {
        reviewerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const codeReview = await this.prisma.codeReview.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullname: true,
            topicEnrollments: {
              include: {
                topic: {
                  select: {
                    title: true,
                  },
                },
              },
              orderBy: {
                level: 'asc',
              },
              take: 1,
            },
          },
        },
        challenge: {
          select: {
            id: true,
            title: true,
            topic: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

    if (!codeReview) {
      throw new NotFoundException('Code review not found');
    }

    // Check if user has access to this review
    const canAccess =
      role === Role.code_reviewer ||
      codeReview.userId === userId ||
      codeReview.reviewerId === userId;

    if (!canAccess) {
      throw new ForbiddenException('You do not have access to this review');
    }

    return codeReview;
  }

  async assignReviewer(id: string, reviewerId: string) {
    const codeReview = await this.prisma.codeReview.findUnique({
      where: { id },
    });

    if (!codeReview) {
      throw new NotFoundException('Code review not found');
    }

    // Check if already assigned
    if (codeReview.reviewerId) {
      throw new ForbiddenException('This review is already assigned to a reviewer');
    }

    return this.prisma.codeReview.update({
      where: { id },
      data: {
        reviewerId,
      },
    });
  }

  async addComment(id: string, dto: AddCommentDto) {
    const {userId, role} = dto
    const codeReview = await this.prisma.codeReview.findUnique({
      where: { id },
    });

    if (!codeReview) {
      throw new NotFoundException('Code review not found');
    }

    // Verify permissions to add comments
    if (
      (dto.sender === 'student' && codeReview.userId !== userId) ||
      (dto.sender === 'reviewer' && 
        (role !== Role.code_reviewer || codeReview.reviewerId !== userId))
    ) {
      throw new ForbiddenException('Unauthorized to add this comment');
    }

    // Parse existing comments
    const existingComments = JSON.parse(JSON.stringify(codeReview.comments)) || [];
    
    // Add new comment with timestamp
    const newComment = {
      ...dto,
      timestamp: new Date().toISOString(),
    };
    
    const updatedComments = [...existingComments, newComment];

    // Update the code review with the new comment
    return this.prisma.codeReview.update({
      where: { id },
      data: {
        comments: updatedComments,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullname: true,
            topicEnrollments: {
              include: {
                topic: {
                  select: {
                    title: true,
                  },
                },
              },
              orderBy: {
                level: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });
  }
}
