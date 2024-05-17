"use server";
import { PromptTemplate } from "@langchain/core/prompts";

import { OpenAI } from "@langchain/openai";
// import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import {dataDoc} from './scracth'

import { loadSummarizationChain } from "langchain/chains";
import {
  RefinePromptTemplate,
  questionPromptTemplate,
} from "../promptsForPresentation";

export const getSlidesDataFromAi = async (docs?: any, aiModel?: string) => {
  console.log("received text from docs and generating summary");
  const documents = []; //temprary storage for documents


  // Split text into chunks only for summarizations
  const splitter = new TokenTextSplitter({
    chunkSize: 16000,
    chunkOverlap: 300,
  });

  const combineDocs = dataDoc;

  
  // Split the documents into chunks
  const docText = await splitter.createDocuments([combineDocs]);
  // llm model
  const llmSummary = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.1,
    streaming: true,
  });

  const questionPrompt = PromptTemplate.fromTemplate(
    questionPromptTemplate
  );
  const refinePrompt = PromptTemplate.fromTemplate(
    RefinePromptTemplate
  );

  const summarizeChain = loadSummarizationChain(llmSummary, {
    type: "refine",
    refinePrompt: refinePrompt,
    questionPrompt: questionPrompt,
    refineLLM: llmSummary,
  });

  const summary = await summarizeChain.invoke({ input_documents: docText });
  console.log(summary);
  return summary.output_text;
};
