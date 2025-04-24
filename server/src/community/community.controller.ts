import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get()
  async getDiscussions(@Query() {take, skip, ...options}: {userId?: string, take?: string, skip?: string, q?: string, tag?: string, orderBy?: 'vote' | 'newer'}) {
    const discussions = await this.communityService.fetchDiscussions({...options, take: parseInt(take), skip: parseInt(skip)})
    return {
      message: 'SUCCESS',
      payload: discussions
    }
  }

  @Get(':id')
  async getDiscussion(
    @Param('id') id: string,
    @Query('userId') userId?: string
  ) {
    const discussion = await this.communityService.fetchDiscussionDetails(id, userId)
    return {
      message: 'SUCCESS',
      payload: discussion
    }
  }

  @Post('vote/:id')
  async voteDiscussion(
    @Param('id') id: string,
    @Body('userId') userId: string
  ) {
    const discussion = await this.communityService.voteDiscussion(id, userId)
    return {
      message: 'SUCCESS',
      payload: discussion
    }
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body('content') content: string,
    @Body('userId') userId: string
  ) {
    const comment = await this.communityService.addComment(id, content, userId)
    return {
      message: 'SUCCESS',
      payload: comment
    }
  }

  @Post()
  async createDiscussion(
    @Body() data: {
      title: string,
      content: string,
      userId: string,
      tags: string[]
    }
  ) {
    const discussion = await this.communityService.createDiscussion(data)
    return {
      message: 'SUCCESS',
      payload: discussion
    }
  }

  @Post(':id')
  async updateDiscussion(
    @Param('id') id: string,
    @Body() data: {
      title: string,
      content: string,
      tags: string[]
    }
  ) {
    const discussion = await this.communityService.updateDiscussion(id, data)
    return {
      message: 'SUCCESS',
      payload: discussion
    }
  }
}