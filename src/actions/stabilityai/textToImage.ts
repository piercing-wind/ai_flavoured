"use server";
import fs from 'fs'
import { Data, uploadImageToS3 } from '../userPromptImage/uploadImageToS3';
/**
 * 
 * @param data {
 *  prompt : string, -->  text prompt
 * 
 * weight : number, -->  weight of the prompt
 * 
 * width : number, -->  width of the image
 * 
 * height : number,--> height of the image
 * 
 * userId : string, --> user id,
 * 
 * steps : number, --> integer of steps [ 10 .. 50 ]
 * 
 * seed : number, --> seed integer (Seed) [ 0 .. 4294967295 ]
 * 
 * samples : number, --> number of samples [ 1 .. 10 ]
 * 
 * cfg_scale: number, --> cfg_scale integer (cfg_scale) [ 1 .. 35 ]
 * 
 * clip_guidance_preset : string, --> clip_guidance_preset string (clip_guidance_preset) [ "NONE" .. FAST_BLUE, FAST_GREEN, NONE, SIMPLE, SLOW, SLOWER, SLOWEST]
 * 
 * style_preset : string, --> style_preset string (style_preset) [ "none" .. "photographic", 3d-model, analog-film, anime, cinematic, comic-book, digital-art, enhance, fantasy-art, isometric, line-art, low-poly, modeling-compound, neon-punk, origami, photographic, pixel-art, tile-texture]
 * 
 * samplers :  String -->  DDIM, DDPM, K_DPMPP_2M, K_DPMPP_2S_ANCESTRAL, K_DPM_2, K_DPM_2_ANCESTRAL, K_EULER, K_EULER_ANCESTRAL, K_HEUN, K_LMS
 * 
 * }
 * 
 * @returns array of images
 */

export interface GenerationResponse {
   artifacts: Array<{
     base64: string
     seed: number
     finishReason: string
   }>
 }
export const textToimage = async (data :{ 
   prompt : string,
   weight : number ,
   width : number,
   height : number,
   userId : string
   steps : number,
   seed : number,
   samples : number,
   sampler : string,
   cfg_scale: number,
   clip_guidance_preset : string,
   style_preset : string,
}) :Promise<Data[]> => {
   const {prompt,weight = 0.5, width, height,userId, steps = 10, seed, samples,sampler="k_dpmpp_2m",cfg_scale = 7, clip_guidance_preset="NONE", style_preset ="photographic"}= data;
  const engineId = "stable-diffusion-xl-1024-v1-0"
  const apiHost = process.env.STABILITY_AI_API_HOST ?? 'https://api.stability.ai'

  const dataImage = {
   text_prompts: [
     {
       text: prompt,
       weight: weight,
     },
   ],
   cfg_scale: cfg_scale,
   height: height,
   width: width,
   steps: steps,
   seed: seed,
   samples: samples,
   sampler :  sampler,
   clip_guidance_preset: clip_guidance_preset,
   style_preset: style_preset,
 };

  try {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
         'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY}`,
          Accept: "application/json" 
        },
        body: JSON.stringify(dataImage),
      }
    );
    const data = await response.json();

    if(data.name === 'content_moderation' && data.message.includes('Your request was flagged by our content moderation system')){  
       throw new Error('Your request was flagged by our content moderation system!');
      }

 
    console.log("Writing image to disk ...")
    const responseJSON = data as GenerationResponse

    const imageData : Data[] = await Promise.all(responseJSON.artifacts.map(async(image, index) => {
      const imageName = `${prompt.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_")}.png`  
      const buffer = Buffer.from(image.base64, 'base64')
      const uploadUrl = await uploadImageToS3(imageName, 'image/png', buffer.byteLength,userId);
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
         upscaled : uploadUrl.awsS3.data.upscaled
      };
      return cloudData;
    }))
    return imageData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(error as string);
  }
};
