import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";



export const summarizer = async (documents : any) => {


const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo-0125",
  temperature: 0,
});

const summaryTemplat = `
You are an expert in summarizing documents.
Your goal is to create a summary of a documents.
Below you find the text of a documents:
--------
{text}
--------

provide a concise summarize the documents with an overview of the subject matter and key issues discussed in the document.
only include overview of the subject matter and key issues discussed in the document.

the output summary should be a paragraph long 100 - 150 words. you can increase the length if needed but try to keep it concise.

SUMMARY :
`
const summaryRefiner = `
You are an expert in summarizing documents.
Your job is to produce a final summary
We have provided an existing summary up to a certain point: "{existing_answer}"

(only if needed) Below you find the text of existing documents:
--------
{text}
--------
refine the original summary If the context isn't useful, return the original summary.
only include overview of the subject matter and key issues discussed in the documents. and keep it conscise. 

Your output will be a refined summary of the documents.

REFINED SUMMARY:
`


const conclusionTemplate = `
You are an expert in conclusioning documents.
Your goal is to create a conclusion of a documents with your thoughts.
Below you find the text of a documents:
--------
{text}
--------

provide your conclusion that from over all the documents

the output summary should be a paragraph long 100 - 150 words. you can increase the length if needed but try to keep it concise.

CONCLUSION :

`
const conclusionRefiner = `
You are an expert in conclusioning documents.
Your goal is to create a conclusion of a documents with your thoughts.
We have provided an existing summary up to a certain point: "{existing_answer}"

(only if needed) Below you find the text of existing documents:
--------
{text}
--------
refine the original conclusion If the context isn't useful, return the original conclusion.
only include overview of the subject matter and key issues discussed in the documents. and keep it conscise. 

Your output will be a refined conclusion of the documents.

REFINED CONCLUSION:

`


const summaryTemplate = `
You are an expert in summarizing documents.
Your goal is to create a summary of a documents in 3 steps.
Below you find the text of a documents:
--------
{text}
--------
each step should be a paragraph.

Step 1 - 

Step 2 - Create a detailed summary including important information, try to include details agruments or
background information or evedence from all over the document. with prefix "Details"

Step 3 - generate a conclusion that summarizes the key points of the document and final decision, 
outcome or implications of the subject. with prefix "Conclusion"

The documents will also be used as the basis for a question and answer bot.
provide some examples questions that could be asked about the document. Make these questions very specific.

 from each step of the context and a list of 4
example questions the user could ask of the Document.


SUMMARIES AND EXAMPLE QUESTIONS:
`;

const summaryRefineTemplate = `
You are an expert in summarizing documents.
Your goal is to create a summary of a documents with 3 steps.
We have provided an existing summary up to a certain point: : {existing_answer}

Below you find the text of existing documents:
--------
{text}
--------
each step should be a paragraph long.

Step 1 - Summarize the document and provide an overview of the 
subject matter and key issues discussed and include more information from the document. with prefix "Summary"

Step 2 - Create a detailed summary including important information, details agruments or
background information or evedence. with prefix "Details"

Step 3 - generate a conclusion that summarizes the key points of the document and final decision, 
outcome or implications of the subject. with prefix "Conclusion"

Given the new context, refine the summary and example questions. The documents will also be used as the basis for 
a question and answer bot. Provide some examples questions that could be asked about the document. 

Make these questions very specific. If the context isn't useful, return the original summary and questions.

Total output will be a summary from each step of the context and a list of 4
example questions the user could ask of the Document.


SUMMARIES AND QUESTIONS:
`;

const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplat);

const summaryRefinePrompt = PromptTemplate.fromTemplate(
  summaryRefiner
  );

const conclusionPrompt = PromptTemplate.fromTemplate(conclusionTemplate);
const conclusionRefinePrompt = PromptTemplate.fromTemplate(conclusionRefiner);

const summarizeChain = loadSummarizationChain(llm, {
      type: "refine",
      verbose: true,
      questionPrompt: summaryPrompt,
      refinePrompt: summaryRefinePrompt,
    });
    
    const conclusionChain = loadSummarizationChain(llm, {
      type: "refine",
      verbose: true,
      questionPrompt: conclusionPrompt,
      refinePrompt: conclusionRefinePrompt,
    });
    
    const summaryPromise = summarizeChain.invoke({ input_documents: documents });
    const conclusionPromise = conclusionChain.invoke({ input_documents: documents });
    
    const results = await Promise.all([summaryPromise, conclusionPromise]);
  
}
