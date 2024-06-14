import pg from "pg";

export const pool = new pg.Pool({
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432 || process.env.PORT,
  database: process.env.DATABASE_NAME,
  idleTimeoutMillis: 30000,
});



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
