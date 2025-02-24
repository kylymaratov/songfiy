import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './api/exceptions/http.exception.filter';
import { setApiCors } from './api/options/api.cors';
import { setApiDocs } from './api/options/api.docs';
import { apiEnv } from './api/options/api.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setApiCors(app);
  setApiDocs(app);

  app.setGlobalPrefix(`/api/${apiEnv.apiVersion}/`);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
