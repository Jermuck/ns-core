import { Module } from '@nestjs/common';
import { LogModule } from './infrastructure/controllers/log/log.module';

@Module({
  imports: [LogModule],
})
export class AppModule {}
