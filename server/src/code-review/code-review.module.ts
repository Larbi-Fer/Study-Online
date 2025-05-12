import { Module } from '@nestjs/common';
import { CodeReviewController } from './code-review.controller';
import { CodeReviewService } from './code-review.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  controllers: [CodeReviewController],
  providers: [CodeReviewService, SocketGateway]
})
export class CodeReviewModule {}
