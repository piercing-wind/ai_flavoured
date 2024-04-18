import { db } from "@/lib/db";

export const  chatSession = async (slug : string) => {
 
 const chatSession = await db.chatSessionId.findUnique({
      where: { chatId: slug },
    });

    if (chatSession) {
      return chatSession;
    }else{
      return {error : "chat session not found"};
    }
}


export const getAllPreviousSessions = async (userId : string) => {
  const chatSessions = await db.chatSessionId.findMany({
    where: { userId: userId },
  });
  // console.log(chatSessions);
  return chatSessions;
}