import { config } from 'dotenv';

config();

export type ApiVersion = 'v1' | 'v2';

export interface ApiEnv {
  env: NodeJS.ProcessEnv;
  isProd: boolean;
  apiVersion: ApiVersion;
  protocol: 'http' | 'https';
}

export const apiEnv: ApiEnv = {
  env: process.env,
  isProd: process.env.NODE_ENV === 'production',
  apiVersion: 'v1',
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
};
