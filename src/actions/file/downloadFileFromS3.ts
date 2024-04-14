import { awsS3Config } from "@/aws/awsS3config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";


export const downloadFileFromS3 = async (fileKey: string) => {
  try {
    const client = await awsS3Config();

    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: fileKey,
    });

    const response = await client.send(command);
    if (!response || !response.Body) {
      throw new Error("File not found");
    } 
    const chunks = [];
    for await (const chunk of response.Body as Readable) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
  
    return buffer;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
