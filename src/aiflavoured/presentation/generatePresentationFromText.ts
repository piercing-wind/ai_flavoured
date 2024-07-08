import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { promptForTextToPresentation } from "./promptsForPresentation";
import { MdTopic } from "react-icons/md";

export const textToPresentationContent = async (model: string, audience: string, wording: string, userPrompt: string,): Promise<string> => {
   try {
      const llm = new ChatOpenAI({
         openAIApiKey: process.env.OPENAI_API_KEY,
         temperature: 1,
         modelName: model,
       });

       const slidesPrompt = PromptTemplate.fromTemplate(promptForTextToPresentation);
       const slidesChain = slidesPrompt.pipe(llm).pipe(new StringOutputParser());
       const topic = await slidesChain.invoke({
         userPrompt: userPrompt,
         wording : wording,
         audience : audience,
   });

   return topic;
   } catch (e) {
      throw (e as Error).message;
   }
}