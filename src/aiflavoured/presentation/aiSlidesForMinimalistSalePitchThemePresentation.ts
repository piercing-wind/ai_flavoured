"use server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { promptForFacetSlides, promptForFacetSlidesRefinement, promptForMinimalistSalePitchSlides, promptForMinimalistSalePitchSlidesRefinement } from "./promptsForPresentation";

export const aiSlidesForMinimalistSalePitchThemePresentation = async (model : string = 'gpt-4o', numOfSlides : string = '10', docsData : string, audience : string, wording : string, userPrompt : string) :Promise<string> => {

  const slidesInterfaceForRefinement = `
  interface Slides {
    intro?: {
      title: string;
      body:  string[] | string;
    };
        titleSlide?: {
              title: string;
              body: string[] | string;
        };
        titleAndContent?: {
              title: string;
              body: string[] |string;
        };
        sectionTitle?: {
              title: string;
              picture: string[] | string;
        };
        twoContent?: {
          title: string;
          content: string[] | string;
          content2: string[] | string;
      };
    overview?: {
      title: string;
      content: string[] | string;
      picture: string;
  };
  comparison?: {
        title: string;
        subheading: string;
        subheading2: string;
        content: string[] | string;
        content2: string[] | string;
  };
  titleOnly?: {
        title: string;
    };
    blank?: {
      picture: string;
    };
    contentWithCaption?: {
      title: string;
      content: string[] | string;
      caption: string;
  };
    pictureWithCaption?: {
      title: string;
      picture: string;
      caption: string | string[];
    };
    team?: {
      title: string;
      first: {
        name: string;
        picture: string;
      };
      second: {
        name: string;
        picture: string;
      };
      third: {
        name: string;
        picture: string;
      };
    };
  }
  
  type Presentation = Slides[]
  `
  console.log("working on it...");
  let slideData : string = "";
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
      
      const slidesPrompt = PromptTemplate.fromTemplate(promptForMinimalistSalePitchSlides);
      const refineOutputPrompt = PromptTemplate.fromTemplate(promptForMinimalistSalePitchSlidesRefinement);

      const slidesChain = slidesPrompt.pipe(llm).pipe(new StringOutputParser());
      
      const slides = await slidesChain.invoke({
            userPrompt: userPrompt,
            numberOfSlides: numOfSlides,
            document: docsData,
            wording : wording,
            audience : audience,
            interface: slidesInterfaceForRefinement,
      });
      console.log(slides)
      const refineOutputChain = refineOutputPrompt.pipe(llm2).pipe(new StringOutputParser());

      const refinedSlides = await refineOutputChain.invoke({
            slides: slides,
            interface: slidesInterfaceForRefinement,
      });
      slideData = refinedSlides;
}catch(e){
      console.log(e);
}
console.log(slideData)
return slideData;
};
