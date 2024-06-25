import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3005;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:4300' }); 
  await app.listen(3005);
}
bootstrap();
