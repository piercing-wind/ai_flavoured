'use server'

import { adobePPTXToPdf } from "@/actions/adobe/adobePPTXToPdf";
import { PresentationImage } from "../generatePresentaionAndStore";
import { biomePresentationTheme } from "./biomePresentationTheme";
import { darkThemeMoonPresentation } from "./darkThemeMoonPresentation";
import { facetThemePresentation } from "./facetThemePresentation";
import { minimalistSalePitchThemePresentation } from "./minimalistSalePitchThemePresentation";
import { ppPartyThemePresentation } from "./ppPartyThemePresentation";
import { PresentationData } from "./presentation";
import { scientificBluePresentationTheme } from "./scientificBluePresentationTheme";
import { uploadToS3 } from "@/actions/file/awsS3";
import fs from 'fs';


export const themeChange = async (pptx : PresentationData, photosWithLink: PresentationImage, theme: string, variant: string , session : string, userId : string) : Promise<{pdfUrl : string, pptxUrl : string}> => {
   try{
   const functionMapping = {
      'scientificBluePresentationTheme': scientificBluePresentationTheme,
      'ppPartyThemePresentation': ppPartyThemePresentation,
      'darkThemeMoonPresentation': darkThemeMoonPresentation,
      'minimalistSalePitchThemePresentation': minimalistSalePitchThemePresentation,
      'biomePresentationTheme': biomePresentationTheme,
    };

    let fileName: string;
    let fileType: string;
    let fileSize: number;
    let pptxBufferBase64: string;
    let filePath: string;

    if(theme in functionMapping){ 
      const functionToCall = functionMapping[theme as keyof typeof functionMapping];
        ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await functionToCall(pptx, photosWithLink) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
   
    }else{
      ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await facetThemePresentation(pptx, photosWithLink, variant!) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
    }

    const [pptxToPdfAndUploadToS3, pptxUpload] = await Promise.all([
      adobePPTXToPdf(filePath, userId,session, theme), 
      uploadToS3(fileName, fileType, fileSize, userId, session, "aiflavoured",theme),
    ]);

    if(!pptxUpload || !('awsS3' in pptxUpload)){
      throw new Error ("Error in uploading pptx file to cloud!");   
      }
      const pptxUploadUrl = pptxUpload.awsS3.url;  
      const pptxBuffer = Buffer.from(pptxBufferBase64, 'base64');
      const [pptxRes] = await Promise.all([
        fetch(pptxUploadUrl, {
          method: "PUT",
          body: pptxBuffer,
          headers: {'Content-Type': fileType}
        }),
      ]);
        //remove the file from output folder
        fs.unlink(filePath, (err) => {
          if (err) throw err;
        });
     
      return {pdfUrl : pptxToPdfAndUploadToS3!, pptxUrl: pptxUpload.awsS3.userFile.url};
   }catch(e){
      throw new Error((e as Error).message);
   }
      
}