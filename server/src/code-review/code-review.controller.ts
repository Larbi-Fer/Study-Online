import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CodeReviewService } from './code-review.service';
import { CreateCodeReviewDto } from './dto/create-code-review.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('code-review')
export class CodeReviewController {
  constructor(private readonly codeReviewService: CodeReviewService) {}

  @Post()
  async create(@Body() createCodeReviewDto: CreateCodeReviewDto) {
    return {
      message: 'SUCCESS',
      payload: await this.codeReviewService.create(createCodeReviewDto)
    };
  }

  @Get()
  async findAll(@Query() { userId, role }: { userId: string, role: string }) {
    return {
      message: 'SUCCESS',
      payload: await this.codeReviewService.findAll(userId, role)
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() { userId, role }: { userId: string, role: string }
  ) {
    return {
      message: 'SUCCESS',
      payload: await this.codeReviewService.findOne(id, userId, role)
    };
  }

  @Post(':id/assign')
  async assignReviewer(
    @Param('id') id: string,
    @Body() { reviewerId }: { reviewerId: string }
  ) {
    return {
      message: 'SUCCESS',
      payload: await this.codeReviewService.assignReviewer(id, reviewerId)
    };
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto
  ) {
    return {
      message: 'SUCCESS',
      payload: await this.codeReviewService.addComment(id, addCommentDto)
    };
  }
}
