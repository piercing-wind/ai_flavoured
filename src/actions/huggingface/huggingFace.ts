'use server';
import { HfInference } from "@huggingface/inference";
import { Data, uploadImageToS3 } from '../userPromptImage/uploadImageToS3';

export async function imageGenerator(data: { prompt: string, width?: number, height?: number },userId : string) :Promise<Data> {
   const { prompt, width = 768, height = 768 } = data;
   let imageBlob;
   const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);
   for (let i = 0; i < 5; i++) {
      try {
         imageBlob = await inference.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            endpointUrl: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            inputs: prompt,
            // output_: 'jpg',
            parameters: {
               negative_prompt: 'blurry',
               width: width,
               height: height,
               num_inference_steps: 100,
               guidance_scale: 3,
            }
         })
         break;
      } catch (e) {
         console.error(`Attempt ${i + 1} failed with error: ${(e as Error).message}`);
         if (i === 4) throw e;
      }
   }
   if(!imageBlob) throw new Error('Image generation failed');
   const result = await imageBlob.arrayBuffer();   
   const buffer = Buffer.from(result); 
   const imageName = `${prompt.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_")}.png`
   const uploadUrl = await uploadImageToS3(imageName, 'image/png', buffer.byteLength,userId, 'sdxl');
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
      id :  Date.now().toString(),
      url : uploadUrl.awsS3.data.url,
      fileKey : uploadUrl.awsS3.data.fileKey, 
      fileName : uploadUrl.awsS3.data.fileName, 
      fileType : uploadUrl.awsS3.data.fileType,
      like : uploadUrl.awsS3.data.like,
      generator : uploadUrl.awsS3.data.generator,
      upscaled : null,
      imageModel : 'sdxl',
   };
   return cloudData;
}

