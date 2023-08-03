import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DATABASE_SERVICE } from './сonstants/index.сonstants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        imports: [ConfigModule.forRoot()],
        name: DATABASE_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')],
            queue: config.get<string>('QUEUE'),
            queueOptions: {
              durable: false
            },
          }
        })
      },
    ])
  ],
  controllers: [ProductController],
})
export class ProductModule {};
