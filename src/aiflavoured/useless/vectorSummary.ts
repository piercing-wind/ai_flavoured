import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { vectorStore } from "../textToEmbeddingAndStore";// Add this import statement

export const analyzeSummary = async (documents: any[]) => {
  const model = new OpenAI({ temperature: 0 });

//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 3000,
//     chunkOverlap: 200,
//   });
//   const documentChunks = await textSplitter.splitDocuments(documents);
const retriever = await vectorStore();    
// Retrieve the vector representations of the document chunks
const documentVectors = await Promise.all(
      documents.map(async (document) => {
        const [result] = await retriever.similaritySearch(document.pageContent, 1);
        return result;
      })
    );
// Implement your summarization logic using the vector representations
// For example, you can identify the most relevant chunks based on semantic similarity
// and focus the summarization on those chunks
const relevantChunks = documents.filter((_, i) => {
      const currentVector = documentVectors[i];
      const similarityScores = documentVectors.map((v: any) => {
            return calculateSimilarityScore(currentVector, v);
      });
      const maxScore = Math.max(...similarityScores);
      return similarityScores.indexOf(maxScore) === i;
});

function calculateSimilarityScore(vector1: any, vector2: any): number {
      // Calculate the similarity score between vector1 and vector2
      // Return the similarity score
      // Replace this with your actual similarity score calculation logic
      return 0;
}

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

`;

const summaryRefineTemplate = `
You are an expert in summarizing documents.
Your goal is to create a summary of a documents in 3 parts.
We have provided an existing summary up to a certain point: : {existing_answer}

Below you find the text of existing documents:
--------
{text}
--------
Summary- Summarize the documents and provide an overview and important issues discussed and include more information 
from the overall documents.

Details - Create a detailed summary including important information, details agruments or
background information or evedence from overall the documents which is not included in summary.


Conclusion - Generalize your conclusion with the key points from the documents and discuss it.

Given the new context, refine the output. The documents will also be used as the basis for 
a question and answer bot. Provide some examples questions that could be asked about the documents. 

Make these questions very specific. If the context isn't useful, return the original summary and questions.

`;

const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);

const summaryRefinePrompt = PromptTemplate.fromTemplate(
  summaryRefineTemplate
  );



  const chain = loadSummarizationChain(model, {
    type: "map_reduce",
    combinePrompt: summaryPrompt,
    combineMapPrompt: summaryRefinePrompt,
  });

  const res = await chain.invoke({ input_documents: relevantChunks });
  // Parse the response into the expected format
  const { text } = res;
};