import { config } from 'dotenv';

config();

export type ApiVersion = 'v1' | 'v2';

export interface ServerEnv {
  env: NodeJS.ProcessEnv;
  isProd: boolean;
  apiVersion: ApiVersion;
  protocol: 'http' | 'https';
}

export const serverEnv: ServerEnv = {
  env: process.env,
  isProd: process.env.NODE_ENV === 'production',
  apiVersion: 'v1',
  protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
};
