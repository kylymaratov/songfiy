import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './server/server.exception-filter';
import * as passport from 'passport';
import { serverSession } from './server/server.session';
import { ServerLogger } from './server/server.logger';
import * as useragent from 'express-useragent';
import { identifyDevice } from './middlewares/identify.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ServerLogger(),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(serverSession());

  app.use(useragent.express());
  app.use(identifyDevice);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
