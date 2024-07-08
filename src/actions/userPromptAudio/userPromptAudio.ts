'use server';
import {db} from "@/lib/db";
import { use } from "react";

export type AudioData ={
   id: string;
   userId: string;
   session: string;
   prompt: string;
   audioUrl: string;
   fileKey: string;
   fileName: string;
   fileType: string;
}

export const addAudioDataToDB = async (data : AudioData) => {
   console.log(data);
   try{const {id,userId, session,prompt ,audioUrl,fileKey,fileName,fileType} = data;
   const res = await db.userPromptAudio.create({
      data: {
         id : id,
         userId: userId,
         session: session,
         prompt: prompt,
         audioUrl: audioUrl,
         fileKey: fileKey,
         fileName: fileName,
         fileType: fileType
      }
   });
  return res
}catch(e){
      console.log(e);
   }
}

export const getAllPreviousSessionsWithAudio = async (userId : string) => {
   try{
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include : { userPromptAudios : true }
   });

  return chatSessions;
}catch(e){
   console.log(e);
   throw new Error(e as string);
}
}  

export const getAudioDataFromDB = async (userId : string, session : string) : Promise<AudioData[]> => {
   try{

      const res = await db.userPromptAudio.findMany({
         where: {
            userId: userId,
            session: session
         }
      });
      return res;
   }catch(e){
      console.log(e);
      throw new Error(e as string);
   }
}

export type FetchAudioData= {
   id: string;
    userId: string;
    session: string;
    prompt: string;
    audioUrl: string;
    fileName: string;
    fileKey: string;
    fileType: string;
    createdAt: Date;
    updatedAt: Date;
}
export const getAuidoUrl = async (id : string):Promise<FetchAudioData> =>{
   try{
      const res =  await db.userPromptAudio.findUnique({
         where: {
            id: id
         }
      })
      if(!res) throw new Error('Audio not found');
      return res;
   }catch(e){
      console.log(e);
      throw new Error(e as string);
   }
}