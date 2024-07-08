"use server";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { downloadFileFromS3 } from "@/actions/file/downloadFileFromS3";
import { PPTXLoader } from "langchain/document_loaders/fs/pptx";
import { imgToText } from "./imgs/imgToText";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "langchain/document_loaders/fs/docx";


export const documentToText = async (fileKey: string, fileType: string, userId: string = ""): Promise<any> => {
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
        case "text/plain":
            const textLoader = new TextLoader(blob);
            const textDocs = await textLoader.load();
            return textDocs;  
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            const docxLoader = new DocxLoader(blob);
            const docxDocs = await docxLoader.load();
            return docxDocs;  
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
