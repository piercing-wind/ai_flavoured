
//made by gpt ai
export const summarizationPromptTemplate = `
You are an expert in summarizing documents and providing insightful analysis.
Your goal is to create a comprehensive summary of the uploaded document in three sections.
Below you will find the text of the document:

--------
{text}
--------

First Please provide a detailed summary of the document, capturing the central themes, key events, and notable characters (if applicable). Tailor the summary based on the genre and content of the document.

Then Provide detailed information, In this section, delve deeper into the document by analyzing important plot points, character development, and thematic elements. Provide insights and interpretations that enhance understanding of the document.

Finaly Generalize your thoughts and conclusions based on the document. Summarize the overall impact of the document and its significance in the context of its genre or subject matter.

The documents will also be used as the basis for a question and answer bot.
provide some examples questions only at the end that could be asked about the documents. Make these questions very specific.

Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.

SUMMARIES AND EXAMPLE QUESTIONS:
`;

export const summaryRefinePromptTemplate= `
  You are an expert in summarizing documents and providing insights.
  Your goal is to refine the existing summary of the document in 3 sections.
  We have provided an existing summary up to a certain point:
  
  --------
  {existing_answer}
  --------
  
  Below you will find the text of the document:
  
  --------
  {text}
  --------
  
  First Enhance the summary by including more information and addressing main disputes, aiming for a length of 200 to 350 words.
  
  Then Further explore specific details, arguments, or evidence from the document that were not covered in the initial summary. Expand on insights with a length of 200 to 300 words.
  
  Finaly Generalize your thoughts on the document and provide additional insights or discussions in approximately 200 to 250 words.
  
  The documents will also be used as the basis for a question and answer bot.
  provide some examples questions only at the end that could be asked about the documents. Make these questions very specific.

  Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
  Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.
  
  3 REFINED PARAGRAPHS AND EXAMPLE QUESTIONS:
`;


//made by sourabh sharma
export const summaryTemplate1 = `
You are an expert in summarizing documents and advising.
Your goal is to create a summary of a documents in 3 steps.
Below you find the text of a context:
--------
{text}
--------
The summaries should in friendly tone.

First Summarize the whole context and try to include more key information, main disputes, from overall the documents.
This section of summary should be between 200 to 350 words

Then create a detailed information by diving into the specific details of the documents including details agruments or background information 
or evedence from all over the documents which is not included in first section.

And then Generalize your conclusion or your thoughts with key points or provide insight over all the documents and discuss it. 

The documents will also be used as the basis for a question and answer bot.
provide some examples questions only at the end that could be asked about the documents. Make these questions very specific.

Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.

SUMMARIES AND EXAMPLE QUESTIONS:
`;

  // Summary refine template prompt

export  const summaryRefineTemplate2 = `
You are an expert in summarizing documents and advising.
Your goal is to create a summary of a documents in 3 steps.
We have provided an existing summary up to a certain point: : {existing_answer}

Below you find the text of existing documents:
--------
{text}
--------
The summary should be written in friendly tone.

First Summarize the whole context and try to include more information, main disputes, from the overall documents.
This section of summary should be between 200 to 350 words.

Then create a detailed information by diving into the specific details of the documents including details agruments or background information 
or evedence from all over the documents which is not included in first section.
the details section should be between 200 to 300 words.

and then Generalize your thought on the document and provide some conclusion,insight over the document and discuss it.
the conclusion section should be between 200 to 250 words.

Given the new context, refine the output. The documents will also be used as the basis for 
a question and answer bot. Provide some examples questions at the end only that could be asked about the documents. 

Make these questions very specific. If the context isn't useful, return the original summary and questions.

Important: Do not include any prefix (for eg: "Summary":, "Detailed Information" :, "Conclusion" :, etc.) in the output.
Total output will be a 3 paragraphs from each section without any prefix. and 4 questions over the whole documents.

3 PARAGRAPHS AND EXAMPLE QUESTIONS:
`;
