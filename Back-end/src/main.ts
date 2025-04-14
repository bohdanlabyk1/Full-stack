import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Імпорт для NestExpressApplication

async function bootstrap() {
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Увімкнення CORS для фронтенда
  app.enableCors();

  // Налаштування статичних файлів
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Запуск сервера
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
