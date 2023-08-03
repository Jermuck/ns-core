import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ProductEntity } from '@prisma/client';
import { AbstractProductRepository } from 'src/domain/repositories/product-repository/product-repository.abstract';
import { LOGGER_SERVICE, PRODUCT_REPOSITORY } from './сonstants/index.сonstants';
import { IProductModel } from '../../../domain/models/product.model';
import { GatewayPaths } from 'src/infrastructure/gateway-paths/gateway.paths';

@Controller()
export class ProductController implements OnModuleInit {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: AbstractProductRepository,
    
    @Inject(LOGGER_SERVICE)
    private readonly loggerService: ClientProxy
  ) { }

  public async onModuleInit() {
    this.loggerService.connect();
  }

  @MessagePattern('product.create')
  public async createProduct(
    @Payload() dto: IProductModel,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.create(dto);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, 'Product was save')
    return product;
  }

  @MessagePattern('product.delete')
  public async deleteProduct(@Payload() id: string): Promise<ProductEntity> {
    const isExistProduct = await this.productRepository.findOneById(id);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, 'Product finding...')
    if (!isExistProduct) {
      this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, 'Not found product');
      return;
    }
    const deleteProduct = await this.productRepository.delete(id);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, `Product with id: ${deleteProduct.id} was delete`);
    return deleteProduct;
  }

  @MessagePattern('product.findMany')
  public async findMany(): Promise<ProductEntity[]> {
    const products = await this.productRepository.findMany();
    return products;
  }

  @MessagePattern('product.createMany')
  public async createMany(@Payload() payload: IProductModel[]): Promise<void> {
    await this.productRepository.createMany(payload);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, 'Many products was create');
  }

  @MessagePattern('product.getById')
  public async getById(@Payload() id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOneById(id);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, `Find product with id: ${product.id}`);
    return product;
  };

  @MessagePattern('product.getByName')
  public async getByName(@Payload() name: string): Promise<ProductEntity[]> {
    const products = await this.productRepository.findByName(name);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, `Finding products with name: ${name}`);
    return products;
  }

  @MessagePattern({ cmd: 'product.getBySupplier' })
  public async getBySupplier(@Payload() supplier: string): Promise<ProductEntity[]> {
    const products = await this.productRepository.findByName(supplier);
    this.loggerService.emit<string, string>(GatewayPaths.LOGGER_CREATE, `Finding products with supplier: ${supplier}`);
    return products;
  }
}
