import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import * as pg from 'pg';
import { config } from 'dotenv';

config();

export const serverSession = () => {
  const pgPool = new pg.Pool({ connectionString: process.env.POSTGRES_URL });

  const PgSession = pgSession(session);

  return session({
    store: new PgSession({
      pool: pgPool,
      tableName: 'sessions',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  });
};
