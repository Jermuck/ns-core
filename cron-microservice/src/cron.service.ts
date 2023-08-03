import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CronJob } from "cron";
import { LOGGER_SERVICE, PARSER_SERVICE } from "./constants/index.constants";
import { ConfigService } from "@nestjs/config";
import { GatewayPaths } from "./gateway-paths/gateway.paths";

@Injectable()
export class CronService implements OnModuleInit {

  constructor(
    @Inject(PARSER_SERVICE)
    private readonly parserService: ClientProxy,

    @Inject(LOGGER_SERVICE)
    private readonly loggerService: ClientProxy,

    private readonly configService: ConfigService,

  ) { };

  private convertTimeToCronSchedule(): string {
    const time = this.configService.get<string>('TIME');
    if(!time) throw new Error('Not found time for create tasks')
    //
    return '* * * * *';
  }

  public async onModuleInit(): Promise<void> {
    await this.parserService.connect();
    await this.loggerService.connect();
    const cronTime = this.convertTimeToCronSchedule();
    const cron = new CronJob(cronTime, () => {
      this.parserService.emit<string, any>(GatewayPaths.TASK_CREATE, {});
      this.loggerService.emit<string, string>(GatewayPaths.LOGGER_TASK_CREATE, 'Task was generate and save');
    });
    cron.start();
  }
  
}
