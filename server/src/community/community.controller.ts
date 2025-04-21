import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get()
  async getDiscussions(@Query() {take, skip, ...options}: {userId?: string, take?: string, skip?: string, q?: string, tag?: string}) {
    const discussions = await this.communityService.fetchDiscussions({...options, take: parseInt(take), skip: parseInt(skip)})
    return {
      message: 'SUCCESS',
      payload: discussions
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
}