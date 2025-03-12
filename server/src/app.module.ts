import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, LessonsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
