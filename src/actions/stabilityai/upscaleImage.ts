'use server';
import FormData from 'form-data';
import fs from 'fs'
import { Data, uploadImageToS3 } from "../userPromptImage/uploadImageToS3";
import { Readable } from 'stream';
import axios from 'axios';

export const upscaleImage = async (fileName : string, url : string,value : number, height : number, width : number, userId : string, upscaled: boolean | null):Promise<Data[]>=>{
   try{

      if(height * width > 4194304) throw new Error('Image size is invalid. Please provide valid image size.');
      if(height * width < 262144) throw new Error('Image size is invalid. Please provide valid image size.');
      const engineId = 'esrgan-v1-x2plus'
      const apiHost = process.env.STABILITY_AI_API_HOST ?? 'https://api.stability.ai'
      
      const res = await fetch(url) ;
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      let upscaleBuffer : Buffer;
      
      const data = new FormData();
      data.append('image', Readable.from(buffer));
      data.append('width', value);
      let config = {
         method: 'post',
         maxBodyLength: Infinity,
         url: `${apiHost}/v1/generation/${engineId}/image-to-image/upscale`,
         headers: { 
           'Accept': 'application/json', 
           'Authorization': `Bearer ${process.env.STABILITY_AI_API_KEY}`, 
           ...data.getHeaders()
         },
         data : data
       };
       const response = await axios.request(config);

       upscaleBuffer = Buffer.from(response.data.artifacts[0].base64, 'base64');

      
      if(!upscaleBuffer) throw new Error('Error upscaling image');
      fs.writeFileSync(`output/${fileName.replace('.png', '')}.png`, upscaleBuffer)
    
      const uploadUrl = await uploadImageToS3(`${fileName.replace('.png', '')}upsacled.png`, 'image/png', upscaleBuffer.byteLength, userId, 'sdxl', upscaled);
      const uploadRes = await fetch(uploadUrl.awsS3.url,{
         method: 'PUT',
         body: upscaleBuffer,
         headers: {
            'Content-Type': 'image/png', 
            'Content-Length': upscaleBuffer.byteLength.toString(),
            'Content-Disposition': `attachment; filename="${uploadUrl.awsS3.data.fileName}"`,
            'Metadata': `userId=${userId}`
         }
      })
      if(!uploadRes.ok) throw new Error('Error uploading image to S3');
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
      return [cloudData];
   }catch(e){
      console.log(e)
      throw new Error((e as Error).message);
   }
}