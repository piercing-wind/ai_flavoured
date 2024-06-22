'use server';
import { Database } from "@/components/imageSessionBar";
import { db } from "@/lib/db";
import { Data } from "./uploadImageToS3";

export const getAllPreviousSessionsWithImage = async (userId : string) => {
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include: { userPromptImages: {
         include: { images: true }
      } },
   });
  return chatSessions;
}  

export const insertUserPromptImage =async (dbData :Database, images : Data[]) : Promise<string>=>{
   try{
   const {id, userId, session, prompt } = dbData;

  const userPromptImage = await db.userPromptImage.create({
      data: {
         id: id,
         userId: userId,
         session: session,
         prompt: prompt,
         images: {
            create: images,
         }
      },
   });
   return userPromptImage.id;
   } catch (e) {
      throw new Error(e as string);
   }
}
export type Image = {
   id: string;
   userPromptImageId: string;
   fileKey: string;
   fileName: string;
   url: string;
   fileType: string;
   like: boolean | null;
   generator: 'user' | 'aiflavoured';
}

export const fetchShareUrl = async (id : string) : Promise<Image> => {
   try {
   const image = await db.aiImages.findUnique({
      where: { id: id},

   })
   if (!image) {
      throw new Error("Record not found");
   }
   return Promise.resolve(image);
} catch (e) {
   throw new Error(e as string);
}
}

// export const fetchUserPromptedImages = async (session : string) => {
//    const userPromptImages = await db.userPromptImage.findMany({
//       where: { session: session },
//    });
//    return userPromptImages;
// }

export const updateLike = async (id : string, like : boolean | null) => {
   const aiImage = await db.aiImages.update({
      where: { id: id },
      data: { like: like },
   });
   return aiImage;
};