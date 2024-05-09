import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

// split text into chunks and passing to textToEmbeddingAndStore
export const textSplitter = async (docs: Document[], userId : string, chatSession : string) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
      separators: [" ", "\n", ". ", "?"],
    });
      //for vectorization
      let splittedDocuments : any = [] 

      //splitting text into chunks
      for (let i = 0; i < docs.length; i++) {
        const result = docs[i].pageContent;
        const splittedText = await splitter.createDocuments([result]);
        splittedText.forEach((doc) => {
          doc.metadata = { ...doc.metadata, pageNumber: i + 1, user : userId, sessionId : chatSession};
          splittedDocuments.push(doc);
        });
      }
      return splittedDocuments;    
  } catch (error) {
    console.log(error);
    throw error;
  }
};
