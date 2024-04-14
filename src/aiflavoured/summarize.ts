import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { JsonOutputParser } from "@langchain/core/output_parsers";


export const summarize = async (documents: any) => {
  // Split text into chunks only for summarizations
  const splitter = new TokenTextSplitter({
    chunkSize: 16000,
    chunkOverlap: 300,
  });

  // Join all the documents into a single string
  const docs = documents.join(" ");

  // Split the documents into chunks
  const docSummary = await splitter.createDocuments([docs]);
  // llm model
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-0125",
    temperature: 0.1,
    streaming: true,
  });
  // Summary template prompt

  const summaryTemplate = `
You are an expert in summarizing documents and advising.
Your goal is to create a summary of a documents in 3 steps.
Below you find the text of a context:
--------
{text}
--------
The summaries should in friendly tone.

First Summarize the whole context and try to include more information from the overall documents.
you can increase the length of the summary to add relevant topics.

Then create a detailed information of summary from the documents including details agruments or background information 
or evedence from all over the documents which is not included in first section.

And then Generalize your conclusion or your thoughts with key points from the documents and discuss it. 

The documents will also be used as the basis for a question and answer bot.
provide some examples questions only at the end that could be asked about the documents. Make these questions very specific.

Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.

SUMMARIES AND EXAMPLE QUESTIONS:
`;

  // Summary refine template prompt

  const summaryRefineTemplate = `
You are an expert in summarizing documents and advising.
Your goal is to create a summary of a documents in 3 steps.
We have provided an existing summary up to a certain point: : {existing_answer}

Below you find the text of existing documents:
--------
{text}
--------
The summary should be written in friendly tone.

First Summarize the whole context and try to include more information from the overall documents.
add relevant topics. This section of summary should be between 200 to 350 words.

Then create a detailed information of summary from the documents including details agruments or background information 
or evedence from all over the documents which is not included in first section.
the details section should be between 200 to 300 words.

and then Generalize your thought on the document and provide some conclusion of all the document and discuss it.
the conclusion section should be between 200 to 250 words.

Given the new context, refine the output. The documents will also be used as the basis for 
a question and answer bot. Provide some examples questions at the end only that could be asked about the documents. 

Make these questions very specific. If the context isn't useful, return the original summary and questions.

Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.

3 PARAGRAPHS AND EXAMPLE QUESTIONS:
`;

  const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);

  const summaryRefinePrompt = PromptTemplate.fromTemplate(summaryRefineTemplate);
  
  const summarizeChain = loadSummarizationChain(llm, {
    type: "refine",
    questionPrompt: summaryPrompt,
    refinePrompt: summaryRefinePrompt,
    refineLLM: llm,
  });

for await (const chunk of await summarizeChain.stream({ input_documents: docSummary })) {
  console.log(chunk.output_text);
}
 
};
