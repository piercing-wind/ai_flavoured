"use server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { OpenAI } from "@langchain/openai";
// import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import {dataDoc , finalSlideTemplate, slidePrompt} from './scracth'

import { LLMChain, RefineDocumentsChain, loadSummarizationChain } from "langchain/chains";
import { Input } from "@/components/ui/input";

export const getSlidesDataFromAi2 = async (docs?: any, aiModel?: string) => {
  console.log("received text from docs and generating summary");
  const splitter = new TokenTextSplitter({
    chunkSize: 16000,
    chunkOverlap: 300,
  });
  const docSummary = await splitter.createDocuments([dataDoc]);

  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    temperature: 0.1,
    streaming: true,
  });
  const verbose = false;

  // const slideChain = slidePrompt.pipe(llm).pipe(new StringOutputParser());
  
  // const slide = RunnableSequence.from([
  //   {
  //     input : new RunnablePassthrough(),
  //   },
  //   {
  //     context : ({input}) => input.context,
  //     numberOfSlides : ({input}) => input.numberOfSlides,
  //     userPrompt : ({input}) => input.userPrompt,  
  //   },
  //   slideChain,
  // ])

  const llmChain = new LLMChain({ prompt: slidePrompt, llm, verbose });

  const refineLLMChain = new LLMChain({
    prompt: finalSlideTemplate,
    llm: llm,
    verbose,
  });
  const chain = new RefineDocumentsChain({
    llmChain,
    refineLLMChain,
    documentVariableName: "text",
    verbose,
  });

  const  res = await chain.invoke({ input_documents : docSummary });

  return res.output_text;

};
