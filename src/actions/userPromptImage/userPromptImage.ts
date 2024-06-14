import { db } from "@/lib/db";

export const getAllPreviousSessionsWithImage = async (userId : string) => {
   // console.log("hellloooooooooo"); 
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include: { userPromptImages: true },
   });
   // console.log(chatSessions);
  return chatSessions;
}  