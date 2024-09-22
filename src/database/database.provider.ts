import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const env = process.env;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
});

export default AppDataSource;
