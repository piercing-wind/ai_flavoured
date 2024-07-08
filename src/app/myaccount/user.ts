'use server';
import { dbquery } from "@/db/db"

export const changeUserName = async (id: string, name: string):Promise<'success'> => {
   try{
      const res = await dbquery(`UPDATE "User" SET name = $1 WHERE id = $2`, [name, id])
      if(res.rowCount !== 1){
         throw new Error('Failed to update name')
      } 
      return 'success'
   }catch(e){
      throw new Error((e as Error).message)
   }
}