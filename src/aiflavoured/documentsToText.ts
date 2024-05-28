"use server";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { downloadFileFromS3 } from "@/actions/file/downloadFileFromS3";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx";
import { imgToText } from "./imgs/imgToText";

// async function callApi() {
//   const data = await fetch("http://localhost:3000/api/runpythonscript", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const response = await data.json();
//   console.log("Response ", response.message);
// }

// convert pdf to text

export const documentToText = async (fileKey: string, userId: string = "", fileType: string): Promise<any> => {
  const buffer: Buffer = await downloadFileFromS3(fileKey);
  try {
    if (buffer) {
      const blob = new Blob([buffer], { type: fileType });
      switch (fileType) {
        case "application/pdf":
          const pdfLoader = new WebPDFLoader(blob,{
            splitPages: true,
            parsedItemSeparator: " ",
          });
          const pdfDocs = await pdfLoader.load();
          return pdfDocs;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          const pptxLoader = new PPTXLoader(blob);
          const pptxDocs = await pptxLoader.load();
          return pptxDocs;

        case "image/png":
        case "image/jpeg":
          await imgToText(fileKey, fileType);
        default:
          return "";
      }

    }
    // // throw new Error('Download failed');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
