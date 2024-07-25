import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  port: 5432 || process.env.PORT,
  database: process.env.DATABASE_NAME,
  idleTimeoutMillis: 30000,
});
// export const pool = new pg.Pool({
//   host: process.env.SUPABASE_HOST,
//   user: process.env.SUPABASE_USER,
//   password: process.env.SUPABASE_PASSWORD,
//   port: 6543 || process.env.SUPABASE_PORT,
//   database: process.env.SUPABASE_DB_NAME,
//   idleTimeoutMillis: 30000,
// });
// export const pool = new pg.Pool({
//   host: process.env.NEON_HOST,
//   user: process.env.NEON_USER,
//   password: process.env.NEON_PASSWORD,
//   port: 5432 || process.env.NEON_PORT,
//   database: process.env.NEON_DB_NAME,
//   idleTimeoutMillis: 30000,
//   ssl: {
//    rejectUnauthorized: false
//   }
// });
// export const pool = new pg.Pool({
//   host: process.env.AZURE_PGHOST,
//   user: process.env.AZURE_PGUSER,
//   password: process.env.AZURE_PGPASSWORD,
//   port: 5432 || process.env.AZURE_PGPORT,
//   database: process.env.AZURE_PGDATABASE,
//   idleTimeoutMillis: 30000,
//   ssl: {
//    rejectUnauthorized: false
//   }
// });
// export const pool = new pg.Pool({
//    host: process.env.RDS_DATABASE_HOST_AWS,
//    database: process.env.PG_DATABASE_NAME_AWS,
//    user: process.env.PG_USER_AWS,
//    password: process.env.PG_PASSWORD_AWS,
//    port: 5432 || process.env.PG_PORT_AWS,
//    idleTimeoutMillis: 30000,
//  });

/**
 * **DataBase Query** 
 * 
 * Executes a database query and returns the first row of the result set.
 * If the query does not return any rows, it returns an error object.
 *
 * @param {string} queries - The SQL query to execute.
 * @param {any} values - The values to use in the query.
 * @returns {Promise<any>} This returns the first row which is found or an error object.
 */
export const dbq = async (queries : string, values: any) => {
  const client = await pool.connect();
  // if (!client) {
  //   return { error: "Database connection failed!" };
  // }
  try {
    const result = await client.query(queries,values);
    if (result.rows.length === 0) {
      return { error: "No data found!"};
    }else{
      // console.log(result.rows);
      return result.rows[0];
    }
  } catch (error) {
    console.error(error);
    return { error: "Database query failed!" };
  } finally {
    client.release();
  }
};



/**
 * **DataBase Query Multiple** 
 * 
 * Executes a database query and returns the first row of the result set.
 * If the query does not return any rows, it returns an error object.
 *
 * @param {string} queries - The SQL query to execute.
 * @param {any} values - The values to use in the query.
 * @returns {Promise<any>} This Returns All the found rows in table or an error object.
 */

export const dbqM = async (queries : string, values: any): Promise<any> => {
   const client = await pool.connect();
   // if (!client) {
   //   return { error: "Database connection failed!" };
   // }
   try {
     const result = await client.query(queries,values);
     if (result.rows.length === 0) {
       return { error: "No data found!"};
     }else{
       // console.log(result.rows);
       return result.rows;
     }
   } catch (error) {
     console.error(error);
     return { error: "Database query failed!" };
   } finally {
     client.release();
   }
 };

 export const dbquery = async (queries : string, values: any): Promise<any> => {
   const client = await pool.connect();
   try {
     const result = await client.query(queries,values);
     return result
   } catch (error) {
     console.error(error);
     return { error: "Database query failed!" };
   } finally {
     client.release();
   }
 };
