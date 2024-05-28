'use server'
import { TokenTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "@langchain/openai";
import {promptForPPTXSummary} from './promptsForPresentation'
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { DOMCanvasFactory } from "pdfjs-dist/types/src/display/display_utils";

export const pptxDocGenerator = async ( model: string = 'gpt-3.5-turbo-0125', docs : string[]): Promise<string> => {
  // //tem
  // const fileKey ='9091f25c-e489-47ca-9815-ccb689fc20c4/1715241743402REPORT.pdf'
  // const userId = '9091f25c-e489-47ca-9815-ccb689fc20c4'
  // const fileType = 'application/pdf'
  // //tem end
  // //  const docs = await documentToText(fileKey, userId, fileType);    
  const summaryResult = [];
  
  let chunkSize : number;
  let words : number;

  switch (model) {
      case 'gpt-4o':
          chunkSize = 124000;
          words = 96000;
          break;
      case 'gpt-4':
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
  const splitter = new TokenTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: 300,
  });
  
  const fullDoc = docs.join(" ");
  const doc = await splitter.createDocuments([fullDoc]);
  
  if (doc.length === 1) {
        return doc[0].pageContent.toString();
      }
 try{

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
}catch(e){
  console.log(e)
}
return summaryResult.join(" ");
};