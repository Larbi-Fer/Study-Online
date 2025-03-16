import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { GetChallengesDto } from './dto';

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
  async getProgramme(@Param('id') id: string) {
    const payload = await this.challengeServise.getProgramme(id)
    return { message: 'SUCCESS', payload }
  }
}
