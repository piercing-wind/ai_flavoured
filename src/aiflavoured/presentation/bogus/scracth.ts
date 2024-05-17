import { PromptTemplate } from "@langchain/core/prompts";


export const dataDoc = `The document introduces AI Flavoured, a project that utilizes artificial intelligence to revolutionize document comprehension and learning. It highlights the platform's advanced summarization engine, interactive communication features, multilingual support, and personalized learning experiences. The project aims to address challenges such as information overload, complex documents, and language barriers, empowering users to efficiently extract insights from written content. AI Flavoured stands as a beacon of efficiency and clarity in the realm of document comprehension, offering a dynamic and engaging learning experience for individuals worldwide.

The detailed analysis of the document reveals the project's focus on enhancing document comprehension through innovative AI technologies. It explores the system's core functionalities, such as intelligent summarization, interactive engagement, and multilingual support, emphasizing the importance of personalized learning experiences. The document also discusses the feasibility, technical aspects, and operational benefits of AI Flavoured, showcasing its potential to streamline information retrieval, improve knowledge acquisition, and foster collaboration in diverse learning environments. By outlining future scopes for advanced summarization techniques, personalized recommendations, and scalability enhancements, the project aims to stay at the forefront of AI-powered education and knowledge sharing.

In conclusion, AI Flavoured emerges as a groundbreaking initiative that leverages artificial intelligence to transform the way individuals interact with and comprehend complex textual information. The project's commitment to continuous improvement, user-centric design, and technological innovation underscores its significance in the realm of document comprehension and interactive learning. By embracing the future of AI-powered education, AI Flavoured offers a promising solution to the challenges of information overload, language barriers, and inefficient learning processes, paving the way for enhanced academic success, research advancements, and professional growth in a rapidly evolving digital landscape.`


const refinePromptTemplate = `you are professional presentation creator and you have been tasked to create a pptx slides with the context provided to you.
before you create any slides read the instructions below for slide templates and sizes below:

INSTRUCTIONS:
Below are 9 templates layout available, you can pick any of the layout template to create the slides:
and the slide size is 16:9 ratio

1. Title Slide (Title and Subtitle)
2. Title and Content
3. Section Header
4. Two Content
5. Comparison
6. Title Only
7. Blank
8. Content with Caption
9. Picture with Caption

Output of the slides must follow the json structure defined for each layout below and fill the more contents in each slides:
"Imp Note :The picture key will contain the best prompt of an image which best fit in that slide scenario.
so with the help of picture description we can generate a picture for that slide."    

For key body and contents of the slide:
      use more content from the context, explain the content in bullet point, numbers to fill the slides if possible use paragraph.
      while filling the body content and if you are generating points then atleast generate 7 to 8 points.
      and for filling the content generate atleast 4 to 5 points.
      if you are using paragraphs then it should be atleast 2 to 3 paragraphs with 3 to 4 lines each.
      and for filling the content with paragraph it there should be atleast 2 or more paragraphs with 2 to 3 lines.
      if any for comparison slide use best subheadings and and keypoints for its contents.
      add as much content as possible to make the slide more informative and engaging.

  1. if you are going to create a slide with title Slide then:
        a json object with key being titleSlide and value being another object with keys title and body.
  2. if you are going to create a slide with title and content then:
        a json object with key being titleAndContent and value being another object with keys title and body.
  3. if you are going to create a slide with section header then:
        a json object with key being sectionHeader and value being another object with keys title and body.
  4. if you are going to create a slide with two content then:
        a json object with key being twoContent and value being another object with keys title , content and content2.
  5. if you are going to create a slide with comparison then:
        a json object with key being comparison and value being another object with keys title , subheading, subheading2, content and content2.
  6. if you are going to create a slide with title only then:
        a json object with key being titleOnly and value being another object with keys title, picture.
  7. if you are going to create a slide with blank then:
        a json object with key being blank and value being another object with keys picture.  
  8. if you are going to create a slide with content with caption then:
        a json object with key being contentWithCaption and value being another object with keys title, content and caption.
  9. if you are going to create a slide with picture with caption then:
        a json object with key being pictureWithCaption and value being another object with keys title, picture and caption.


create slides objects based on the context provided below:
Before you start creating there are few slides already generated at some point, you have opportunity to modify those slides and make it more engaging and informative if necessary.
you add your own touch to the slides if nessary. 
here are are the slides that are already created at some extent:
"{existing_answer}"
these provided slides may not be 10 slides so you have to create the remaining slides 10 in total based on the context provided below.
with best of your creativity and fill more content in slides because less content in 16:9 slides doesnt look good.

Pick a template layout which best fits the slide you want to generate from the above instructions. Layout Templates can be replicated as needed without worring. but the content should be unique.
you dont have to use each and every layout template, use the layout template which best fits the context.
if you think the context is less for generating slides then you can use and image layout like titleOnly, or blank for imaging the content upto desired number of slides.

create atleast 10 slides based on the context provided.
Below are the context generate slides objects, try to fill more content in each slides :
------------
  "{text}"
------------

Output of each slide object always must be in json object and seperated by comma in array.
`;

export const finalSlideTemplate = /* #__PURE__ */ new PromptTemplate({
  template: refinePromptTemplate,
  inputVariables: ["existing_answer", "text"],
});


const template = `You are a professional pesentation creator and you have been tasked to create a pptx slides with the context provided to you. 
the slides have to be created in a way that the user can easily understand the content and the slides should be engaging and informative.

before you create any slides read the instructions below for slide templates and sizes below:

INSTRUCTIONS:
Below are 9 templates layout available, you can pick any of the layout template to create the slides:
and the slide size is 16:9 ratio

1. Title Slide (Title and Subtitle)
2. Title and Content
3. Section Header
4. Two Content
5. Comparison
6. Title Only
7. Blank
8. Content with Caption
9. Picture with Caption

Output of the slides must follow the json structure defined for each layout below and fill the more contents in each slides:
"Imp Note :The picture key will contain the best prompt of an image which best fit in that slide scenario.
so with the help of picture description we can generate a picture for that slide."    

For key body and contents of the slide:
      use more content from the context, explain the content in bullet point, numbers to fill the slides if possible use paragraph.
      while filling the body content and if you are generating points then atleast generate 7 to 8 points.
      and for filling the content generate atleast 4 to 5 points.
      if you are using paragraphs then it should be atleast 2 to 3 paragraphs with 3 to 4 lines each.
      and for filling the content with paragraph it there should be atleast 2 or more paragraphs with 2 to 3 lines.
      if any for comparison slide use best subheadings and and keypoints for its contents.
      add as much content as possible to make the slide more informative and engaging.
   
  1. if you are going to create a slide with title Slide then:
        a json object with key being titleSlide and value being another object with keys title and body.
  2. if you are going to create a slide with title and content then:
        a json object with key being titleAndContent and value being another object with keys title and body.
  3. if you are going to create a slide with section header then:
        a json object with key being sectionHeader and value being another object with keys title and body.
  4. if you are going to create a slide with two content then:
        a json object with key being twoContent and value being another object with keys title , content and content2.
  5. if you are going to create a slide with comparison then:
        a json object with key being comparison and value being another object with keys title , subheading, subheading2, content and content2.
  6. if you are going to create a slide with title only then:
        a json object with key being titleOnly and value being another object with keys title, picture.
  7. if you are going to create a slide with blank then:
        a json object with key being blank and value being another object with keys picture.  
  8. if you are going to create a slide with content with caption then:
        a json object with key being contentWithCaption and value being another object with keys title, content and caption.
  9. if you are going to create a slide with picture with caption then:
        a json object with key being pictureWithCaption and value being another object with keys title, picture and caption.
      
Pick a template layout which best fits the slide you want to generate from the above instructions.


create the slide objects based on this context:
'"{text}"'

Output of each slide object always must be in array and seperated by comma.
`;

export const slidePrompt = /*#__PURE__*/ new PromptTemplate({
  template,
  inputVariables: ["text"],
});


