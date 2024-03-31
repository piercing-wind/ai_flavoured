"use server"
import { S3Client } from "@aws-sdk/client-s3";

export const awsS3Config = async () => {
  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
    },
  });
  return client;
};