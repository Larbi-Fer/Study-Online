import { Body, Controller, Get, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from './dto/topics.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getTopics() {
    return this.topicsService.fetchTopics();
  }

  @Post()
  async createTopics(@Body() topic: Topic) {
    return this.topicsService.createTopic(topic);
  }
}
