'use server'
import { Data, uploadImageToS3 } from "@/actions/userPromptImage/uploadImageToS3";
import OpenAI from "openai";


/**
 * 
 * @param text : string --> text to be converted to audio
 * @param voiceModel : string --> voice model to be used for the audio
 * @param responseFormat : string --> response format of the audio
 * 
 * @returns audio : Promise<>
 */
export type TTSResponse ={

}

export interface AudioMime {
   mp3: string;
   wav: string;
   ogg: string;
   flac: string;
   opus: string;
}

export const textToAudio = async (text: string, userId : string, voiceModel: string ="onyx", responseFormat: keyof AudioMime = "mp3") : Promise<Data> => {
   const openai = new OpenAI(
       {apiKey: process.env.OPENAI_API_KEY}
   );   
   
   const audioMime : AudioMime = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      ogg: "audio/ogg",
      flac: "audio/flac",
      opus : "audio/opus"
   }

   try {
      const audio = await openai.audio.speech.create({
         model: "tts-1",
         voice: voiceModel as "onyx" | "alloy" | "echo" | "fable" | "nova" | "shimmer",
         input: text,
       });
       const buffer = Buffer.from(await audio.arrayBuffer());
       const imageName = `${text.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_").slice(0,50)}.${responseFormat}`  

       const uploadUrl = await uploadImageToS3(imageName, audioMime[responseFormat] , buffer.byteLength, userId);
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
       const cloudData : Data = {
          id : uploadUrl.awsS3.data.id,
          url : uploadUrl.awsS3.data.url,
          fileKey : uploadUrl.awsS3.data.fileKey, 
          fileName : uploadUrl.awsS3.data.fileName, 
          fileType : uploadUrl.awsS3.data.fileType,
          generator : uploadUrl.awsS3.data.generator,
          like : uploadUrl.awsS3.data.like,
          upscaled : uploadUrl.awsS3.data.upscaled
       };
     return cloudData;  
   } catch (error) {
      console.log(error)
      throw new Error((error as Error).message);
   }
}