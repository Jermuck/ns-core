import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { ProductRepository } from "src/infrastructure/repositories/product-repository/product.repository";
import { LOGGER_SERVICE, PRODUCT_REPOSITORY } from "./сonstants/index.сonstants";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        RepositoryModule,
        ClientsModule.registerAsync([
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
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useExisting: ProductRepository,
        }
    ],
    controllers: [ProductController]
})
export class ProductModule { };