"use server"
import { awsS3Config } from "@/aws/awsS3config";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { dbq } from "@/db/db"
import * as z from "zod"
import { uploadToUserFileTBSchema } from "@/schemas"
// import {auth} from "@/auth"

const uploadToUserFileTable = async (data: z.infer<typeof uploadToUserFileTBSchema>, generator : string = 'user') => {
  const { fileKey, fileName, userId, url, chatId , fileType } = data;
  try{  
        const res = await dbq('INSERT INTO "UserFile" ("fileKey", "userId", "fileName", "url", "chatId", "fileType" , "generator") VALUES ($1, $2, $3, $4, $5, $6, $7)', [ fileKey, userId,fileName, url, chatId, fileType, generator])
        return res;
      }catch(e){
        console.log(e)
        throw e;
  }
}
const acceptedFileType = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // add more image types if needed
]


export const uploadToS3 = async (fileName : string, fileType : string, fileSize : number, user: string, chatId : string , generator : string) => {
  try {

    // const session = await auth();
    // if (!session || !session.user?.id) {
    //   return {failure : "User not authenticated"}
    // }
    const userId = user;
    if(!acceptedFileType.includes(fileType)){
      return {failure : "File type not supported"}
    }
    const client = await awsS3Config();
    const fileKey = userId.toString() + "/" + Date.now().toString() + fileName.replace(" ", "_");
    
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType :fileType,
      ContentLength : fileSize,
      Metadata:{
        userId : userId,
      }
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 60 }); // URL expires in 60 seconds
    const downloadUrl = await generatePublicFileAccessURL(fileKey);
    
    //upload to user file table in database (postgres)

    const data = { fileKey, fileName, userId, url : downloadUrl, chatId , fileType};
    // Handle validation errors
    const validationResult = uploadToUserFileTBSchema.safeParse(data);
    if (validationResult.success) {
      const resp = await uploadToUserFileTable(data, generator);
      
    } 
    return Promise.resolve({awsS3: {url : signedUrl, data }});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//for public access
export const generatePublicFileAccessURL = async (fileKey: string): Promise<string> => {
  const url =
    "https://" +
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME +
    ".s3." +
    process.env.NEXT_PUBLIC_AWS_S3_REGION +
    ".amazonaws.com/" +
    fileKey;
  return url;
};



export const deleteFromS3 = async (fileKey: string) => {
  const client = await awsS3Config();
  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: fileKey,
  });
  try{
  await client.send(command);
  }catch(e){
    console.error(e)
  }
  return {success : "Deleted Succesfully"}
}


//for private access and public access
// export const generatePrivateFileAccessURL = async (fileKey : string) => {
//   const client = new S3Client({ region: process.env.NEXT_PUBLIC_AWS_S3_REGION });
//   const command = new GetObjectCommand({
//     Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//     Key: fileKey,
//   });

//   const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 }); // URL expires in 1 hour
//   return signedUrl;
// };
