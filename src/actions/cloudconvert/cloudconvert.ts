'use server';
import CloudConvert from 'cloudconvert';
import fs from 'fs';
import path from 'path';
import { uploadToS3 } from '../file/awsS3';

export const pptxToPdf = async (filePath: string, param : string, userId: string): Promise<Object> => {
      const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_PERSONAL_ACCESS_TOKEN!);
      try {
          let job = await cloudConvert.jobs.create({
              tasks: {
                  'import-1': {
                      operation: 'import/upload',
                  },
                  'convert-1': {
                      operation: 'convert',
                      input_format: 'pptx',
                      output_format: 'pdf',
                      engine: 'office',
                      input: [
                          'import-1'
                      ],
                      optimize_print: true,
                      pdf_a: false,
                      include_markup: false,
                      hidden_slides: false,
                      output_type: 'slides',
                      slides_per_handout_page: 1,
                      engine_version: '2.1',
                  },
                  'export-1': {
                      operation: 'export/url',
                      input: [
                          'convert-1'
                      ],
                  }
              },
              tag: 'jobbuilder'
          });
  
          const uploadTask = job.tasks.find(task => task.operation === 'import/upload');
  
          if (!uploadTask) {
              throw new Error('Upload task not found in job');
          }
  
          // Upload the PPTX file from the local directory
          const fileStream = fs.createReadStream(filePath);
          await cloudConvert.tasks.upload(uploadTask, fileStream, path.basename(filePath));
  
          // Wait for the job to complete
          job = await cloudConvert.jobs.wait(job.id);
  
          const exportTask = job.tasks.find(task => task.operation === 'export/url' && task.status === 'finished');
  
          if (!exportTask || !exportTask.result?.files?.length) {
              throw new Error('Export task not completed successfully or no files found');
          }
          console.log('Exported PDF file:', exportTask.result);
          console.log('Exported PDF file:', exportTask.result.files[0]);
          console.log('Exported PDF file:', exportTask.result.files[0].url);
          const file = exportTask.result.files[0];
  
          // Download the converted PDF file
          const response = await fetch(file.url!);
          if (!response.ok) {
              throw new Error(`Failed to download file: ${response.statusText}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const pdfBuffer = Buffer.from(arrayBuffer);
   
          // Upload the PDF to S3
          const uploadTos3 = await uploadToS3(file.filename!, 'application/pdf', pdfBuffer.length, userId ,param, 'aiflavoured')
          if(uploadTos3 && 'awsS3' in uploadTos3){
            const pdfUploadurl =  uploadTos3.awsS3.url;
            const pdfUploadRes = await fetch(pdfUploadurl, {
                  method: "PUT",
                  headers: {'Content-Type': 'application/pdf'},
                  body: pdfBuffer
                  });
                }
                return {succes : "Pdf File uploaded to S3"}
      } catch (error) {
          console.error('Error converting PPTX to PDF:', error);
          return {error : 'Failed to convert PPTX to PDF'}
      }
  };