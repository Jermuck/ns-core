import {BadRequestException, Controller, Get, Inject, OnModuleInit, Param, Query} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { DATABASE_SERVICE } from "./сonstants/index.сonstants";
import { map } from "rxjs";

@Controller('/product')
export class ProductController implements OnModuleInit {
    constructor(
        @Inject(DATABASE_SERVICE)
        private readonly databaseService: ClientProxy
    ) { };

    public async onModuleInit() {
        await this.databaseService.connect();
    }

    @Get('/')
    public getProduct() {
        return this.databaseService.send({cmd: 'product.findMany'}, {});
    }

    @Get('/find?')
    public getProductById(@Query('id') id: string){
        if(!id) throw new BadRequestException('Not found param');
        return this.databaseService.send({cmd: 'product.getById'}, id);
    } 
    
    @Get('/find?')
    public getProductByName(@Query('name') name: string){
        if(!name) throw new BadRequestException('Not found param');
        return this.databaseService.send({cmd: 'product.getByName'}, name);
    }
    
    @Get('/find?')
    public getBySupplier(@Query('supplier') supplier: string){
        if(!supplier) throw new BadRequestException('Not found param');
        return this.databaseService.send({cmd: 'product.getBySupplier'}, supplier);
    }
}
