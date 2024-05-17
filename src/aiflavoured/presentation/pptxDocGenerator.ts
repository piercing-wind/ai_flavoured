'use server'
import { TokenTextSplitter } from "langchain/text_splitter";
import { documentToText } from "../documentsToText";
import { OpenAI } from "@langchain/openai";
import {promptForPPTXSummary} from './promptsForPresentation'
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const pptxDocGenerator = async ( model: string = 'gpt-3.5-turbo-0125') => {
  
  //tem
  const fileKey ='9091f25c-e489-47ca-9815-ccb689fc20c4/1715241743402REPORT.pdf'
  const userId = '9091f25c-e489-47ca-9815-ccb689fc20c4'
  const fileType = 'application/pdf'
  //tem end
   const docs = await documentToText(fileKey, userId, fileType);    

  const document = [];
  
  let chunkSize : number;
  let words : number;

  switch (model) {
      case 'gpt-4o':
          chunkSize = 124000;
          words = 96000;
          break;
      case 'gpt-3.5-turbo-0125':
          chunkSize = 16000;
          words = 12000;
          break;
      // Add more cases as needed
      default:
          chunkSize = 16000; // Default value
          words = 12000;
  }
  for (let i = 0; i < docs.length; i++) {
    const result = docs[i].pageContent;
    document.push(result);
  }
  const splitter = new TokenTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: 300,
  });

  const fullDocument = document.join(" ");
  const doc = await splitter.createDocuments([fullDocument]);
  
  if (doc.length === 1) {
        return doc[0].pageContent;
      }
 try{
     const summaryResult = [];

     const summaryLengthDecider = Math.ceil(words/doc.length).toString();
      
     const llm = new OpenAI({     
         openAIApiKey: process.env.OPENAI_API_KEY,
         modelName: model,
         temperature: 0,
         streaming: true,
        });
        const PPTXSummaryPrompt =  PromptTemplate.fromTemplate(promptForPPTXSummary);

        const summaryChain = PPTXSummaryPrompt.pipe(llm).pipe(new StringOutputParser());
        
        for (let i = 0; i < doc.length; i++) {
            const summary = await summaryChain.invoke({
                document: doc[i].pageContent,
                words: summaryLengthDecider,
            });
            summaryResult.push(summary);
        }
//   console.log(summaryResult.join(" "));    
  return summaryResult.join(" ");
}catch(e){
  console.log(e)
}
};