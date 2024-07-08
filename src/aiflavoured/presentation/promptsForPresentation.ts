export const RefinePromptTemplate = `You job is look at the details provided to you at some point from a document.
below is the document which is already summarized and detailed do not concise it further:
--------
{existing_answer}
--------
Below you will find the docuemnts try to add more details to the existing summary and extend its length by providing more details
from the document.:

--------
{text}
--------

Your output should be atleast 300 to 400 words. you can increase it upto 24000 words if needed.
`;    
export const questionPromptTemplate = `You are given a document, provides its overview which explains the full content of the document.
below you will find the document:
--------
{text}
--------
`;   

// aiSlies.ts
export const slidesTemplate = `you are professional presentation creator and you have been tasked to create a pptx slides with the context provided to you.
before you create any slides read the instructions below for slide templates and sizes below:
Show your creativity in picking the best slide layout and fill the content in it. repeat the layouts as needed.
You have to genearte {numberOfSlides} slides based on the context provided after.
Generate slides in enagaging way frist slide should be content list and last slide should be thanking slide.


AVAILABLE SLIDE LAYOUTS AND ITS SIZES:

Below are 9 templates layout available, you can pick any of the layout template to create the slides:
and the slide size is 16:9 ratio

Output of the slides must follow the json structure defined for each layout below:


For the key picture key will contain the best prompt of an image which best fit in that slide scenario.
which describe the image.do not use any specific name which ai prompt will not understand  

For the key body and contents of the slide:
      Explain the content in bullet points, Numbers or Paragraph to fill the data in slides.
      while filling the body, if you are generating points then must generate 8 to 10 points for it.
      and for filling the contents generate must 5 to 6 points for it.
      if you are using paragraphs then it should be must 2 to 3 paragraphs with 3 to 4 lines each.
      and for filling the content with paragraph it there should be must 2 or more paragraphs with 2 to 3 lines.
      if any for comparison slide use best subheadings and and keypoints for its contents.
      add as much content as possible to make the slide more informative and engaging.

  1. If you are going to create a slide with title Slide then:
        a json object with key being titleSlide and value being another object with keys title and body.
  2. If you are going to create a slide with title and content then:
        a json object with key being titleAndContent and value being another object with keys title and body.
  3. If you are going to create a slide with section header then:
        a json object with key being sectionHeader and value being another object with keys title and body.
  4. If you are going to create a slide with two content then:
        a json object with key being twoContent and value being another object with keys title , content and content2.
  5. If you are going to create a slide with comparison then:
        a json object with key being comparison and value being another object with keys title , subheading, subheading2, content and content2.
  6. If you are going to create a slide with title only then:
        a json object with key being titleOnly and value being another object with keys title, picture.
  7. If you are going to create a slide with blank then:
        a json object with key being blank and value being another object with keys picture.  
  8. If you are going to create a slide with content with caption then:
        a json object with key being contentWithCaption and value being another object with keys title, content and caption.
  9. If you are going to create a slide with picture with caption then:
        a json object with key being pictureWithCaption and value being another object with keys title, picture and caption.

INSTRUCTIONS For Creating Slides:
Create First slide with a list of contents of the slides you are going to generate

Before creating slide pick a template layout which best fits the slide you want to generate from the above instructions. 
you dont need to follow the order of the layout, you are free to to generate as you like.
you can replicate or repeat same layouts as needed. but the content should be unique.
you dont have to use each and every layout template, use the layout which best fits the context.
if you think the context is less for generating slides then you can use and image layout like titleOnly, 
or blank for imaging the content upto desired number of slides.

after that in the end add a thanking slide with a thank you note.
with best of your creativity and fill more content in slides because less content in 16:9 slides doesnt look good.

Generate {numberOfSlides} slides objects based on the context provided below:
Below are the context generate slides objects, try to fill more content in each slides :
------------
  "{document}"
------------

Output format:
Output will be a json object with key being names of the slides layouts, which must be seperated by comma. do not add any additonal keys in it.
`;

// aiSlides.ts
export const slidePrompt = ` You are a professional presentation creator tasked with generating a PowerPoint presentation 
for the {audience} audience. 
Follow the instructions below to create an engaging and informative presentation:

Instructions for Creating Slides:

  Creativity and Layout Selection:
      There should be always 2 or more slides of an image for that Pick image layouts like titleOnly or blank and provide image prompt
      for picture key so further an image like that can be added which will be more visually appealing.
      Choose the best slide layout from the available templates to present the content effectively.
      Feel free to repeat layouts as needed.
      The first slide should be a content list, and the last slide should be a thanking slide.
      Add more content (Follow the Filling content instrution) to make the slides more informative.
  
  Slide Layouts and Sizes:

  Must use use all picture slides at least once!

we have 16:9 ratio for all slides.
  Available slide layouts include:
     1. Title Slide : key "titleSlide" and values key "title": "Title Value", "body": "Body Content" 
     2. Title and Content : key "titleAndContent" and values key  "title": "Title Value", "body": "Body content" 
     3. Section Header: key "sectionHeader" and values key "title": "Your Title", "body": "Your Content" 
     4. Two Content: key "twoContent" and values key "title": "Your Title", "content": "Content 1", "content2": "Content 2" 
     5. Comparison: key "comparison" and values key "title": "Your Title", "subheading": "Subheading 1", "subheading2": "Subheading 2", "content": "Content 1", "content2": "Content 2" 
     6. Title Only: key "titleOnly" and values key  "title": "Your Title", "picture": "Image prompt" 
     7. Blank: key "blank" and values key "picture": "Image prompt" 
     8. Content with Caption: key "contentWithCaption" and values key "title": "Your Title", "content": "Your Content", "caption": "Caption" 
     9. Picture with Caption: key "pictureWithCaption" and values key "title": "Your Title", "picture": "Image prompt", "caption": "Caption" 

Filling the Content:
      Your slides content should be {wording} wordings.
  for Images : provide an image prompt for the picture which you might want to display.

  for Body Content key field:
      If using paragraphs: generate upto 2 or 3 paragraphs with 3 or 4 lines each.
      If using bullet points or numbers: generate upto 8 or 10 points.
  for Contents key field:
      If using bullet points: generate atleast 5 or 6 points.
      If using paragraphs: generate atleast 2 paragraphs with 2 or 3 lines each.
      Special Slides:

For comparison slides, use clear subheadings and generate 5 points for its content to enhance difference clarity.
General Tips:

Ensure each slide is informative and engaging.
Use the available layouts to fit the context provided.
Add images when content is sparse to fill the slide effectively.

Final Slides:

  Start with a content list slide.
  End with a thanking slide.
Generate {numberOfSlides} slide objects based on the context provided below. Fill each slide with as much relevant content and images as possible to make the presentation engaging and informative.

Context for Slides:
"{document}"
Output Format:

Provide the output as a JSON object, with keys representing the slide layouts used.
Separate each slide layout with a comma.
Do not add any additional keys.
:
`
export const refineOutput = `
your job is to make sure the pptx slides content provided to you is in correct format
You do not need to modify anything in that content, just make sure the content is in correct format.

The format is as follows:
its should be in a array [] of json objects. with keybeing the slide layout name and its value being further object with its layout keys.
      Available slide layouts include:
      1. Title Slide : key "titleSlide" and values key "title": "Title Value", "body": "Body Content" 
      2. Title and Content : key "titleAndContent" and values key  "title": "Title Value", "body": "Body content" 
      3. Section Header: key "sectionHeader" and values key "title": "Your Title", "body": "Your Content" 
      4. Two Content: key "twoContent" and values key "title": "Your Title", "content": "Content 1", "content2": "Content 2" 
      5. Comparison: key "comparison" and values key "title": "Your Title", "subheading": "Subheading 1", "subheading2": "Subheading 2", "content": "Content 1", "content2": "Content 2" 
      6. Title Only: key "titleOnly" and values key  "title": "Your Title", "picture": "Image prompt" 
      7. Blank: key "blank" and values key "picture": "Image prompt" 
      8. Content with Caption: key "contentWithCaption" and values key "title": "Your Title", "content": "Your Content", "caption": "Caption" 
      9. Picture with Caption: key "pictureWithCaption" and values key "title": "Your Title", "picture": "Image prompt", "caption": "Caption" 
 
      
Slide Document array object is below:
Slides: {slides}

You must return the provided doument content as it in that format without further modification in content. Only modify the format of the content if needed.
You do not need to add any other extra words like "'''json[]''''" while outputing its must simply start with [ and end with ] containing its objects data as it is do not modify futher if keys containing arrays leave it as it is.
remove unnecessary keys which are not listed here. 

`

export  const  promptForPPTXSummary = `You are a very helpful assistant, tasked with expanding or reduce the given text 
document to at least {words} words, ensuring no important details are missed. If the provided document is shorter 
than {words} words, then return it as it is without any modification.

Below you will find the document which you have to expand in detail:
Document: {document}

`

export const promptForFacetSlides = `
You are a professional presentation creator tasked with generating a PowerPoint presentation for the {audience} audience. Follow the instructions below to create an engaging and informative presentation.

Available slide layouts include this TypeScript interface for the slides object:
{interface}
Use all the layouts at least once while generating slides.

This is user provided prompt for help in generating slides User request prompt must be followed and
try to work with the user request prompt if user prompt is irrelevant then ignore the irrelevant parts and continue generating slides with document.

{userPrompt}

Please use 3 or 4 image slides and provide image discription ,when using picture key in the slide layout provide the best prompt for the image which best fit in that slide scenario.
dont use any specific name which ai prompt will not understand.
For example :  "picture": "AI_Assistant.jpg" = bad ,  "picture": "A robot assisting a human in a office" = good

Must use use all picture slides at least once!

Instructions for Creating 16:9 size Slides:
- Utilize all the layouts at least once while generating slides.
- Do not leave any key empty.
- Ensure that all slides maintain {wording} wordings.
- Include at least 4 slides that contain images.
- Provide an image prompt or description for the picture field.
- If using paragraphs: generate up to 2 or 3 paragraphs with 3 or 4 lines each.
- Utilize each slide layout to present the content effectively.
- Make comparison slides more informative by adding 5 points for each content section which describe 2 topics, .
- Use image slides for content that is less detailed to make it more visually appealing.
- For body content, provide detailed and informative content, aiming for comprehensive coverage of each point.
- You can use emojis to make the slides more engaging.


Only genereate {numberOfSlides} slides based on the context provided below:
dont increase or decrease the number of slides.
If you think context is less for generating slides then you can use image layouts like titleOnly or blank for imaging the content upto desired number of slides.
Context for Slides:
"{document}"

Output Format:
Generate at least {numberOfSlides} slides with the names of the slide layouts used and subkeys as specified in the provided interface. Ensure each slide contains detailed body content and uses images effectively. Directly output the slides without any prefix or suffix.
`;

export const promptForFacetSlidesRefinement = `
Your job is to make sure the pptx slides content provided to you is in correct format without modifying the sigle word from the 
content.
below is the Typescript interface for the slides object which you have to make sure the content is in that format.
you will be provided with the slides with its name and content you have to make sure the content is in correct format.
where slide name is the key and its content is the value of the key. and so on.

Below is the example interface for the slides object:
{interface}

only keep the first slide title key value concise in 3 or 4 words. leave other slides as it is.

Fill the content as it is in the interface, Do not modify the the actaul wording for the content.
just pick the values and assign them to the keys in the interface.


Here is the Slide Data:
{slides}

You must return the provided slide content as it in that format without further modification in content.
Dont include any prefix or suffix like "json" etc. only return the array.
You do not need to add any other extra words like "'''json ''''", output must simply start with [ and end with ] containing its objects data as it is do not modify futher if keys containing arrays leave it as it is.
remove unnecessary keys which are not listed in the interface. 
`   

export const promptForMinimalistSalePitchSlides = `
You are a professional presentation creator tasked with generating a PowerPoint presentation for the {audience} audience. Follow the instructions below to create an engaging and informative presentation.

Available slide layouts include this TypeScript interface for the slides object:
{interface}
Use all the layouts at least once while generating slides.

This is the user-provided prompt for help in generating slides. The user request prompt must be followed, and if the user prompt is irrelevant, ignore the irrelevant parts and continue generating slides with the document.

{userPrompt}

Please use 3 or 4 image slides and provide image descriptions. When using the picture key in the slide layout, provide the best prompt for the image that best fits that slide scenario. 
Do not use any specific names which AI prompts will not understand.
For example: "picture": "AI_Assistant.jpg" = bad, "picture": "A robot assisting a human in an office" = good.

You must use all picture slides at least once!

Instructions for Creating 16:9 size Slides:
- The first slide should always be a section title slide.
- Utilize all the layouts at least once while generating slides.
- Do not leave any key empty.
- Ensure that all slides maintain {wording} wordings.
- Include at least 4 slides that contain images.
- Provide an image prompt or description for the picture field.
- If using paragraphs: generate up to 2 or 3 paragraphs with 3 or 4 lines each.
- Utilize each slide layout to present the content effectively.
- Make comparison slides more informative by adding 5 points for each content section which describe 2 topics.
- Use image slides for content that is less detailed to make it more visually appealing.
- For body content, provide detailed and informative content, aiming for comprehensive coverage of each point.
- You can use emojis to make the slides more engaging.

Only generate {numberOfSlides} slides based on the context provided below:
Do not increase or decrease the number of slides.
If you think the context is insufficient for generating slides, you can use image layouts like titleOnly or blank for filling content up to the desired number of slides.

Context for Slides:
"{document}"

Output Format:
Generate exactly {numberOfSlides} slides with the names of the slide layouts used and subkeys as specified in the provided interface. Ensure each slide contains detailed body content and uses images effectively. Directly output the slides without any prefix or suffix.
`;


export const promptForMinimalistSalePitchSlidesRefinement = `
Your job is to make sure the pptx slides content provided to you is in correct format without modifying the sigle word from the 
content.
below is the Typescript interface for the slides object which you have to make sure the content is in that format.
you will be provided with the slides with its name and content you have to make sure the content is in correct format.
where slide name is the key and its content is the value of the key. and so on.


Below is the example interface for the slides object:
{interface}

only keep the first slide title key value concise in 3 or 4 words. leave other slides as it is.

Fill the content as it is in the interface, Do not modify the the actaul wording for the content.
just pick the values and assign them to the keys in the interface.


Here is the Slide Data:
{slides}

You must return the provided slide content as it in that format without further modification in content.
Dont include any prefix or suffix like "json" etc. only return the array.
You do not need to add any other extra words like "'''json ''''", output must simply start with [ and end with ] containing its objects data as it is do not modify futher if keys containing arrays leave it as it is.
remove unnecessary keys which are not listed in the interface. 
`   

export const promptForTextToPresentation = `
You will be given a topic. from which you have to generate detailed explanation of the topic.
you must include every important informations. You explanation should be detailed and informative in a way that a presentation pptx can ceated.
{audience} is the audience for which you have to create the data.
this is the type of wording you use you can ignore it.
{wording}.
here is the topic you have to explain:
{userPrompt}
you output length should be between 10000 to 12000 words.
`