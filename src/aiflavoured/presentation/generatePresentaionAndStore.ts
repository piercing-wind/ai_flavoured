'use server';
import { createChatSession } from "@/actions/chat/chatSession";
import { PresentaionData, presentation } from "./themes/presentation";
import { uploadToS3 } from "@/actions/file/awsS3";
import { storeMessage } from "@/actions/chat/messages";
import * as z from "zod"
import { presentationSchema } from "@/schemas";
import { facetThemePresentation } from "./themes/facetThemePresentation";
import { ppPartyThemePresentation } from "./themes/ppPartyThemePresentation";
import { minimalistSalePitchThemePresentation } from "./themes/minimalistSalePitchThemePresentation";
import { biomePresentationTheme } from "./themes/biomePresentationTheme";
import { darkThemeMoonPresentation } from "./themes/darkThemeMoonPresentation";
import { scientificBluePresentationTheme } from "./themes/scientificBluePresentationTheme";

export const generatePresentaionAndStore = async ( data : z.infer<typeof presentationSchema>, sessionParam?: string) => {
      const {selectedFiles, user, slides, wordsAmount, audience, imageSearch, ppmodel, waterMark , variant, textInputValue, themeFunction} = data;
      console.log("f" ,selectedFiles)
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
    const functionMapping = {
      'scientificBluePresentationTheme': scientificBluePresentationTheme,
      // 'facetThemePresentation': facetThemePresentation,
      'ppPartyThemePresentation': ppPartyThemePresentation,
      'darkThemeMoonPresentation': darkThemeMoonPresentation,
      'minimalistSalePitchThemePresentation': minimalistSalePitchThemePresentation,
      'biomePresentationTheme': biomePresentationTheme,
    };
    const data : PresentaionData = await response.json();

      let fileName: string;
      let fileType: string;
      let fileSize: number;
      let pptxBufferBase64: string;
      let filePath: string;


      if(themeFunction in functionMapping){
        const functionToCall = functionMapping[themeFunction as keyof typeof functionMapping];
          ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await functionToCall(data) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
     
      }else{
        ({fileName, fileType , fileSize, pptxBufferBase64, filePath} = await facetThemePresentation(data, variant!) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string, filePath: string});
      }
     
    const pptxBuffer = Buffer.from(pptxBufferBase64, 'base64');
    
    const param = sessionParam ? sessionParam : await createChatSession(user.id,fileName);
    try{
      const [pdfRes, pptxUpload] = await Promise.all([
       fetch('/api/runpythonscript', {
         method: "POST",
         body: JSON.stringify({
          respptxPath: filePath,
        })
       }),
        //////////////////////////////////////////////////////////Generator /

       uploadToS3(fileName, fileType, fileSize, user.id, param, "aiflavoured")
       ])

       
       if (pptxUpload && 'awsS3' in pptxUpload && pdfRes.ok){
         const pptxUploadUrl = pptxUpload.awsS3.url;

         const res = await pdfRes.json();
         const pdfBuffer = Buffer.from(res.pdfBase64, 'base64');
         const pdfUploadurlData  = await uploadToS3(fileName.replace(".pptx", ".pdf"), "application/pdf", pdfBuffer.length, user.id, param, "aiflavoured");
        
         if(pdfUploadurlData && 'awsS3' in pdfUploadurlData){
          
        const pdfUploadurl =  pdfUploadurlData.awsS3.url;

        const [pptxRes, pdfUploadRes ,message] = await Promise.all([
          fetch(pptxUploadUrl, {
            method: "PUT",
            body: pptxBuffer,
            headers: {'Content-Type': fileType}
          }),
           fetch(pdfUploadurl, {
            method: "PUT",
            headers: {'Content-Type': 'application/pdf'},
            body: pdfBuffer
          }),
          storeMessage({chatId : param, message : "Your presentation is ready! Hope you like it", role : 'aiflavoured', timestamp : new Date().toISOString()})
        ]);
      
   
        const responseFromApi = await fetch("/api/vectorstore", {
         method: "PUT",
         body: JSON.stringify([{ data: pptxUpload.awsS3.userFile, fileType: fileType }]),
       });
   
        if(pptxRes.ok && message?.success && responseFromApi.ok && pdfUploadRes.ok){
         //  console.log("succes");
         return `/x/aipresentation/${param}`;
        }
      }
   }

    }catch(e){
      console.log("Eoor in comnversion",e)
    }
  } 
}