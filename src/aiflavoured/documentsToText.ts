"use server";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { downloadFileFromS3 } from "@/actions/file/downloadFileFromS3";


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

export const documentToText = async (fileKey: string, userId: string, fileType: string): Promise<any> => {
  const buffer: any = await downloadFileFromS3(fileKey);
  try {
    if (buffer && fileType === "application/pdf") {
      const blob = new Blob([buffer], { type: fileType });

      const loader = new WebPDFLoader(blob,{
        splitPages: true,
        parsedItemSeparator: " ",
      });
      const docs = await loader.load();
      return docs;
    }
    // // throw new Error('Download failed');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
