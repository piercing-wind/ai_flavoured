"use server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { slidePrompt, refineOutput } from "./promptsForPresentation";
export const aiSlides = async (model : string = 'gpt-4o', numOfSlides : string = '10', docsData : string) => {
  console.log("working on it...");
  try{
      
      const llm = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.2,
        modelName: model,
      });

      const llm2 = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
            modelName: model,
      });
      
      const slidesPrompt = PromptTemplate.fromTemplate(slidePrompt);
      const refineOutputPrompt = PromptTemplate.fromTemplate(refineOutput);

      const slidesChain = slidesPrompt.pipe(llm).pipe(new StringOutputParser());
      
      const slides = await slidesChain.invoke({
            numberOfSlides: numOfSlides,
            document: docsData,
      });
      const refineOutputChain = refineOutputPrompt.pipe(llm2).pipe(new StringOutputParser());

      const refinedSlides = await refineOutputChain.invoke({
            slides: slides,
      });


      console.log(refinedSlides);
      return refinedSlides;
      }catch(e){
            console.log(e);
      }
};
