import { Injectable } from "@nestjs/common";
import { LogEntity } from "@prisma/client";
import { AbstractLogRepository } from "src/domain/repositories/log-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";

@Injectable()
export class LogRepository implements AbstractLogRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { };

    public async create(log: string): Promise<LogEntity> {
        return await this.prisma.logEntity.create({ data: { message: log } });
    }

    public async delete(id: string): Promise<LogEntity> {
        return await this.prisma.logEntity.delete({ where: { id } });
    }

    public async findMany(): Promise<LogEntity[]> {
        return await this.prisma.logEntity.findMany();
    }
}