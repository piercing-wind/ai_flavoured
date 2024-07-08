'use server'
import {dbquery} from '@/db/db';

export const supporFormData = async(values:FormData):Promise<string>=>{
   try{
     const res = await dbquery(`INSERT INTO support (title, subject, description, "submittedBy", file) VALUES ($1, $2, $3, $4 , $5)`, 
     [values.get('title'), values.get('subject'), values.get('description'), values.get('submittedBy'), values.getAll('files')])
     if(res.rowCount !== 1) throw new Error("Unable to Save your issue in database!");
     return "We have received your issue 🚩"
   }catch(e){
      throw new Error((e as Error).message);
   }
}
