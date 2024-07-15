'use server'
import { dbq } from "@/db/db";
import { db } from "@/lib/db";
// import { url } from "inspector";

export const createChatSession = async (userId: string, fileName : string, sessionType: string) => {
  const createChatSession = await db.session.create({
    data: {
      userId: userId,
      chatName: fileName,
      sessionType : sessionType,
    },select :{
      session : true
    }
  });
  return createChatSession.session; 
};

export const findChatSession = async (slug : string) => {
 
 const chatSession = await db.session.findUnique({
      where: { session: slug },     
    });

    if (chatSession) {
      return chatSession;
    }else{
      return {error : "chat session not found"};
    }
}


export const getAllPreviousSessions = async (userId : string) => {
   // console.log("hellloooooooooo"); 
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include: { userFiles: true },
   });
   // console.log(chatSessions);
  return chatSessions;
}
export const getAllPreviousSessionsWithOtherData = async (userId : string) => {
   // console.log("hellloooooooooo"); 
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include: { 
         userFiles: true,
         userPromptImages :{
            include : {
               images : true
            }
         },
         userPromptAudios : true,
      },
   });
  return chatSessions;
}

//update the chatName
export const updateChatName = async (session : string, newChatName: string) => {
  const updatedChat = await db.session.update({
    where: { session: session },
    data: { chatName: newChatName },
  });
  // console.log(updatedChat);
  return updatedChat;
}


//quering the userFile table for Pdf Urls with the help of session

export async function getDocUrls(slug : string){
 try{
  const docUrl = await db.userFile.findMany({
    where: {
       session: slug 
      },
  });
  return docUrl;
 }catch(e){
  console.log(e);
  return [];
 }
}



//Danger zone : Deleting



export async function deleteChatSession(session: string, sessionType: string) {
  // Start a transaction
  // Delete related AIMemory entries
 switch(sessionType){
   case 'presentation' :
   case 'chatwithdoc' : 
      const res =  dbq(`DELETE FROM "AIMemory" WHERE "metadata"->>'session' = '${session}'`,[]);
      await db.$transaction([
        // Delete related messageHistory entries
        db.messageHistory.deleteMany({
          where: {
            session: session,
          },
        }),
       // Delete related UserFile entries
        db.userFile.deleteMany({
          where: {
            session: session,
          },
        }),
        // Finally, delete the session
        db.session.delete({
          where: {
            session: session,
          },
        }),
      ]);
      break;
   case 'image/sdxl':
   case 'image/dall-e':
      await db.$executeRawUnsafe(`
      DELETE FROM "aiImages" WHERE "userPromptImageId" IN (
        SELECT "id" FROM "userPromptImage" WHERE "session" = '${session}'
      );
      DELETE FROM "userPromptImage" WHERE "session" = '${session}';
    `);
       break;

   case 'audio':
      await db.userPromptAudio.deleteMany({
         where:{
            session : session
         }
      })

 }

}

