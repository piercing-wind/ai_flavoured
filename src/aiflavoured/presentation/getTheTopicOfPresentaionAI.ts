import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export const getTheTopicOfPresentaionAI=async (model: string, data: string)=>{
      const llm = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.2,
            modelName: model,
            });
      const prompForTitle = `
      You are given  slides data. you need to provide suitable prompt based on the category of the entire slide for image design which will be used
      as background image of slides.
      slides size are 16:9 so include the sizes and desgin patterns etc.

      Determine the category field of the slides (like its educational, artifical intellegence etc etc) data and provide the prompt for the image search
      which do not include any text or person in image.
      For an examples:
            1. "presentation background designs education 1920 x 1080 size"
            2. "presentation background designs technology 1920 x 1080 size"
            3. "presentation background designs business 1920 x 1080 size"
            4. "presentation background designs science 1920 x 1080 size"
            5. "presentation background designs"
      
      You can also search for plain simple background designs too if u think topic is complex.
      That prompt will be searched on google coustom search engine to get the image design only.
      provide the prompt to pick the best template desgin from the image search.
       
      Below is the slide data:
      {data}

      You prompt should not exceed more than 10 words it should be concise.

      Just return the prompt without any suffix.
      `;      
      const prompt = PromptTemplate.fromTemplate(prompForTitle);
      const titleChain = prompt.pipe(llm).pipe(new StringOutputParser());
      const title =await titleChain.invoke({
            data: data,
      });
      return title;
}
export const getTheTopicOfPresentaionAITweaker=async (model: string, data: string)=>{
      const llm = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.2,
            modelName: model,
            });
      const prompForTitle = ` you are given a google search prompt for searching the best desgin for slide 
      background. based on that prompt change it to diffrent working and search for the best background desgin for presentation slides.

      searching images prompt should not include any text or person in image.
       
      Below is the prompt:
      {data}
      
      You prompt should not exceed more than 10 words it should be concise.

      Just return the prompt without any suffix.
      `;      
      const prompt = PromptTemplate.fromTemplate(prompForTitle);
      const titleChain = prompt.pipe(llm).pipe(new StringOutputParser());
      const title =await titleChain.invoke({
            data: data,
      });
      return title;
}

export const  getTheBestColorForTitleAndSubheading = async (model: string, data: string)=>{
      const llm = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.2,
            modelName: model,
            });
      const colorPrompt = `You are given a 4 most dominant colors in (r g b a) format of an image which being used as background of slides.
      You job is to determine the best professional looking color for the title and body of the slides
      which are visually appealing and easy to read.

      Below is the color data:
      {data}
      Please pick the best opposite color for the title and body of the slides.
      Always return directly your answer in json object without and prefix or suffix.

      Return the hex code of the color for title and body as an object with key being title, body and value hex.
      `
      const prompt = PromptTemplate.fromTemplate(colorPrompt);
      const colorChain = prompt.pipe(llm).pipe(new StringOutputParser());
      const color = await colorChain.invoke({
            data: data,
      });
      return JSON.parse(color);
}