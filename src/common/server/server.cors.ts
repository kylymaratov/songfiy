import { INestApplication } from '@nestjs/common';
import { serverEnv } from './server.env';

export const setApiCors = (app: INestApplication) => {
  app.enableCors({
    origin: serverEnv.isProd ? '/' : '*',
    methods: '*',
    credentials: true,
  });
};
