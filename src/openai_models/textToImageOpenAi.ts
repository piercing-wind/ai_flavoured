'use server'
import { Data, uploadImageToS3 } from "@/actions/userPromptImage/uploadImageToS3";
import OpenAI from "openai";
export const textToImageOpenAI = async ({
   prompt,
   samples,
   model,
   size,
   style,
   userId
}:
{   prompt: string,
   samples: number,
   model : "dall-e-2" | "dall-e-3",
   size : "256x256" | "512x512" | "1024x1024",
   style : 'vivid' | 'natural',
   userId : string
}) : Promise<Data[]> => {
   try{
   console.log(samples, model, size, style, prompt, userId)  
   const openai = new OpenAI(
      {apiKey : process.env.OPENAI_API_KEY},
   ); 
   const response = await openai.images.generate({ 
      model: model, 
      prompt: prompt,
      n : samples,
      size : size,
      style : style,
      response_format : "b64_json"
   });


   const imageData : Data[] = await Promise.all(response.data.map(async (image, index) => {
      if(!image.b64_json) throw new Error("No image data found")
      const imageName = `${prompt.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_")}${index}.png`
      const buffer = Buffer.from(image.b64_json, 'base64');
      const uploadUrl = await uploadImageToS3(imageName, 'image/png', buffer.byteLength, userId, 'dalle');
      const res = await fetch(uploadUrl.awsS3.url,{
         method: 'PUT',
         body: buffer,
         headers: {
            'Content-Type': 'image/png', 
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
      upscaled : uploadUrl.awsS3.data.upscaled,
      imageModel : uploadUrl.awsS3.data.imageModel
   };
   return cloudData;
   }))

   return imageData;
  }catch(e){
   console.log(e)
   throw new Error((e as Error).message);
   }
}