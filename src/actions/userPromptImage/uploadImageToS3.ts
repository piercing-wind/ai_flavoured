import { awsS3Config } from "@/aws/awsS3config";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';


export type Data = {
   id : string;
   fileKey: string;
   fileName: string;
   url: string;
   fileType: string;
   generator: 'user' | 'aiflavoured';
   like: boolean | null;
   upscaled: boolean | null;
   imageModel : 'sdxl' | 'dalle'
   };


export const uploadImageToS3 = async (fileName : string, fileType : string, fileSize : number, userId: string, imageModel : 'sdxl' | 'dalle', upscaled:boolean | null = null) : Promise<{awsS3 : {url : string, data : Data}}> => {
   try {
     const client = await awsS3Config();
     const fileKey = 'Userdata/' + userId.toString() + "/" + Date.now().toString() + fileName.replace(" ", "_");
     const command = new PutObjectCommand({
       Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
       Key: fileKey,
       ContentType :fileType,
       ContentLength : fileSize,
       ContentDisposition: `attachment; filename="${fileName}"`,
       Metadata:{
         userId : userId,
       }
     });
 
     const [signedUrl, downloadUrl] = await Promise.all([
       getSignedUrl(client, command, { expiresIn: 120 }), 
       generatePublicFileAccessURL(fileKey)
     ])
     
 
     const data : Data = { fileKey, fileName, fileType, url : downloadUrl, generator : 'user', like : null, id: uuidv4(), upscaled, imageModel};
     // Handle validation errors

 
     return Promise.resolve({awsS3: {url : signedUrl, data }});
   } catch (error) {
     console.log(error);
     throw error;
   }
 };
 
 //for public access
 export const generatePublicFileAccessURL = async (fileKey: string): Promise<string> => {
   const url = process.env.CLOUDFRONT_URL_AWS + '/' + fileKey;
   return url;
 };
 