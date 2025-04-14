import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengeDoneDto, createChallengeDto, GetChallengesDto, ProgrammeIdDto, UpdateChallengeDto } from './dto';

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

  // Admin
  @Post('/create')
  async createChallenge(@Body() prog: createChallengeDto) {
    const challenges = await this.challengeServise.createChallenge(prog)
    return { message: 'SUCCESS', payload: challenges.id }
  }

  // Admin
  @Delete('/delete')
  async deleteChallenge(@Body() {programmeId}: ProgrammeIdDto) {
    const challenges = await this.challengeServise.deleteChallenge(programmeId)
    return { message: 'SUCCESS', payload: {
      challenges
    } }
  }

  // Admin
  @Put('/update/:id')
  async updateChallenge(@Param('id') programmeId: string, @Body() {data}: UpdateChallengeDto) {
    await this.challengeServise.updateChallenge(programmeId, data)
    return { message: 'SUCCESS' }
  }

  @Get('/:id')
  async getProgramme(@Param('id') programmeId: string) {
    const payload = await this.challengeServise.getProgramme(programmeId)
    return { message: 'SUCCESS', payload }
  }

  @Post('/:id')
  async challengeDone(@Param('id') progId: string, @Query() {userId}: ChallengeDoneDto) {
    const topicId = await this.challengeServise.challangeDone(progId, userId)

    if (topicId) return {message: 'SUCCESS', payload: topicId}
    return {message: 'SUCCESS'}
  }
}
