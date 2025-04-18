import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto, Topic, UpdateTopicDto } from './dto/topics.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getTopics() {
    return this.topicsService.fetchTopics();
  }

  @Post()
  async createTopics(@Body() topic: CreateTopicDto) {
    return this.topicsService.createTopic(topic);
  }

  @Get(':id')
  async getTopic(@Param('id') id: string) {
    return this.topicsService.fetchTopic(id);
  }

  @Put(':id')
  async updateTopic(@Param('id') id: string, @Body() topic: UpdateTopicDto) {
    return this.topicsService.updateTopic(id, topic);
  }

  @Delete(':id')
  async deleteTopic(@Param('id') id: string) {
    return this.topicsService.deleteTopic(id);
  }
}
