import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain, AnalyzeDocumentChain } from "langchain/chains";
import * as fs from "fs";
import { PromptTemplate } from "@langchain/core/prompts";

// In this example, we use the `AnalyzeDocumentChain` to summarize a large text document.

export const analyzeSummary = async (documents : any) => {


  const summaryTemplate = `
You are an expert in summarizing documents.
Your goal is to create a summary of a documents in 3 parts.
Below you find the text of a documents:
--------
{text}
--------

Summary- Summarize the documents and provide an overview and important issues discussed and include more information 
from the overall documents.

Details - Create a detailed summary including important information, details agruments or
background information or evedence from all over the documents which is not in summary.


Conclusion - Generalize your conclusion with key points from the documents and discuss it. 

The documents will also be used as the basis for a question and answer bot.
provide some examples questions that could be asked about the documents. Make these questions very specific.

Total output will be a 3 paragraphs from each part of steps and 4 questions over the whole documents.

SUMMARIES AND EXAMPLE QUESTIONS:
`;


  const model = new OpenAI({ temperature: 0 });
  const combineDocsChain = loadSummarizationChain(model);
  const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
  const chain = new AnalyzeDocumentChain({
    combineDocumentsChain: combineDocsChain,
  });
  
  
  // promptTemplate: summaryPrompt,
  const res = await chain.invoke({
    input_document: documents,
  });
};
/*
{
  res: {
    text: ' President Biden is taking action to protect Americans from the COVID-19 pandemic and Russian aggression, providing economic relief, investing in infrastructure, creating jobs, and fighting inflation.
    He is also proposing measures to reduce the cost of prescription drugs, protect voting rights, and reform the immigration system. The speaker is advocating for increased economic security, police reform, and the Equality Act, as well as providing support for veterans and military families.
    The US is making progress in the fight against COVID-19, and the speaker is encouraging Americans to come together and work towards a brighter future.'
  }
}
*/
