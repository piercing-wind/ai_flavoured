import { createChatSession } from "@/actions/chat/chatSession";
import { PresentaionData, presentation } from "./presentation";
import { uploadToS3 } from "@/actions/file/awsS3";
import { storeMessage } from "@/actions/chat/messages";
import * as z from "zod"
import { presentationSchema } from "@/schemas";

export const generatePresentaionAndStore = async ( data : z.infer<typeof presentationSchema>) => {
      const {selectedFiles, user, slides, wordsAmount, audience, imageSearch, model , aiModel} = data;
      const response = await fetch("/api/createaipresentation", {
            method: "POST",
            body: JSON.stringify({ 
           files: selectedFiles,
           aiModel: aiModel,
           userId: user.id,
           author: user.name,
           numberOfSlides: slides.toString(),
           wordsAmount: wordsAmount,
           audience: audience,
           imageSearch: imageSearch,
           modelForColorAndTitle:model
         }),
       })
  if(response.ok){
   //presentation data needs to be stored in database |
    const data : PresentaionData = await response.json();
    const {fileName, fileType , fileSize, pptxBufferBase64} = await presentation(data) as {fileName: string, fileType: string, fileSize: number, pptxBufferBase64: string};
    const pptxBuffer = Buffer.from(pptxBufferBase64, 'base64');
    const param = await createChatSession(user.id,fileName);

    const [pdfRes, pptxUpload] = await Promise.all([
     fetch('/api/pptxtopdf', {
       method: "POST",
       body: JSON.stringify({
        pptxBufferBase64,
        param,
        fileName,
        userId: user.id
      })
     }),
     uploadToS3(fileName, fileType, fileSize, user.id, param, "aiflavoured")
     ])

    if ('awsS3' in pptxUpload && pdfRes.ok){
     const pptxUploadUrl = pptxUpload.awsS3.url;
     const [pptxRes, message] = await Promise.all([
       fetch(pptxUploadUrl, {
         method: "PUT",
         body: pptxBuffer,
         headers: {'Content-Type': fileType}
       }),
       storeMessage({chatId : param, message : "Your presentation is ready! Hope you like it", role : 'aiflavoured', timestamp : new Date().toISOString()})
     ]);

     const responseFromApi = await fetch("/api/vectorstore", {
      method: "PUT",
      body: JSON.stringify([{ data: pptxUpload.awsS3.data, fileType: fileType }]),
    });

     if(pptxRes.ok && message?.success && responseFromApi.ok){
      //  console.log("succes");
      return `/aipresentation/${param}`;
     }
      }
 } 
}