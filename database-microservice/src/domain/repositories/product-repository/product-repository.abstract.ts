import { ProductEntity } from "@prisma/client";
import {IProductModel} from "../../models/product.model";

export abstract class AbstractProductRepository {
    abstract create(data: IProductModel): Promise<ProductEntity>;
    abstract delete(id: string): Promise<ProductEntity>;
    abstract findMany(): Promise<ProductEntity[]>;
    abstract findOneById(id: string): Promise<ProductEntity | null>;
    abstract update(id: string, data: IProductModel): Promise<ProductEntity | null>;
    abstract createMany(data: IProductModel[]): Promise<ProductEntity[]>;
    abstract findBySupplier(supplier: string): Promise<ProductEntity[]>;
    abstract findByName(name: string): Promise<ProductEntity[]>;
}