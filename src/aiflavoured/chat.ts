"use server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { vectorStore } from "./textToEmbeddingAndStore";
import { OpenAIEmbeddings } from "@langchain/openai";
import { BytesOutputParser, StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';



async function combineDocumentsToString(documents: Document[]): Promise<string> {
  return documents.map((doc: any) => doc.pageContent).join(" ");
}

async function oldChatRetriver(session: string){
  const oldChat = "l";

  return oldChat;
}




export const chats = async (message : string) => {

  const retriever = (await vectorStore()).asRetriever({
    k: 12,
    filter: {
      //filter property works and search in metadata column
      file: "6440ca88-90c6-4589-8b25-58c47de7d2ee/1713183358816synopsisofai.pdf",
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
  Try to find the answer only within the context of the document. 
  and try fully explain the answer.
  Do not use any external information. if you don't find the answer say "I dont have enough information to answer the 
  question" and dont give false information and Always speak in friendly behavior.

  
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
      return { standaloneQuestion };
    },
    async ({ standaloneQuestion }) => {
      const retrieverResult = await retriever.getRelevantDocuments(
        standaloneQuestion
      ); 
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
    },

    answerChain,
  ]);

  const response = await chat.stream({ question: message });

  // console.log(response);
  // // const response = await chat.stream({ question: "who is the autho?" });
  // //
  // let aiResponse : string = ''
 
  // return aiResponse;
  return new StreamingTextResponse(response);
};
