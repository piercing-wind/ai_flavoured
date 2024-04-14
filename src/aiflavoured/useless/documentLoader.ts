"use server"
import { S3Loader } from "langchain/document_loaders/web/s3";
import { awsS3Config } from "@/aws/awsS3config";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const loadDocument = async (fileKey: string) => {
//   console.log(fileKey);
      try {
    const loader = new S3Loader({
      bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      key: fileKey, 
      s3Config: {
        region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
        },
      },
      unstructuredAPIURL: "http://localhost:3000/",
      unstructuredAPIKey: "", // this will be soon required
    });
    console.log("file downloaded");
    const docs = await loader.load();

    console.log(docs);
    return docs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
