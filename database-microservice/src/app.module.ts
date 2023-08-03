import { Module } from '@nestjs/common';
import { ProductModule } from './infrastructure/controllers/product/product.module';

@Module({
  imports: [
    ProductModule
  ]
})
export class AppModule {}
