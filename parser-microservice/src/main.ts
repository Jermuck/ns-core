import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { TaskModule } from './task.module';
import { config } from "dotenv";

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TaskModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.TASK_QUEUE,
      queueOptions: {
        durable: false
      },
    }
  })
  await app.listen();
  console.log('Parser-microservice start');
}

bootstrap();
