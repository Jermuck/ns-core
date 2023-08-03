import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientProxy, MessagePattern } from "@nestjs/microservices";
import { DATABASE_SERVICE, LOGGER_SERVICE } from "./constants/index.constants";
import { EWEParserService } from "../services/parsers/ewe/ewe.parser";
import { GatewayPaths } from "../gateway-paths/gateway.paths";
import { IProductModel } from "src/domain/models/product.model";

@Controller()
export class ParserController implements OnModuleInit {
    constructor(
        @Inject(DATABASE_SERVICE)
        private readonly databaseService: ClientProxy,

        @Inject(LOGGER_SERVICE)
        private readonly loggerService: ClientProxy,

        private readonly EWEParserService: EWEParserService
    ) { };

    public async onModuleInit(): Promise<void> {
        await this.loggerService.connect();
        await this.databaseService.close();
    }

    @MessagePattern(GatewayPaths.TASK_CREATE)
    public async parse() {
        const payload = await this.EWEParserService.Main();
        this.loggerService.emit<string, string>(GatewayPaths.LOGGER_TASK_CREATE, 'Files was parse');
        this.databaseService.emit<string, IProductModel[]>(GatewayPaths.DATABASE_SAVE, payload);
    }
}