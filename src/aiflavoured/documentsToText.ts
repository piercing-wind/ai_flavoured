"use server";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import pdfParse from "pdf-parse";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { downloadFileFromS3 } from "@/actions/file/downloadFileFromS3";
import { Readable } from "stream";
import { imgToText } from "./imgs/imgToText";
import { Buffer } from "buffer";
import { getDocument } from "pdfjs-dist";
import { containsImages } from "./imgs/containsImages";
import { textSplitter } from "./textsplitter";

async function callApi() {
  const data = await fetch("http://localhost:3000/api/runpythonscript", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  console.log("Response ", response.message);
}

// convert pdf to text

export const documentToText = async (fileKey: string, userId: string, fileType: string) => {
  const buffer: any = await downloadFileFromS3(fileKey);
  try {
    if (buffer && fileType === "application/pdf") {
      const blob = new Blob([buffer], { type: fileType });

      const loader = new WebPDFLoader(blob,{
        splitPages: true,
        parsedItemSeparator: " ",
      });
      const docs = await loader.load();
      
      await textSplitter(docs, userId, fileKey);
    }
    // throw new Error('Download failed');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
