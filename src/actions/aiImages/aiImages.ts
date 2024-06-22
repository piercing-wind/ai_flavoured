// 'use server'
// import { db } from "@/lib/db";
// import { Images } from "../userPromptImage/userPromptImage";
// import { Data } from "../userPromptImage/uploadImageToS3";

// export const saveImages = async (images : Data[], session : string) => {
//    try {
//       for (const image of images) {
//          const userPromptImage = await db.aiImages.create({
//             data: {
//                userPromptImageId : session,
//                fileKey: image.fileKey,
//                fileName: image.fileName,
//                url: image.url,
//                fileType: image.fileType,
//                like: image.like,
//                generator: image.generator,
//             },
//          });
//       }
//    return { message: "Images saved successfully" };
//    } catch (e) {
//       throw new Error(e as string);
//    }

// }