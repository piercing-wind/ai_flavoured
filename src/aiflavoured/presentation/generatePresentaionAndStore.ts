'use server';
import { createChatSession } from "@/actions/chat/chatSession";
import { PresentationData, presentation } from "./themes/presentation";
import { uploadToS3 } from "@/actions/file/awsS3";
import { storeMessage } from "@/actions/chat/messages";
import * as z from "zod"
import { presentationSchema } from "@/schemas";
import { facetThemePresentation } from "./themes/facetThemePresentation";
import { Presentation, ppPartyThemePresentation } from "./themes/ppPartyThemePresentation";
import { minimalistSalePitchThemePresentation } from "./themes/minimalistSalePitchThemePresentation";
import { biomePresentationTheme } from "./themes/biomePresentationTheme";
import { darkThemeMoonPresentation } from "./themes/darkThemeMoonPresentation";
import { scientificBluePresentationTheme } from "./themes/scientificBluePresentationTheme";
import * as fs from 'fs';
import { storePresentationData } from "@/actions/presentationData/presentationData";
import { adobePPTXToPdf } from "@/actions/adobe/adobePPTXToPdf";
import { convertSlidesStringToObject } from "./convertSlidesStringToObject";
import { googleImagesFromGoogle } from "./getImagesFromGoogleAndConvertToBase64";
import { texttoimageforpresentation } from "@/actions/huggingface/texttoimageforpresentation";


function extractPictures(obj: any, slideNumber: number = 0): {picture: string, slideNumber: number}[] {
   let pictures: {picture: string, slideNumber: number}[] = [];
   for (let key in obj) {
       if (typeof obj[key] === 'object' && obj[key] !== null) {
           pictures = pictures.concat(extractPictures(obj[key], slideNumber));
       } else if (key === 'picture') {

         pictures.push({picture: obj[key], slideNumber: slideNumber});
       }
   }
   return pictures;
}

export type PresentationImage = {
   picture: string,
   slideNumber: number
 }[]

//                    
export const generatePresentaionAndStore = async (data : z.infer<typeof presentationSchema>, sessionParam?: string ) => {
   const {selectedFiles, user, slides, wordsAmount, audience, imageSearch, ppmodel, waterMark , variant, textInputValue, themeFunction} = data;
     
      const response = await fetch(`${process.env.WEBSITE_URL}/api/generateaipresentation`, {
            method: "POST",
            body: JSON.stringify({ 
           files: selectedFiles,
           userId: user.id,
           author: user.name,
           numberOfSlides: slides.toString(),
           wordsAmount: wordsAmount,
           audience: audience,
           imageSearch: imageSearch,
           ppmodel: ppmodel,
           waterMark: waterMark,
           themeFunction : themeFunction,
           textInputValue : textInputValue
         }),
       })


  if(response.ok){
//    //presentation data needs to be stored in database |
try{
    const functionMapping = {
      'scientificBluePresentationTheme': scientificBluePresentationTheme,
      'ppPartyThemePresentation': ppPartyThemePresentation,
      'darkThemeMoonPresentation': darkThemeMoonPresentation,
      'minimalistSalePitchThemePresentation': minimalistSalePitchThemePresentation,
      'biomePresentationTheme': biomePresentationTheme,
    };
      const res : PresentationData = await response.json();   
      const param = sessionParam ? sessionParam : await createChatSession(user.id,`${res.author}_AiFlavoured.pptx`, "presentation");

      
      //genereating images from google
      const pptxData = await convertSlidesStringToObject(res.pptxData);
     
      if (!Array.isArray(pptxData)) {
         throw new Error('datas is not an array');
      }
      const picturesQueries = pptxData.flatMap((slide: any, index: number) => extractPictures(slide, index + 1));
      const photosWithLink : PresentationImage = await Promise.all(picturesQueries.map(async (slide : any) => {
         let query = slide.picture;
         const image = imageSearch === "Google Search" ? await googleImagesFromGoogle(query) : await texttoimageforpresentation(query, user.id, sessionParam!)
         return {...slide, picture: image}
      }));  

      //
      let fileName: string;
      let fileType: string;
      let fileSize: number;
      let pptxBufferBase64: string;
      let filePath: string;

      if(themeFunction in functionMapping){ 
        const functionToCall = functionMapping[themeFunction as keyof typeof functionMapping];
          ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await functionToCall(res, photosWithLink) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
     
      }else{
        ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await facetThemePresentation(res, photosWithLink, variant!) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
      }
     
    const pptxBuffer = Buffer.from(pptxBufferBase64, 'base64');

    const [pptxToPdfAndUploadToS3, pptxUpload, presentationData] = await Promise.all([
      adobePPTXToPdf(filePath, user.id,param, themeFunction), 
      uploadToS3(fileName, fileType, fileSize, user.id, param, "aiflavoured",themeFunction),
      storePresentationData(res, param, photosWithLink)
    ]);

    if(pptxUpload && 'awsS3' in pptxUpload){
    const pptxUploadUrl = pptxUpload.awsS3.url;  

    const [pptxRes, message] = await Promise.all([
      fetch(pptxUploadUrl, {
        method: "PUT",
        body: pptxBuffer,
        headers: {'Content-Type': fileType}
      }),
      storeMessage({session : param, message : "Your presentation is ready! Hope you like it", role : 'aiflavoured', timestamp : new Date().toISOString()})
    ]);
    //store the presentation in the vectorstore aftet pptxRes.ok and message?.success
    const responseFromApi = await fetch(`${process.env.WEBSITE_URL}/api/vectorstore`, {
      method: "PUT",
      body: JSON.stringify([{ data: pptxUpload.awsS3.userFile, fileType: fileType }]),                
    })
      //remove the file from output folder
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
      
      if(pptxRes.ok && message?.success && responseFromApi.ok ){
        //  console.log("succes");
        return `/aipresentation/${param}`;
      }
    }
  }catch(e){
  console.log(e)
  }
  } 
}