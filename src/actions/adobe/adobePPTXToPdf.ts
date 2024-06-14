'use server';
import { PDFServices, CreatePDFParams, ServicePrincipalCredentials, MimeType,CreatePDFJob, CreatePDFResult } from '@adobe/pdfservices-node-sdk';
import log4js from 'log4js';

// log4js.configure({
//    appenders: { out: { type: 'stdout', layout: { type: 'colored' } } },
//    categories: { default: { appenders: ['out'], level: 'error' } }
//  });
 
import fs from 'fs';
import { uploadToS3 } from '../file/awsS3';
import path from 'path';

export const adobePPTXToPdf = async (filePath : string, userId : string, param : string, theme? : string) => {
   try{
      const credentials = new ServicePrincipalCredentials({
         clientId: process.env.ADOBE_PDF_SERVICES_CLIENT_ID!,
         clientSecret: process.env.ADOBE_PDF_SERVICES_CLIENT_SECRET!,
      });
   
      // Creates a PDF Services instance
      const pdfServices = new PDFServices({credentials});
      const readStream = fs.createReadStream(filePath); // Declare and initialize the readStream variable
      const pdfFileName = path.basename(filePath).replace('.pptx', '.pdf');
      const inputAsset = await pdfServices.upload({
         readStream,
         mimeType: MimeType.PPTX
      });

      // Create parameters for the job
      const params = new CreatePDFParams({});
   
 
      // Creates a new job instance
      const job = new CreatePDFJob({ inputAsset, params });

      // Submit the job and get the job result
      const pollingURL = await pdfServices.submit({job});
      const pdfServicesResponse = await pdfServices.getJobResult({
         pollingURL,
         resultType: CreatePDFResult
      });

      // Get content from the resulting asset(s)
      const resultAsset = pdfServicesResponse.result?.asset;
      if(!resultAsset) {return "No asset found in the result";}
      const streamAsset = await pdfServices.getContent({asset: resultAsset});
      const chunks : Buffer[] = [];

      for await (const chunk of streamAsset.readStream) {
        chunks.push(chunk as Buffer);
      }
      const buffer = Buffer.concat(chunks);

      const result = await uploadToS3(pdfFileName, 'application/pdf', buffer.length, userId ,param, 'aiflavoured',theme)
     
      if(result && 'awsS3' in result){
         const pdfUploadurl =  result.awsS3.url;
         const pdfUploadRes = await fetch(pdfUploadurl, {
                  method: "PUT",
                  headers: {'Content-Type': 'application/pdf'},
                  body: buffer
                  });
         if(pdfUploadRes.ok){
            return result.awsS3.userFile.url;
         }
      }
   }catch(error){console.log(error)}
}