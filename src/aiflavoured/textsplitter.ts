import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { textToEmbeddingAndStore } from "./textToEmbeddingAndStore";
import { summarize } from "./summarize";
import { summarizer } from "./useless/summarizer";
import { analyzeSummary } from "./useless/analyzeSummary";


// split text into chunks and passing to textToEmbeddingAndStore
export const textSplitter = async (docs: Document[], userId : string, fileKey : string) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 700,
      chunkOverlap: 70,
      separators: [" ", "\n", ". ", "?"],
    });

      // for summarization
      let allText = [];

      //for vectorization
      let output : any = [] 

      //splitting text into chunks
      for (let i = 0; i < docs.length; i++) {
        const result = docs[i].pageContent;
        allText.push(result);
        const splittedText = await splitter.createDocuments([result]);
        splittedText.forEach((doc) => {
          doc.metadata.loc = { ...doc.metadata.loc, pageNumber: i + 1, user : userId, file : fileKey};
          output.push(doc);
        });
      }

      await summarize(allText);
      await textToEmbeddingAndStore(output);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
