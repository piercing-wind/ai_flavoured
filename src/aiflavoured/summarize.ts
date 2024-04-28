import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { 
  summarizationPromptTemplate, 
  summaryRefinePromptTemplate,
  summaryTemplate1,
  summaryRefineTemplate2
} from "./prompts";


export const summarize = async (docs: any) => {

  const documents = []; //temprary storage for documents

  // Loop through the documents and store the page content in the documents array
  for (let i = 0; i < docs.length; i++) {
    const result = docs[i].pageContent;
    documents.push(result);
  }

  // Split text into chunks only for summarizations
  const splitter = new TokenTextSplitter({
    chunkSize: 16000,
    chunkOverlap: 300,
  });

  // Join all the documents into a single string
  const combineDocs = documents.join(" ");

  // Split the documents into chunks
  const docSummary = await splitter.createDocuments([combineDocs]);
  
  // llm model
  const llmSummary = new OpenAI({
    modelName: "gpt-3.5-turbo-0125",
    temperature: 0.1,
    streaming: true,
  });


  const summaryPrompt = PromptTemplate.fromTemplate(summarizationPromptTemplate);

  const summaryRefinePrompt = PromptTemplate.fromTemplate(summaryRefinePromptTemplate);
  
  const summarizeChain = loadSummarizationChain(llmSummary, {
    type: "refine",
    questionPrompt: summaryPrompt,
    refinePrompt: summaryRefinePrompt,
    refineLLM: llmSummary,
  });

  
for await (const chunk of await summarizeChain.stream({ input_documents: docSummary })) {
  console.log(chunk.output_text);
}
 
};