import { ParsersModule } from "../services/parsers/parsers.module";
import { Module } from "@nestjs/common";
import { ParserController } from "./parser.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DATABASE_SERVICE, LOGGER_SERVICE } from "./constants/index.constants";

@Module({
    imports: [
        ParsersModule,
        ClientsModule.registerAsync([
            {
                inject: [ConfigService],
                imports: [ConfigModule.forRoot()],
                name: DATABASE_SERVICE,
                useFactory: (config: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [config.get<string>('RABBITMQ_URL')],
                        queue: config.get<string>('DATABASE_QUEUE'),
                        queueOptions: {
                            durable: false,
                        },
                    }
                })
            },
            {
                inject: [ConfigService],
                imports: [ConfigModule.forRoot()],
                name: LOGGER_SERVICE,
                useFactory: (config: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [config.get<string>('RABBITMQ_URL')],
                        queue: config.get<string>('LOGGER_QUEUE'),
                        queueOptions: {
                            durable: false,
                        },
                    }
                })
            }
        ])
    ],
    controllers: [ParserController],
})
export class ParserEndPointModule { };