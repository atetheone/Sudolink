import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(//.createMicroservice<MicroserviceOptions>(
    AppModule
    // {
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       brokers: ['localhost:9092'],
    //     }
    //   }
    // }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
