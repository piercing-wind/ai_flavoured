'use server'
import { PresentationData } from "@/aiflavoured/presentation/themes/presentation";
import { dbq, dbqM } from "@/db/db"; 




export const storePresentationData = async (data: PresentationData, param : string, presentationImage : Object) : Promise<Object> => {
   try {
        const { author, title, pptxData, imageSearch, waterMark, variant } = data; 

       await dbq(
         `INSERT INTO "aipresentationData" ("id" ,"presentationSession", "author", "title", "pptxData", "presentationImage", "imageSearch", "waterMark", "variant") VALUES (uuid_generate_v4(),$1, $2, $3, $4, $5, $6, $7 ,$8)`,
         [param, author, title, pptxData, JSON.stringify(presentationImage), imageSearch, waterMark, variant]);

         return { success: "Presentation data stored successfully" }
   } catch (e) {
      if ((e as Error).message.includes('function uuid_generate_v4() does not exist')) {
         await dbq('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',[]);
         return storePresentationData(data, param, presentationImage);
      } else {
         return { error: (e as Error).message }
      }
   }
}

// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



/**  
 * **Get Presentation Data**
 * 
 * Fetches the presentation data from the database.
 * @param {string} session - The session id of the presentation.
 * @returns {Promise<any>} This returns the presentation data or an error.
*/
export const getPresentationData = async (session: string): Promise<any> => {
   try{
      const presentationData = await dbqM(`SELECT * FROM "aipresentationData" WHERE "presentationSession" = $1`,
      [session]);
      return presentationData;
   }catch(e: unknown){
      console.log(e);
      if (e instanceof Error) {
         return e.message;
      }
      return String(e);
   }
}
