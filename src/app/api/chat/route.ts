// import { chats } from "@/aiflavoured/chat";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { vectorStore } from "@/aiflavoured/textToEmbeddingAndStore";
import { OpenAIEmbeddings } from "@langchain/openai";
import { dbq } from "@/db/db";
import { StringOutputParser, BytesOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { _decodeChunks } from "openai/streaming.mjs";
import { combineDocumentsToString } from "./combineDocumentsToString";
import {uploadFileCore} from "./uploadFileCore"


export async function PUT(req:Request){
  const body = await req.json();
  // console.log(body);
  // const uploadedFiles = body.uploadedFiles;
  console.log("from route", body);
  for (const file of body) {  
    console.log("from loop", file); 
      const userId = file.data.userId;
      const fileKey = file.data.fileKey;
      const fileName = file.data.fileName;
      const chatId = file.data.chatId;
      const fileType = file.fileType;

      console.log("from route", fileName);
      try{
        
        await uploadFileCore(userId, fileKey, fileName, fileType, chatId); 

      }catch(e){
        console.log(e);
        return Response.json({message: "error"});
      }
    }
    return Response.json({message: "success"});
} 
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};


export async function POST(req:NextRequest){

  const body = await req.json();
  const messages = body.message
  const chatId = body.chatId;
  // s ?? [];
  // console.log("Messages",messages)
  // const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  // console.log("Formatted Message",formattedPreviousMessages);
  // const currentMessageContent = messages[messages.length - 1].content;
  // console.log("Current Message",currentMessageContent);

  const retriever = (await vectorStore()).asRetriever({
    k: 12,
    filter: {
      //filter property works and search in metadata column
      sessionId: chatId,
      //do not use file base, use the paticular chat session id
    },
  });

  const openAIKey = process.env.OPENAI_API_KEY;
  const openaiModel = "gpt-3.5-turbo-0125";

  
  // const retriever2 = ScoreThresholdRetriever.fromVectorStore(retriever, {
  //   minSimilarityScore: 0.5, // Finds results with at least this similarity score
  //   maxK: 20, // The maximum K value to use. Use it based to your chunk size to make sure you don't run out of tokens
  //   kIncrement: 10, // How much to increase K by each time. It'll fetch N results, then N + kIncrement, then N + kIncrement * 2, etc.
  // });

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
    streaming: true,  
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
  Try to find the answer only within the context of 
  the document. and try fully explain the answer. Do not use any external information. if you don't find the answer 
  say "I dont have enough information to answer the question" and dont give false information and Always speak in friendly behavior.

  
  documents : {context}
  
  Question: {question}
  
  answer :
  `;

  //prompting templates
  const standaloneQuestion = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  //chains
  const standaloneQuestionChain = standaloneQuestion
    .pipe(llm2)
    .pipe(new StringOutputParser());

  // const retrieverChain = RunnableSequence.from([
  //   prevResult => prevResult.standalone_question,
  //   retriever,
  //   outputDocumentCombiner
  // ]);

  const retrieverChain = RunnableSequence.from([
    (prevResult) => {
      const standaloneQuestion = prevResult.standalone_question;
      console.log(standaloneQuestion);
      return { standaloneQuestion };
    },
    async ({ standaloneQuestion }) => {
      const retrieverResult = await retriever.getRelevantDocuments(
        standaloneQuestion
      ); //12 for better result
      // console.log(retrieverResult);
      return { retrieverResult };
    },
    async (result) => await combineDocumentsToString(result.retrieverResult),
  ]);
  //main chain
  const answerChain = answerPrompt.pipe(llm2).pipe(new BytesOutputParser());

  const chat = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      // chat_history: ({ original_input }) => original_input.chat_history,
    },

    answerChain,
  ]);

  const response = await chat.stream(
    {
      // chat_history: formattedPreviousMessages.join('\n'), 
      question: messages, 
    }
  );
  
  return new StreamingTextResponse(response);
}