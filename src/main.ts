import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//
import { AppModule } from './app.module';
import { setApiCors } from './common/server/server.cors';
import { setApiDocs } from './common/server/server.docs';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { serverEnv } from './common/server/server.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setApiCors(app);
  setApiDocs(app);

  app.setGlobalPrefix(`/api/${serverEnv.apiVersion}/`);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
