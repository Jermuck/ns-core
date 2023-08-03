import { Module } from "@nestjs/common";
import { ProductRepository } from "./product-repository/product.repository";
import { PrismaService } from "../config/prisma.config";

@Module({
    providers: [
        ProductRepository,
        PrismaService 
    ],
    exports: [ProductRepository]
})
export class RepositoryModule { };