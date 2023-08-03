import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {config} from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.DATABASE_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen();
  console.log('Database-microservice was start');
}
bootstrap();
