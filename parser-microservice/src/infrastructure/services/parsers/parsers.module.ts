import {Module} from "@nestjs/common";
import {EWEParserService} from "./ewe/ewe.parser";

@Module({
    providers: [EWEParserService],
    exports: [EWEParserService]
})

export class ParsersModule {}