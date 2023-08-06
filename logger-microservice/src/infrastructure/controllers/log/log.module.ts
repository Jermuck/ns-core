import { Module } from "@nestjs/common";
import { LogController } from "./log.controller";
import { AbstractLogRepository } from "src/domain/repositories/log-repository.abstract";
import { LogRepository } from "src/infrastructure/repositories/log-repository/log.repostitory";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";

@Module(
{
    controllers:[LogController],
    providers: [
        {
            provide: AbstractLogRepository,
            useExisting: LogRepository
        }
    ],
    imports: [RepositoryModule]
})
export class LogModule {};

