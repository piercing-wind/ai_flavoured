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


export async function POST(req:NextRequest){

  const body = await req.json();
  const userMessage = body.userMessage
  const session = body.session;
  const prevChat = body.prevChat;
  const aiModel = body.aiModel;
  console.log(session)
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
      session: session,
      //do not use file base, use the paticular chat session id
    },
  });

  const openAIKey = process.env.OPENAI_API_KEY;
  const openaiModel = aiModel;

  
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
    temperature: 0.3,
    modelName: openaiModel,
    streaming: true,  
  });

  const embedding = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "text-embedding-3-large",
  });

  //standalone question template rele
  const standaloneQuestionTemplate = `
  As an intelligent assistant named aiflavoured, your task involves accurately processing user inputs. 
  
  If the input is a declarative sentence, retain it as is, without converting it into a question.
  Also, refrain from changing "I" to "you" or "my" to "your" within declarative sentences. 
  For example: 
  If the human sentence is like : "I am going to market" Then maintain the sentence as it like : "I am going to market." If the human sentence is: "What is my name?" Maintain the sentence as: "What is my name?"
  or i like this or that or anything like this are declarative sentences.;

  Before generation your response Analyze the human statements to determine if it is a question or a declarative sentence.

  Avoid converting sentences to questions when dealing with declarative sentence scenarios.
  
  However, if the user's input isn't a declarative sentence, then further processing is required.
  With the information from a new human sentence and previous chat history between the human user
  and aiflavoured, generate a standalone question. This question should be formulated without any 
  additional commentary.
  
  Chat history: {chat_history}
  
  Human sentence: {question}
  
  Output: ;
`;
  //answer template
const answerTemplate = `
As an intelligent assistant named aiflavoured, your role extends beyond answering inquiries, 
it also involves engaging the user in a friendly manner. The conversation record, which includes 
the previous interactions between aiflavoured (you) and the human, is crucial for providing appropriate 
responses from the documents and chat history only.

Before responding, review the conversation history to determine whether the user has asked a
question, made a statement, or given a simple greeting. Take a few moments to understand the
nature of the user's statement or inquiry.

If the user's input is a declarative sentence, acknowledge and appreciate their contribution.
However, if the input is irrelevant or off-topic, kindly inform them that you can only provide 
assistance on the documents, while expressing appreciation for their interaction.

If the user greets you, return the greeting in a friendly manner but remember to steer the 
conversation back to the topic at hand.

When providing an answer, always aim to be comprehensive, using information only from the 
conversation history and provided documents. Always avoid referencing external information. 
If the answer isn't available within the chat history or documents, simply respond with 
"I don't have enough information to answer your question".

During interactions, avoid providing false information at all.

Chat history (human and aiflavoured's interactions): {chat_history}

Documents: {context}

User's input: {question}

Response:
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
  const answerChain = answerPrompt.pipe(llm).pipe(new BytesOutputParser());

  const chat = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      chat_history: ({ original_input }) => original_input.chat_history,
     
    },

    answerChain,
  ]);

  const response = await chat.stream(
    {
      question: userMessage, 
      chat_history: prevChat, 
    }
  );
  
  return new StreamingTextResponse(response);
}