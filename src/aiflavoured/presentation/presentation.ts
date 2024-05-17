"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";
import { convertSlidesStringToObject } from "./convertSlidesStringToObject";
import { aiSlides } from "./aiSlides";

// x , y , w, h  are in inches

// Title slide
// Title and content
// Section header
// Two content
// Comparison
// Title only
// Blank
// Content with caption
// Picture with caption 


const titleAndContent = (pptx: pptxgen) => {
    // Title section settings
    const titlex = 1;
    const titley = 0.25;
    const titlew = 11.41;
    const titleh = 1.3;
    const titleFontSize = 40;
    const titleColor = "0e0c0c";
    const titleAlign = "center";
    const titleValign = "middle";

    // Content section settings
    const contentx = 1;
    const contenty = 1.55;                      
    const contentw = 11.41;
    const contenth = 5.5;
    const contentFontSize = 26;
    const contentColor = "0e0c0c";
    const contentAlign = "left";
    const contentValign = "top";
    

  pptx.defineSlideMaster({
    title: "titleAndContent",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
        // { image: { x:0, y:0, w:'100%', h:'100%', path:'public/heartbroken-dog-meme.png' } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
  
      // Content
      {
        placeholder: {
          options: {
            name: "body",
            type: "body",
            x: contentx,
            y: contenty,
            w: contentw,
            h: contenth,
            fontSize: contentFontSize,
            color: contentColor,
            align: contentAlign,
            valign : contentValign,
            fontFace: "Arial",
          },
          text: "Content Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.5, h: 0.4 },
  });
  return pptx;
};
const titleSlide = (pptx: pptxgen) => {

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "center";
  const titleValign = "middle";

  //Body section settings
  const bodyx = 1;
  const bodyy = 3.75;
  const bodyw = 11.41;
  const bodyh = 3;
  const bodyFontSize = 20;
  const bodyColor = "0e0c0c";
  const bodyAlign = "left";
  const bodyValign = "top";



  pptx.defineSlideMaster({
    title: "titleSlide",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
        // { image: { x:0, y:0, w:'100%', h:'100%', path:'public/heartbroken-dog-meme.png' } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
  
      // Content
      {
        placeholder: {
          options: {
            name: "body",
            type: "body",
            x: bodyx,
            y: bodyy,
            w: bodyw,
            h: bodyh,
            fontSize: bodyFontSize,
            color: bodyColor,
            align: bodyAlign,
            valign : bodyValign,
            fontFace: "Arial",
          },
          text: "Content Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
return pptx;
}
const sectionHeader = (pptx: pptxgen) => {

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "center";
  const titleValign = "middle";

  //Subtitle section settings
  const subx = 1;
  const suby = 3.75;
  const subw = 11.41;
  const subh = 3;
  const subFontSize = 20;
  const subColor = "0e0c0c";
  const subAlign = "left";
  const subValign = "top";

  pptx.defineSlideMaster({
    title: "sectionHeader",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Section Header Placeholder",
        },
      },
  
      // Subtitle
      {
        placeholder: {
          options: {
            name: "body",
            type: "body",
            x: subx,
            y: suby,
            w: subw,
            h: subh,
            fontSize: subFontSize,
            color: subColor,
            align: subAlign,
            valign : subValign,
            fontFace: "Arial",
          },
          text: "Subtitle Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
  return pptx;
}
const twoContent = (pptx: pptxgen) => {

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "center";
  const titleValign = "middle";

  //Content section settings
  const contentx = 1;
  const contenty = 2;
  const contentw = 5.5;
  const contenth = 4.5;
  const contentFontSize = 25;
  const contentColor = "0e0c0c";
  const contentAlign = "left";
  const contentValign = "top";

  //Second content section settings
  const content2x = 7;
  const content2y = 2;
  const content2w = 5.5;
  const content2h = 4.5;
  const content2FontSize = 25;
  const content2Color = "0e0c0c";
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: "twoContent",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
  
      // Content
      {
        placeholder: {
          options: {
            name: "content",
            type: "body",
            x: contentx,
            y: contenty,
            w: contentw,
            h: contenth,
            fontSize: contentFontSize,
            color: contentColor,
            align: contentAlign,
            valign : contentValign,
            fontFace: "Arial",
          },
          text: "Content Placeholder",
        },
      },
  
      // Second Content
      {
        placeholder: {
          options: {
            name: "content2",
            type: "body",
            x: content2x,
            y: content2y,
            w: content2w,
            h: content2h,
            fontSize: content2FontSize,
            color: content2Color,
            align: content2Align,
            valign : content2Valign,
            fontFace: "Arial",
          },
          text: "Second Content Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
  return pptx;
}
const comparison = (pptx: pptxgen) => {

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "center";
  const titleValign = "middle";

  // Subheading section settings
  const subx = 1;
  const suby = 2;
  const subw = 5.5;
  const subh = 1;
  const subFontSize = 30;
  const subColor = "211f1f";
  const subAlign = "center";
  const subValign = "middle";

  // Second subheading section settings
  const sub2x = 7;
  const sub2y = 2;
  const sub2w = 5.5;
  const sub2h = 1;
  const sub2FontSize = 30;
  const sub2Color = "211f1f";
  const sub2Align = "center";
  const sub2Valign = "middle";

  // Content section settings
  const contentx = 1;
  const contenty = 3;
  const contentw = 5.5;
  const contenth = 3.5;
  const contentFontSize = 25;
  const contentColor = "0e0c0c";
  const contentAlign = "left";
  const contentValign = "top";

  // Second content section settings
  const content2x = 7;
  const content2y = 3;
  const content2w = 5.5;
  const content2h = 3.5;
  const content2FontSize = 25;
  const content2Color = "0e0c0c";
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: "comparison",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
  
      // Subheading
      {
        placeholder: {
          options: {
            name: "subheading",
            type: "body",
            x: subx,
            y: suby,
            w: subw,
            h: subh,
            fontSize: subFontSize,
            color: subColor,
            align: subAlign,
            valign : subValign,
            fontFace: "Arial",
          },
          text: "Subheading Placeholder",
        },
      },

      // Second Subheading
      {
        placeholder: {
          options: {
            name: "subheading2",
            type: "body",
            x: sub2x,
            y: sub2y,
            w: sub2w,
            h: sub2h,
            fontSize: sub2FontSize,
            color: sub2Color,
            align: sub2Align,
            valign : sub2Valign,
            fontFace: "Arial",
          },
          text: "Second Subheading Placeholder",
        },
      },
  
      // Content
      {
        placeholder: {
          options: {
            name: "content",
            type: "body",
            x: contentx,
            y: contenty,
            w: contentw,
            h: contenth,
            fontSize: contentFontSize,
            color: contentColor,
            align: contentAlign,
            valign : contentValign,
            fontFace: "Arial",
          },
          text: "Content Placeholder",
        },
      },
  
      // Second Content
      {
        placeholder: {
          options: {
            name: "content2",
            type: "body",
            x: content2x,
            y: content2y,
            w: content2w,
            h: content2h,
            fontSize: content2FontSize,
            color: content2Color,
            align: content2Align,
            valign : content2Valign,
            fontFace: "Arial",
          },
          text: "Second Content Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
  return pptx;
}
const titleOnly = (pptx: pptxgen) => {

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "center";
  const titleValign = "middle";

  //picture section settings
  const picturex = 1.5;
  const picturey = 2;
  const picturew = 10.5;
  const pictureh = 5.5;
  const bodyFontSize = 20;
  const bodyColor = "0e0c0c";
  const bodyAlign = "center";
  const bodyValign = "middle";


  pptx.defineSlideMaster({
    title: "titleOnly",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
      {
        placeholder: {
          options: {
            name: "picture",
            type: "body",
            x: picturex,
            y: picturey,
            w: picturew,
            h: pictureh,
            fontSize: bodyFontSize,
            color: bodyColor,
            align: bodyAlign,
            valign: bodyValign,
            fontFace: "Arial",
          },
          text: "body Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.5, h: 0.4 },
  });
  return pptx;
}
const blank = (pptx: pptxgen) => {
    //picture section settings
    const picturex = 1;
    const picturey = 1;
    const picturew = 11.33;
    const pictureh = 5.5;
    const bodyFontSize = 20;
    const bodyColor = "0e0c0c";
    const bodyAlign = "center";
    const bodyValign = "middle";

  pptx.defineSlideMaster({
    title: "blank",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      {
        placeholder: {
          options: {
            name: "picture",
            type: "body",
            x: picturex,
            y: picturey,
            w: picturew,
            h: pictureh,
            fontSize: bodyFontSize,
            color: bodyColor,
            align: bodyAlign,
            valign: bodyValign,
            fontFace: "Arial",
          },
          text: "body Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
  return pptx;
}
const contentWithCaption = (pptx: pptxgen) => {
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = "0e0c0c";
  const titleAlign = "left";
  const titleValign = "middle";

  // Content section settings
  const contentx = 7;
  const contenty = 0.5;
  const contentw = 5.5;
  const contenth = 6;
  const contentFontSize = 20;
  const contentColor = "0e0c0c";
  const contentAlign = "left";
  const contentValign = "top";

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2.5;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionColor = "211f1f";
  const captionAlign = "left";
  const captionValign = "top";


  pptx.defineSlideMaster({
    title: "contentWithCaption",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
  
      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },
  
      // Content
      {
        placeholder: {
          options: {
            name: "content",
            type: "body",
            x: contentx,
            y: contenty,
            w: contentw,
            h: contenth,
            fontSize: contentFontSize,
            color: contentColor,
            align: contentAlign,
            valign : contentValign,
            fontFace: "Arial",
          },
          text: "Content Placeholder",
        },
      },
  
      // Caption
      {
        placeholder: {
          options: {
            name: "caption",
            type: "body",
            x: captionx,
            y: captiony,
            w: captionw,
            h: captionh,
            fontSize: captionFontSize,
            color: captionColor,
            align: captionAlign,
            valign : captionValign,
            fontFace: "Arial",
          },
          text: "Caption Placeholder",
        },
      },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });
  
  return pptx;
}
const pictureWithCaption = (pptx: pptxgen) => {
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = "211f1f";
  const titleAlign = "left";
  const titleValign = "middle";

  // Picture section settings
  const picturex = 7;
  const picturey = 0.7;
  const picturew = 6;
  const pictureh = 6;

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2.5;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionColor = "0e0c0c";
  const captionAlign = "left";
  const captionValign = "top";

  pptx.defineSlideMaster({
    title: "pictureWithCaption",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },

      // Title
      {
        placeholder: {
          options: {
            name: "title",
            type: "title",
            x: titlex,
            y: titley,
            w: titlew,
            h: titleh,
            fontSize: titleFontSize,
            color: titleColor,
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: "Arial",
          },
          text: "Title Placeholder",
        },
      },

      // Picture
      {
        placeholder: {
          options: {
            name: "picture",
            type: "body",
            x: picturex,
            y: picturey,
            w: picturew,
            h: pictureh,
          },
          text: "Drag an image here",
        },
      },

      // Caption
      {
        placeholder: {
          options: {
            name: "caption",
            type: "body",
            x: captionx,
            y: captiony,
            w: captionw,
            h: captionh,
            fontSize: captionFontSize,
            color: captionColor,
            align: captionAlign,
            valign : captionValign,
            fontFace: "Arial",
          },
          text: "Caption Placeholder",
        },
      },

      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],

    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.4 },
  });

  return pptx;
}

interface Slides {
  titleSlide?: {
    title: string;
    body: string[] | string;
  };
  titleAndContent?: {
    title: string;
    body: string[] | string;
  };
  sectionHeader?: {
    title: string;
    body: string[] | string;
  };
  twoContent?: {
    title: string;
    content: string[] | string;
    content2: string[] | string;
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
    picture?: string;
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
    caption: string;
  };
}

type Presentation = Slides[]

type PresentaionData = {
  author : string,
  company : string,
  subject : string,
  title : string,
  pptxData : string,  
  model : string,
  numberOfSlides : string
}


export const presentaion = async ({author, company, subject, title, pptxData, model, numberOfSlides}: PresentaionData) => {
  let pptx = new pptxgen();
  
  // Set PPTX Author and Company
  pptx.author = author;
  pptx.company = company;
  pptx.subject = subject;
  pptx.title = title;
  
  // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
  pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
  pptx.rtlMode = true;
  pptx.theme = { headFontFace: "Arial Light", bodyFontFace: "Calibri" };
  
  const slides : string | undefined= await aiSlides(model = model, numberOfSlides=numberOfSlides, pptxData);
  const data: Presentation = await convertSlidesStringToObject(slides!);

  // const data : Presentation = [
  //   {
  //     "titleAndContent": {
  //       "title": "Content List",
  //       "body": [
  //         "Introduction to AI Flavoured",
  //         "Project Overview",
  //         "Core Functionalities",
  //         "Intelligent Summarization",
  //         "Interactive Engagement",
  //         "Multilingual Support",
  //         "Personalized Learning Experiences",
  //         "Technical Aspects and Benefits",
  //         "Future Scopes",
  //         "Thank You"
  //       ]
  //     }
  //   },
  //   {
  //     "titleAndContent": {
  //       "title": "Introduction to AI Flavoured",
  //       "body": [
  //         "AI Flavoured is a project that leverages artificial intelligence to revolutionize document comprehension and learning.",
  //         "The platform features advanced summarization engines, interactive communication, multilingual support, and personalized learning experiences.",
  //         "It aims to address challenges such as information overload, complex documents, and language barriers."
  //       ]
  //     }
  //   },
  //   {
  //     "titleAndContent": {
  //       "title": "Project Overview",
  //       "body": [
  //         "AI Flavoured empowers users to efficiently extract insights from written content.",
  //         "The project stands as a beacon of efficiency and clarity in the realm of document comprehension.",
  //         "It offers a dynamic and engaging learning experience for individuals worldwide."
  //       ]
  //     }
  //   },
  //   {
  //     "twoContent": {
  //       "title": "Core Functionalities",
  //       "content": [
  //         "Intelligent Summarization",
  //         "Interactive Engagement",
  //         "Multilingual Support",
  //         "Personalized Learning Experiences"
  //       ],
  //       "content2": [
  //         "Streamlines information retrieval",
  //         "Improves knowledge acquisition",
  //         "Fosters collaboration",
  //         "Enhances learning environments"
  //       ]
  //     }
  //   },
  //   {
  //     "contentWithCaption": {
  //       "title": "Intelligent Summarization",
  //       "content": [
  //         "AI Flavoured's summarization engine condenses complex documents into concise summaries.",
  //         "This feature helps users quickly grasp the essence of lengthy texts."
  //       ],
  //       "caption": "Efficiently extract key insights from vast amounts of information."
  //     }
  //   },
  //   {
  //     "contentWithCaption": {
  //       "title": "Interactive Engagement",
  //       "content": [
  //         "The platform offers interactive communication features to enhance user engagement.",
  //         "Users can interact with the content, ask questions, and receive instant feedback."
  //       ],
  //       "caption": "Foster a more engaging and interactive learning experience."
  //     }
  //   },
  //   {
  //     "contentWithCaption": {
  //       "title": "Multilingual Support",
  //       "content": [
  //         "AI Flavoured supports multiple languages, breaking down language barriers.",
  //         "This feature ensures accessibility for a global audience."
  //       ],
  //       "caption": "Promote inclusivity and accessibility in document comprehension."
  //     }
  //   },
  //   {
  //     "contentWithCaption": {
  //       "title": "Personalized Learning Experiences",
  //       "content": [
  //         "The platform offers personalized learning experiences tailored to individual needs.",
  //         "Users receive recommendations and insights based on their preferences and learning patterns."
  //       ],
  //       "caption": "Enhance learning outcomes through personalized content."
  //     }
  //   },
  //   {
  //     "titleAndContent": {
  //       "title": "Technical Aspects and Benefits",
  //       "body": [
  //         "AI Flavoured showcases the feasibility and operational benefits of AI in document comprehension.",
  //         "It streamlines information retrieval, improves knowledge acquisition, and fosters collaboration.",
  //         "The project aims to stay at the forefront of AI-powered education and knowledge sharing."
  //       ]
  //     }
  //   },
  //   {
  //     "titleSlide": {
  //       "title": "Thank You",
  //       "body": "Thank you for your attention. We hope AI Flavoured will revolutionize your document comprehension and learning experience."
  //     }
  //   }
  // ]
  
  console.log("presentaion function call");

  for(let slide of data){
    let key = Object.keys(slide)[0];
    const maxCharCountForBody = 55;
    const maxCharCountForContent = 35;

    switch(key){
      case "titleAndContent":
        let slideDataTAC = slide[key];
        pptx = titleAndContent(pptx);
        const slideTAC = pptx.addSlide({ masterName: "titleAndContent" });
        const titleTAC = slideDataTAC!.title;
        const bodyTAC = slideDataTAC!.body;
        slideTAC.addText(titleTAC, {
          placeholder: "title",
        });
        if (Array.isArray(bodyTAC)) {
          // bodyTAC is an array of strings
          let bodyTACString = bodyTAC.map((item, index) =>{
          let startsWithNumber = /^\d+/.test(item);  
          let charCount = item.length;
          if (startsWithNumber && charCount > maxCharCountForBody) {
              return `${item} \n`;
          } else if (!startsWithNumber && charCount > maxCharCountForBody) {
              return `${index + 1}. ${item} \n`;
          }else if(charCount < maxCharCountForBody && startsWithNumber){
            return `${item} `;

          }else {
              return `${index + 1}. ${item}`;
          }
          }).join('\n');
          slideTAC.addText(bodyTACString, {
            placeholder: "body",
          });

        } else {
          // bodyTAC is a string
          if(bodyTAC.length > maxCharCountForBody){
            let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
            slideTAC.addText(bodyTACString, {
              placeholder: "body",
            });
          }else{
            slideTAC.addText(bodyTAC, {
              placeholder: "body",
            });
          }// let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');

        }
        break;
      case "twoContent":
        let slideDataTC = slide[key];
        pptx = twoContent(pptx);
        const slideTC = pptx.addSlide({ masterName: "twoContent" });
        const titleTC = slideDataTC!.title;
        const contentTC =  slideDataTC!.content;
        const content2TC =  slideDataTC!.content2;
        slideTC.addText(titleTC, {
          placeholder: "title",
        });
        if (Array.isArray(contentTC)) {
          let contentTCString = contentTC.map((item, index) =>{
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideTC.addText(contentTCString, {
            placeholder: "content",
          });
        } else {
          if (contentTC.length > maxCharCountForContent){
            let contentTCString = contentTC.replace(/\n/g, '\n\n');
          slideTC.addText(contentTCString, {
            placeholder: "content",
          });}else{
            slideTC.addText(contentTC, {
              placeholder: "content",
            });
          }
        }
        
        if (Array.isArray(content2TC)) {
          let content2TCString = content2TC.map((item, index) =>{
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideTC.addText(content2TCString, {
            placeholder: "content2",
          });
        } else {
          if (content2TC.length > maxCharCountForContent){
            let content2TCString = content2TC.replace(/\n/g, '\n\n');
          slideTC.addText(content2TCString, {
            placeholder: "content2",
          });}else{
            slideTC.addText(content2TC, {
              placeholder: "content2",
            });
          
          }
        }
        break;
      case "titleSlide": 
        let slideDataTS = slide[key];
        pptx = titleSlide(pptx);
        const slideTS = pptx.addSlide({ masterName: "titleSlide" });
        const titleTS = slideDataTS!.title;
        const bodyTS = slideDataTS!.body;
        slideTS.addText(titleTS, {
          placeholder: "title",
        });
        if (Array.isArray(bodyTS)) {
          let bodyTSString = bodyTS.map((item, index) => {
            let charCount = item.length;
            if(charCount > maxCharCountForBody){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideTS.addText(bodyTSString, {
            placeholder: "body",
          });
        } else {
          if (bodyTS.length > maxCharCountForBody){
            let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
            slideTS.addText(bodyTSString, {
              placeholder: "body",
            })}else{

              slideTS.addText(bodyTS, {
                placeholder: "body",
              });
            }
        }
        break;
      case "sectionHeader":
        let slideDataSH = slide[key];
        pptx = sectionHeader(pptx);
        const slideSH = pptx.addSlide({ masterName: "sectionHeader" });
        const titleSH = slideDataSH!.title;
        const bodySH = slideDataSH!.body;
        slideSH.addText(titleSH, {
          placeholder: "title",
        });
        if (Array.isArray(bodySH)) {
          let bodySHString = bodySH.map((item, index) => {
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideSH.addText(bodySHString, {
            placeholder: "body",
          });
        } else {
          slideSH.addText(bodySH, {
            placeholder: "body",
          });
        }
        break;
      case "comparison":
        let slideDataC = slide[key];
        pptx = comparison(pptx);
        const slideC = pptx.addSlide({ masterName: "comparison" });
        const titleC = slideDataC!.title;
        const subheadingC = slideDataC!.subheading;
        const subheading2C = slideDataC!.subheading2;
        const contentC = slideDataC!.content;
        const content2C = slideDataC!.content2;
        slideC.addText(titleC, {
          placeholder: "title",
        });
        slideC.addText(subheadingC, {
          placeholder: "subheading",
        });
        slideC.addText(subheading2C, {
          placeholder: "subheading2",
        });
        if (Array.isArray(contentC)) {
          let contentCString = contentC.map((item, index) => {
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideC.addText(contentCString, {
            placeholder: "content",
          });
        } else {
          if (contentC.length > maxCharCountForContent){
            let contentCString = contentC.replace(/\n/g, '\n\n');
          slideC.addText(contentCString, {
            placeholder: "content",
          });}else{
            slideC.addText(contentC, {
              placeholder: "content",
            });
          }

        }
        
        if (Array.isArray(content2C)) {
          let content2CString = content2C.map((item, index) => {
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
              return `${index + 1}. ${item} \n`
            }else{
              return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideC.addText(content2CString, {
            placeholder: "content2",
          });
        } else {
          if(content2C.length > maxCharCountForContent){
            let content2CString = content2C.replace(/\n/g, '\n\n');
            slideC.addText(content2CString, {
              placeholder: "content2",
            });}else{

              slideC.addText(content2C, {
                placeholder: "content2",
              });
            }
        }
        break;
      case "titleOnly":
        let slideDataTO = slide[key];
        pptx = titleOnly(pptx);
        const slideTO = pptx.addSlide({ masterName: "titleOnly" });
        const titleTO = slideDataTO!.title;
        const pictureTO =slideDataTO!.picture;
        slideTO.addText(titleTO, {
          placeholder: "title",
        });
        if (typeof(pictureTO) === 'string') {
          // pictureTO is a string to be displayed
          slideTO.addText(pictureTO, {
            placeholder: "picture",
          });
        } else {
          // pictureTO is a path to an image file
          slideTO.addImage({ path: pictureTO, w: 10.5 , h: 5.5 , placeholder: "picture"});
        }
        break;
      case "blank":
        let slideDataB = slide[key];
        pptx = blank(pptx);
        const slideB = pptx.addSlide({ masterName: "blank" });
        const pictureB = slideDataB!.picture;
        if (typeof(pictureB) === 'string') {
          // pictureB is a string
          slideB.addText(pictureB, {
            placeholder: "picture",
          });
        } else {
          // pictureB is not a string, assuming it's a path to an image
          slideB.addImage({ path: pictureB, w: 11.33 , h: 5.5 , x: 1, y: 1, placeholder: "picture"});
        }
        break;
      case "contentWithCaption":
        let slideDataCWC = slide[key];
        pptx = contentWithCaption(pptx);
        const slideCWC = pptx.addSlide({ masterName: "contentWithCaption" });
        const titleCWC = slideDataCWC!.title;
        const contentCWC = slideDataCWC!.content;
        const captionCWC = slideDataCWC!.caption;
        slideCWC.addText(titleCWC, {
          placeholder: "title",
        });
        if (Array.isArray(contentCWC)) {
          let contentCWCString = contentCWC.map((item, index) =>{
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return `${index + 1}. ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slideCWC.addText(contentCWCString, {
            placeholder: "content",
          });
        } else {
          if (contentCWC.length > maxCharCountForContent){
            let contentCWCString = contentCWC.replace(/\n/g, '\n\n');
            slideCWC.addText(contentCWCString, {
              placeholder: "content",
            })}else{

              slideCWC.addText(contentCWC, {
                placeholder: "content",
              });
            }
        }
        slideCWC.addText(captionCWC, {
          placeholder: "caption",
        });
        break;
      case "pictureWithCaption":
        let slideDataPWC = slide[key];
        pptx = pictureWithCaption(pptx);
        const slidePWC = pptx.addSlide({ masterName: "pictureWithCaption" });
        const titlePWC = slideDataPWC!.title;
        const picturePWC = slideDataPWC!.picture;
        const captionPWC = slideDataPWC!.caption;
        slidePWC.addText(titlePWC, {
          placeholder: "title",
        });
        if (typeof(picturePWC) === 'string') {
          // picturePWC is a string
          slidePWC.addText(picturePWC, {
            placeholder: "picture",
          });
        } else {
          // picturePWC is not a string, assuming it's a path to an image
          slidePWC.addImage({ path: picturePWC, w: 6 , h: 6, placeholder: "picture"});
        }
        slidePWC.addText(captionPWC, {
          placeholder: "caption",
        });
        break;
      default:
        console.log(`No slide found for key : ${key}`)
    }  
  
}
  // Generate a stream
  const streamData = await pptx.stream();
  const buffer = ArrayBuffer.isView(streamData) ? streamData.buffer : undefined;

  // Write the Buffer to a file if it is not undefined
  if (buffer) {
    fs.writeFileSync("output/Presentation.pptx", new Uint8Array(buffer));
  }
  console.log("Exiting");
};
