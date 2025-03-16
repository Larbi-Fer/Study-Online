import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengeDoneDto, GetChallengesDto } from './dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private challengeServise: ChallengesService) {}

  @Get()
  async getChallengeData(@Query() {topicId, userId}: GetChallengesDto) {
    const challenges = await this.challengeServise.getChallenges(topicId)
    const p = await this.challengeServise.getUserPoints(userId)

    return { message: 'SUCCESS', payload: {
      points: p,
      challenges
    } }
  }

  @Get('/:id')
  async getProgramme(@Param('id') programmeId: string) {
    const payload = await this.challengeServise.getProgramme(programmeId)
    return { message: 'SUCCESS', payload }
  }

  @Post('/:id')
  async challengeDone(@Param('id') progId: string, @Query() {userId}: ChallengeDoneDto) {
    await this.challengeServise.challangeDone(progId, userId)

    return {message: 'SUCCESS'}
  }
}
