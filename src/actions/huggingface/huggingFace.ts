'use server';
import fs from 'fs';
import { HfInference } from "@huggingface/inference";

export async function imageGenerator(data: { inputs: string, width?: number, height?: number }) {
   const { inputs, width = 512, height = 512 } = data;
   console.log('Generating image...');
   let imageBlob;
   const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);
   for (let i = 0; i < 5; i++) {
      try {
         imageBlob = await inference.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            inputs: inputs,
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
   fs.writeFileSync('output/image.png', buffer);
   console.log('Image generated successfully'); 

}

