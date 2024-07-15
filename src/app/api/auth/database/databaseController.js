import { pool } from "@/db/db";

const dataBaseConnectorAndQueryExecutor = async (queries) => {
  const client = await pool.connect();
  if(!client) {
    console.error("Database connection failed!");
    return { err: "Database connection failed!" };
  }
  try {
    const result = await client.query(queries);
    return result.rows;
  }catch (err) {
    console.error(err);
    return { err: "Database query failed!" };
  }finally {
    client.release(client);
  }
};


export const getData = async () => {
  const result = await dataBaseConnectorAndQueryExecutor("SELECT * FROM flags");
  return result;
 
};

export const postData = async (id, country,flag) => {
    const result = await dataBaseConnectorAndQueryExecutor("INSERT INTO flags (id, country, flag) VALUES ($1, $2, $3)", [id, country, flag]);
    return result;
}
