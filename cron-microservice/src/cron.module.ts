import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LOGGER_SERVICE, PARSER_SERVICE } from './constants/index.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: PARSER_SERVICE,
        inject: [ConfigService],
        imports: [ConfigModule.forRoot()],
        useFactory: async (cfg: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [cfg.get<string>('RABBITMQ_URL')],
            queue: cfg.get<string>('TASK_QUEUE'),
            queueOptions: {
              durable: false
            }
          }
        }),
      },
      {
        name: LOGGER_SERVICE,
        inject: [ConfigService],
        imports: [ConfigModule.forRoot()],
        useFactory: async (cfg: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [cfg.get<string>('RABBITMQ_URL')],
            queue: cfg.get<string>('LOGGER_QUEUE'),
            queueOptions: {
              durable: false
            }
          }
        }),
      }
    ])
  ],
  providers: [CronService],
})
export class CronModule {};
