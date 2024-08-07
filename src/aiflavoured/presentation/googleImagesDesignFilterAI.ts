"use server";
import { HumanMessage, MessageContentComplex } from "@langchain/core/messages";
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { Base64Image, Images } from "./getImagesFromGoogleAndConvertToBase64";
import { imageToBase64 } from "../imgs/imageToBase64";
import { m } from "framer-motion";
export const googleImagesDesignFilterAI = async (
  model: string = "gpt-4o",
  base64Images: Base64Image[]
) => {
  try {
    const chat = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: model,
      temperature: 0.1,
      maxTokens: 1024,
    });

    const filteredImageUrls: string[] = [];

    for (const items of base64Images) {
      try {
        const base64 = items.base64;
        const mime = items.mime;
        const message = new HumanMessage({
          content: [
            {
              type: "text",
              text: `Your job is to check if this image contains humans or text, if it have humans or text on the image replay with no,
              otherwise check if that image is very suitable for presentation slide background and replay with yes.
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mime};base64,${base64}`,
                detail: "low",
              },
            },
          ],
        });
        const response = await chat.invoke([message]);
        filteredImageUrls.push(response.content.toString());
      } catch (e) {
        if (e instanceof Error) {
            filteredImageUrls.push('No');
          console.log(e.message);
        }
      }
    }

    return filteredImageUrls;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};



export const googleImagePicker = async (
  model: string = "gpt-4o",
  base64Images: Base64Image[],
  prompt : string
) => {
  try {
    const chat = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: model,
      temperature: 0.1,
      maxTokens: 1024,
    });

    const filteredImageUrls: string[] = [];

    for (const items of base64Images) {
      try {
        const base64 = items.base64;
        const message = new HumanMessage({
          content: [
            {
              type: "text",
              text: `Your job is to check if this image describe this prompt:  "${prompt}", 
              if it does replay with yes, otherwise replay with no only.
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${base64}`,
                detail: "low",
              },
            },
          ],
        });
        const response = await chat.invoke([message]);
        filteredImageUrls.push(response.content.toString());
        if(response.content.toString().toLowerCase().replace(/[.!]/g, '').includes('yes')){
          break;
        }
      } catch (e) {
        if (e instanceof Error) {
            filteredImageUrls.push('No');
          console.log(e.message);
        }
      }
    }

    return filteredImageUrls;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};


export const imagePicker = async (
   model: string = "gpt-4o",
   images: Images,
   prompt : string
 ) => {
   try {
     const chat = new ChatOpenAI({
       openAIApiKey: process.env.OPENAI_API_KEY,
       modelName: model,
       temperature: 0.1,
       maxTokens: 1024,
     });
 
     const filteredImageUrls: string[] = [];
 
     for (const items of images) {
        try {
           const base64 = await imageToBase64(items.link);
           const mime = items.mime;
           const lengthInBytes = 4 * Math.ceil((base64.length / 3))*0.5625;   
           const sizeInMB = lengthInBytes / (1024*1024);
           if (sizeInMB > 20) {
            throw new Error('Image size is greater than 20MB');
         }
           
         const link = items.link;
         const message = new HumanMessage({
           content: [
             {
               type: "text",
               text: `Your job is to check if this image describe this prompt:  "${prompt}", 
               if it does replay with yes, otherwise replay with no only.
               `,
             },
             {
               type: "image_url",
               image_url: {
                  url:`data:${mime};base64,${base64}`,
                 detail: "auto",
               },
             },
           ],
         });
         const response = await chat.invoke([message]);
         filteredImageUrls.push(response.content.toString());
         if(response.content.toString().toLowerCase().replace(/[.!]/g, '').includes('yes')){
           break;
         }
       } catch (e) {
         if (e instanceof Error) {
            filteredImageUrls.push('No');
            console.log(e.message);
         }else{
            filteredImageUrls.push('No');
         }
       }
     }
 
     return filteredImageUrls;
   } catch (e) {
     if (e instanceof Error) {
       console.log(e.message);
     }
   }
 };
 