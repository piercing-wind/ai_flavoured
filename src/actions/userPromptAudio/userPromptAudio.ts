'use strict';
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
   const {id,userId, session,prompt ,audioUrl,fileKey,fileName,fileType} = data;
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
}

export const getAllPreviousSessionsWithAudio = async (userId : string) => {
   const chatSessions = await db.session.findMany({
      where: { userId: userId },
      include : { userPromptAudios : true }
   });

  return chatSessions;
}  

export const getAudioDataFromDB = async (userId : string, session : string) : Promise<AudioData[]> => {
   const res = await db.userPromptAudio.findMany({
      where: {
         userId: userId,
         session: session
      }
   });
   return res;
}