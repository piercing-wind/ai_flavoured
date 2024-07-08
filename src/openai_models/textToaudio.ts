'use server'
import OpenAI from "openai";
import { uploadAudioToS3, DataAudio } from "./uploadAudioToS3";

/**
 * 
 * @param text : string --> text to be converted to audio
 * @param voiceModel : string --> voice model to be used for the audio
 * @param responseFormat : string --> response format of the audio
 * @param hd : boolean --> high definition audio
 * @param speed : number --> speed of the audio
 * @param userId : string --> user id
 * 
 * @returns audio : Promise<>
 */
export type TTSResponse ={

}

export interface AudioMime {
   mp3: string;
   wav: string;
   aac: string;
   flac: string;
   opus: string;
}

export const textToAudio = async (
   text: string, 
   userId : string, 
   voiceModel: string ="onyx", 
   responseFormat: keyof AudioMime = "mp3", 
   hd : boolean, 
   speed : number
   ) : Promise<DataAudio> => {
   const openai = new OpenAI(
       {apiKey: process.env.OPENAI_API_KEY}
   );   
   
   const audioMime : AudioMime = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      aac: "audio/aac",
      flac: "audio/flac",
      opus : "audio/opus"
   }

   try {
      const audio = await openai.audio.speech.create({
         model: hd ? "tts-1-hd" : "tts-1",
         voice: voiceModel as "onyx" | "alloy" | "echo" | "fable" | "nova" | "shimmer",
         input: text,
         response_format: responseFormat,
         speed: speed
       });
       const buffer = Buffer.from(await audio.arrayBuffer());
       const imageName = `${text.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_").slice(0,50)}.${responseFormat}`  
       const uploadUrl = await uploadAudioToS3(imageName, audioMime[responseFormat] , buffer.byteLength, userId);
       const res = await fetch(uploadUrl.awsS3.url,{
          method: 'PUT',
          body: buffer,
          headers: {
             'Content-Type': audioMime[responseFormat], 
             'Content-Length': buffer.byteLength.toString(),
             'Content-Disposition': `attachment; filename="${uploadUrl.awsS3.data.fileName}"`,
             'Metadata': `userId=${userId}`
          }
       })
       if(!res.ok) throw new Error('Error uploading image to S3');
       const cloudData : DataAudio = {
          id : uploadUrl.awsS3.data.id,
          url : uploadUrl.awsS3.data.url,
          fileKey : uploadUrl.awsS3.data.fileKey, 
          fileName : uploadUrl.awsS3.data.fileName, 
          fileType : uploadUrl.awsS3.data.fileType,
       };
     return cloudData;  
   } catch (error) {
      console.log(error)
      throw new Error((error as Error).message);
   }
}