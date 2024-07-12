import { awsS3Config } from "@/aws/awsS3config";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

export type DataAudio = {
  id: string;
  fileKey: string;
  fileName: string;
  url: string;
  fileType: string;
};

// model userPromptAudio {
//    id String @id @default(cuid())
//    userId String
//    session String
//    prompt  String
//    audioUrl    String
//    fileName String
//    fileKey String
//    fileType String
//    createdAt DateTime @default(now())
//    updatedAt DateTime @updatedAt
// }

export const uploadAudioToS3 = async (
  fileName: string,
  fileType: string,
  fileSize: number,
  userId: string
): Promise<{ awsS3: { url: string; data: DataAudio } }> => {
  try {
    const client = await awsS3Config();
    const fileKey =
      "Userdata/" +
      userId.toString() +
      "/" +
      Date.now().toString() +
      fileName.replace(" ", "_");
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
      ContentLength: fileSize,
      ContentDisposition: `attachment; filename="${fileName}"`,
      Metadata: {
        userId: userId,
      },
    });

    const [signedUrl, downloadUrl] = await Promise.all([
      getSignedUrl(client, command, { expiresIn: 120 }),
      generatePublicFileAccessURL(fileKey),
    ]);

    const data: DataAudio = {
      fileKey,
      fileName,
      fileType,
      url: downloadUrl,
      id: uuidv4(),
    };
    // Handle validation errors

    return Promise.resolve({ awsS3: { url: signedUrl, data } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//for public access
export const generatePublicFileAccessURL = async (
  fileKey: string
): Promise<string> => {
  const url = process.env.CLOUDFRONT_URL_AWS + "/" + fileKey;
  return url;
};
