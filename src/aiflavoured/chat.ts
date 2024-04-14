"use server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { dbq } from "@/db/db";
import { vectorStore } from "./textToEmbeddingAndStore";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { _decodeChunks } from "openai/streaming.mjs";


async function combineDocumentsToString(documents: any[][]): Promise<string> {
  return documents.map((docArray: any[]) => {
    const doc = docArray[0];
    return doc.pageContent;
  }).join(" ");
}

export const chats = async () => {

  const retriever = (await vectorStore());

  const openAIKey = process.env.OPENAI_API_KEY;
  
  const openaiModel = "gpt-3.5-turbo-0125";
  //for standalone questions
  const llm2 = new ChatOpenAI({
    openAIApiKey: openAIKey,
    temperature: 0,
    modelName: openaiModel,
  });

  //for answers
  const llm = new ChatOpenAI({
    openAIApiKey: openAIKey,
    temperature: 1.5,
    modelName: openaiModel,
  });

  const embedding = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "text-embedding-3-large",
  });

  //standalone question template rele
  const standaloneQuestionTemplate = `
  Generate a relevant standalone question from the following user question: '{question}'
  do not include any external information in the question.
`;
    //answer template
  const answerTemplate = `You are helpful assistant who can answer questions based on the context provided to you.
  carefully look into the documents before answering the question.
  Try to find the answer only within the context of the document. 
  Do not use any external information. if you don't find the answer say "I dont have enough information to answer the 
  question" and Always speak in friendly behavior.
  
  documents : {context}
  
  Question: {question}
  
  answer :
  `;
  
  //prompting templates
  const standaloneQuestion = PromptTemplate.fromTemplate(standaloneQuestionTemplate);
  
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  //chains
  const standaloneQuestionChain =  standaloneQuestion.pipe(llm2).pipe(new StringOutputParser()) ;
  
  // const retrieverChain = RunnableSequence.from([
  //   prevResult => prevResult.standalone_question,
  //   retriever,
  //   outputDocumentCombiner
  // ]);
  const retrieverChain = RunnableSequence.from([
    prevResult => {
      const standaloneQuestion = prevResult.standalone_question;
      console.log(standaloneQuestion);
      return { standaloneQuestion };
    },
    async ({standaloneQuestion}) => {
      const retrieverResult = await retriever.similaritySearchWithScore(standaloneQuestion, 12); //12 for better result
      console.log(retrieverResult)
      return { retrieverResult };
    },
    async result => await combineDocumentsToString(result.retrieverResult),

  ]);
  //main chain
  const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

  const chat = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({original_input}) => original_input.question,
    },
    answerChain,
  ]);

  const response = await chat.invoke({ question: "Provide a consise summary of whole document" });
  console.log(response);
  // const response = await chat.stream({ question: "who is the autho?" });
// 
  // for await (const chunk of response) {
    // console.log(chunk);
  // }
  
  

};
