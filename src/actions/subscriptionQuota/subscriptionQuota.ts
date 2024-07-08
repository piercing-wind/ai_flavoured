'use server'

import { dbq } from "@/db/db";

export const getSubscriptionQuota = async (id: string) => {
      try {
        const quota = await dbq('SELECT * FROM "subscriptionQuota" WHERE "userId" = $1', [id]);
        return quota;
      } catch (error) { 
        throw new Error((error as Error).message);
      }
    };

export const getAiPresentationQuota = async (id: string) => {
         try {
            const quota = await dbq('SELECT "aipresentation" FROM "subscriptionQuota" WHERE "userId" = $1', [id]);
            return quota.aipresentation;
         } catch (error) { 
            throw new Error((error as Error).message);
         }
}

export const updateAiPresentationQuota = async (id: string, quota: any) => {
         try {
            await dbq('UPDATE "subscriptionQuota" SET "aipresentation" = $1 WHERE "userId" = $2', [quota, id]);
         } catch (error) { 
            throw new Error((error as Error).message);
         }
}


export const getAudioQuota = async (id: string) => {
         try {
            const quota = await dbq('SELECT "textToSpeech" FROM "subscriptionQuota" WHERE "userId" = $1', [id]);
            return quota.textToSpeech;
         } catch (error) { 
            throw new Error((error as Error).message);
         }
}

export const updateAudioQuota = async (id: string, quota: any) => {
         try {
            await dbq('UPDATE "subscriptionQuota" SET "textToSpeech" = $1 WHERE "userId" = $2', [quota, id]);
         } catch (error) { 
            throw new Error((error as Error).message);
         }
}

export const getImageQuota =  async (id : string) => {
   try{
      const quota = await dbq('SELECT "aiImages" FROM "subscriptionQuota" WHERE "userId" = $1',[id])
      return quota.aiImages;
   }catch(e){
      throw new Error((e as Error).message);
   }
}
 
export const updateImageQuota = async (id: string, quota: any) => {
   try{
      await dbq('UPDATE "subscriptionQuota" SET "aiImages" = $1 WHERE "userId" = $2',[quota, id])
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const getChatWithDocQuota = async (id: string) => {
   try{
      const quota = await dbq('SELECT "aiChatWithDoc" FROM "subscriptionQuota" WHERE "userId" = $1',[id])
      return quota.aiChatWithDoc;
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const updateChatWithDocQuota = async (id: string, quota: any) => {
   try{
      await dbq('UPDATE "subscriptionQuota" SET "aiChatWithDoc" = $1 WHERE "userId" = $2',[quota, id])
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const getAiPresentationAndModelsQuota = async (id: string) => {
   try{
      const quota = await dbq('SELECT "aipresentation", "gpt3_5Question", "gpt4Question", "gpt4oQuestion" FROM "subscriptionQuota" WHERE "userId" = $1',[id])
      return quota;
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const  updateGpt3_5QuestionQuota = async (id: string, quota: any) => {
   try{
      await dbq('UPDATE "subscriptionQuota" SET "gpt3_5Question" = $1 WHERE "userId" = $2',[quota, id])
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const  updateGpt4QuestionQuota = async (id: string, quota: any) => {
   try{
      await dbq('UPDATE "subscriptionQuota" SET "gpt4Question" = $1 WHERE "userId" = $2',[quota, id])
   }catch(e){
      throw new Error((e as Error).message);
   }
}

export const  updateGpt4oQuestionQuota = async (id: string, quota: any) => {
   try{
      await dbq('UPDATE "subscriptionQuota" SET "gpt4oQuestion" = $1 WHERE "userId" = $2',[quota, id])
   }catch(e){
      throw new Error((e as Error).message);
   }
}