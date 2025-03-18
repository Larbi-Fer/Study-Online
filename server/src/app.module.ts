import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { ChallengesModule } from './challenges/challenges.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [PrismaModule, AuthModule, LessonsModule, UserModule, QuizModule, ChallengesModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
