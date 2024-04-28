'use server'
import { dbq } from "@/db/db";
import { db } from "@/lib/db";
// import { url } from "inspector";

export const createChatSession = async (userId: string, fileName : string) => {
  const createChatSession = await db.chatSessionId.create({
    data: {
      userId: userId,
      chatName: fileName,
    },select :{
      chatId : true
    }
  });
  return createChatSession.chatId; 
};

export const  findChatSession = async (slug : string) => {
 
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
    include: { userFiles: true },
  });
  // console.log(chatSessions);
  return chatSessions;
}

//update the chatName
export const updateChatName = async (chatId : string, newChatName: string) => {
  console.log("updating chat name")
  const updatedChat = await db.chatSessionId.update({
    where: { chatId: chatId },
    data: { chatName: newChatName },
  });
  console.log(updatedChat);
  return updatedChat;
}


//quering the userFile table for Pdf Urls with the help of chatid

export async function getDocUrls(slug : string){
 try{
  const docUrl = await db.userFile.findMany({
    where: {
       chatId: slug 
      },
  });
  return docUrl;
 }catch(e){
  console.log(e);
  return [];
 }
}



//Danger zone : Deleting



export async function deleteChatSession(chatId: string) {
  // Start a transaction
  // Delete related AIMemory entries
 const res =  dbq(`DELETE FROM "AIMemory" WHERE "metadata"->>'sessionId' = '${chatId}'`,[]);
  await db.$transaction([
    // Delete related messageHistory entries
    db.messageHistory.deleteMany({
      where: {
        chatId: chatId,
      },
    }),
    // Delete related UserFile entries
    db.userFile.deleteMany({
      where: {
        chatId: chatId,
      },
    }),
    // Finally, delete the chatSessionId
    db.chatSessionId.delete({
      where: {
        chatId: chatId,
      },
    }),
  ]);
  console.log("Chat session deleted successfully")
}
