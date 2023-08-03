import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.setGlobalPrefix('/api')
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') | 3000;
  await app.listen(PORT, () => {
    console.log(`Server was start in port: ${PORT}`)
  });
}
bootstrap();
