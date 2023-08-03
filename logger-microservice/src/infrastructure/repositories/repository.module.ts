import { Module } from "@nestjs/common";
import { LogRepository } from "./log-repository/log.repostitory";
import { PrismaService } from "../config/prisma.config";

@Module({
    providers:[
        LogRepository,
        PrismaService
    ],
    exports: [
        LogRepository
    ]
})
export class RepositoryModule {}