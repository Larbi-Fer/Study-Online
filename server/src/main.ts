import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableCors({origin: process.env.CORS_ORIGIN});
  await app.listen(process.env.PORT ?? 5000);
  console.log(process.env.CORS_ORIGIN);

}
bootstrap();
