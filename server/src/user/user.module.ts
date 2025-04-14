import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ChallengesModule } from 'src/challenges/challenges.module';

@Module({
  controllers: [UserController],
  imports: [ChallengesModule],
  providers: [UserService],
})
export class UserModule {}
