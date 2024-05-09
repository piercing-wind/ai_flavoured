"use server";

import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

export const getNumberOfPages = async (fileBlob: any, fileType: string): Promise<number> => {
  try {
    if (fileBlob && fileType === "application/pdf") {
      const loader = new WebPDFLoader(fileBlob, {
        splitPages: true,
        parsedItemSeparator: " ",
      });
      const docs = await loader.load();
      return docs.length;
    }

    throw new Error("Invalid file type or file object.");
  } catch (error) {
    console.log(error);
    throw error;
  }
};