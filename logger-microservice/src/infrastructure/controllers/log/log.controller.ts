import { Controller, Logger, OnModuleInit } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LogEntity } from "@prisma/client";
import { AbstractLogRepository } from "src/domain/repositories/log-repository.abstract";
import { GatewayPaths } from "src/infrastructure/gateway-paths/gateway.paths";

@Controller()
export class LogController {
    private readonly logger = new Logger();
    constructor(
        private readonly logRepository: AbstractLogRepository,
    ) { };

    @MessagePattern(GatewayPaths.LOG_CREATE)
    public async create(@Payload() message: string) {
        try {
            await this.logRepository.create(message);
            this.logger.log(message);
        } catch (err) {
            this.logger.error('Unvalid body error');
        }
    }

    @MessagePattern(GatewayPaths.LOG_DELETE)
    public async delete(@Payload() id: string) {
        try {
            const deleteLog = await this.logRepository.delete(id);
            this.logger.log(`Log with id: ${deleteLog.id} was delete`);
        } catch (err) {
            this.logger.error('Not found log');
        }
    };

    @MessagePattern(GatewayPaths.LOG_FINDMANY)
    public async findMany(): Promise<LogEntity[]> {
        try{
            const logs = await this.logRepository.findMany();
            return logs;
        }catch(err){
            this.logger.log(err);
        }
    };
}

