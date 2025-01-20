import { INestApplication } from '@nestjs/common';
import { apiEnv } from './api.env';

export const setApiCors = (app: INestApplication) => {
  app.enableCors({
    origin: apiEnv.isProd ? '/' : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    preflightContinue: true,
  });
};
