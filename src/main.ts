import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//
import { AppModule } from './app.module';
import { setApiCors } from './common/settings/api.cors';
import { setApiDocs } from './common/settings/api.docs';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { apiEnv } from './common/settings/api.env';

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
