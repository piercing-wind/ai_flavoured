import { Pool } from 'pg';

export const pool = new Pool({
      user: process.env.USER_NAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: 5432 || process.env.PORT,
      database: process.env.DATABASE_NAME,
      idleTimeoutMillis: 30000,

});


