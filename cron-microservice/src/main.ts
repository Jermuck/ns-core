import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { CronModule } from './cron.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CronModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
    }
  });
  await app.listen();
  console.log('Cron-microservice was start');
}
bootstrap();
