import { Injectable } from '@nestjs/common';
import { ProductEntity } from '@prisma/client';
import { AbstractProductRepository } from 'src/domain/repositories/product-repository/product-repository.abstract';
import { PrismaService } from 'src/infrastructure/config/prisma.config';
import { IProductModel } from '../../../domain/models/product.model';

@Injectable()
export class ProductRepository implements AbstractProductRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(data: IProductModel): Promise<ProductEntity> {
    const product = await this.prisma.productEntity.create({ data });
    return product;
  }

  public async delete(id: string): Promise<ProductEntity> {
    const deleteProduct = await this.prisma.productEntity.delete({
      where: { id },
    });
    return deleteProduct;
  }

  public async findMany(): Promise<ProductEntity[]> {
    const products = await this.prisma.productEntity.findMany();
    return products;
  }

  public async findOneById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.productEntity.findUnique({
      where: { id },
    });
    return product;
  }

  public async update(id: string, data: IProductModel): Promise<ProductEntity> {
    const updateProduct = await this.prisma.productEntity.update({
      where: { id },
      data: data,
    });
    return updateProduct;
  }

  public async createMany(data: IProductModel[]): Promise<ProductEntity[]> {
    const products = await this.prisma.productEntity.createMany({ data });
    return [];
  }

  public async findBySupplier(supplier: string): Promise<ProductEntity[]> {
    const products = await this.prisma.productEntity.findMany({
      where: { supplier },
    });
    return products;
  }

  public async findByName(name: string): Promise<ProductEntity[]> {
    const products = await this.prisma.productEntity.findMany({
      where: { name }
    });
    return products;
  }
}
