import { Module } from '@nestjs/common';
import {ParsersModule} from "./infrastructure/services/parsers/parsers.module";
import {ParserEndPointModule} from "./infrastructure/controllers/parser.module";

@Module({
  imports: [ParserEndPointModule],
})

export class TaskModule {}
