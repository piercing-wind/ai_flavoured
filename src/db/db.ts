import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432 || process.env.PORT,
  database: process.env.DATABASE_NAME,
  idleTimeoutMillis: 30000,
});

export const dbq = async (queries : string, values: any) => {
  const client = await pool.connect();
  // if (!client) {
  //   return { error: "Database connection failed!" };
  // }
  try {
    const result = await client.query(queries,values);
    if (result.rows.length === 0) {
      return { error: "No data found!", result };
    }else{
      return result.rows[0];
    }
  } catch (error) {
    console.error(error);
    return { error: "Database query failed!" };
  } finally {
    client.release();
  }
};
