'use server';
import { HfInference } from "@huggingface/inference";
import { uploadToS3 } from '../file/awsS3';

export const texttoimageforpresentation = async (imagePrompt : string, user : string,param : string) : Promise<string>=>{
   try{
   const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);
   const imageBlob =  await inference.textToImage({
      // stable-diffusion-xl-base-1.0
      model: 'runwayml/stable-diffusion-v1-5',
      inputs:imagePrompt,
      parameters: {
        negative_prompt: 'blurry',
      }
   })
   const result = await imageBlob.arrayBuffer();   
   const buffer = Buffer.from(result); 
   const imageName = `${imagePrompt}.png`
   const uploadRes = await uploadToS3(imageName, 'image/png', buffer.length, user,param, 'aiflavoured')   
if('failure' in uploadRes) throw new Error('Error uploading to S3')
   const res = await fetch(uploadRes.awsS3.url,{
      method: 'PUT',
      body: buffer,
      headers: {'Content-Type': 'image/png'}
   })
   return uploadRes.awsS3.userFile.url
}catch(e){
   console.error(e)
   throw e;}
}