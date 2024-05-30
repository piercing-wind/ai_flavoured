"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";
import { histogram } from "@/aiflavoured/imgs/histogram";
import { getTheBestColorForTitleAndSubheading, getTheTopicOfPresentaionAI, getTheTopicOfPresentaionAITweaker } from "../getTheTopicOfPresentaionAI";
import { 
  getImagesFromGoogle,
  getImagesFromGoogleAsBase64ArrayWithoutHeaders, 
  getImagesFromGoogleAsBase64ArrayWithHeaders,
  Base64Image, 
  varientsToBase64
} from "../getImagesFromGoogleAndConvertToBase64";
import { convertSlidesStringToObject } from "../convertSlidesStringToObject";
import {
  presentationTemplateBlue,
  presentationTemplatePink,
  presentationTemplateGradientPink,
  presentationTemplatePurple,

} from "../imagesData"
//comments are witten by sourabh!
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
type TBColor = {
  title: string;
  body: string;
};


const titleAndContent = async (pptx: pptxgen, colors : TBColor, model : string) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors: TBColor = await getTheBestColorForTitleAndSubheading(model , dominantColors);

  // Title section settings
  const titlex = 1;
    const titley = 0.25;
    const titlew = 11.41;
    const titleh = 1.3;
    const titleFontSize = 40;
    const titleColor = colors.title;
    const titleAlign = "center";
    const titleValign = "middle";

    // Content section settings
    const contentx = 1;
    const contenty = 1.55;                      
    const contentw = 11.41;
    const contenth = 5.5;
    const contentFontSize = 26;
    const contentColor = colors.body;
    const contentAlign = "left";
    const contentValign = "top";
    
    //leftbody
    const leftBodyx = 0.5;
    const leftBodyy = 1.55;
    const leftBodyw = 6;
    const leftBodyh = 5.5;
    const leftBodyFontSize = 26;
    const leftBodyColor = colors.body;
    const leftBodyAlign = "left";
    const leftBodyValign = "top";

    //rightbody
    const rightBodyx = 6.5;
    const rightBodyy = 1.55;
    const rightBodyw = 6;
    const rightBodyh = 5.5;
    const rightBodyFontSize = 26;
    const rightBodyColor = colors.body;
    const rightBodyAlign = "left";
    const rightBodyValign = "top";


  pptx.defineSlideMaster({
    title: `titleAndContent`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },

      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
            bold : true,
            fontSize: contentFontSize,
            color: contentColor,
            align: contentAlign,
            valign : contentValign,
            fontFace: "Arial",
          },
          // text: "Content Placeholder",
        },
      },
      {
        placeholder: {
          options: {
            name: "leftBody",
            type: "body",
            x: leftBodyx,
            y: leftBodyy,
            w: leftBodyw,
            h: leftBodyh,
            bold : true,
            fontSize: leftBodyFontSize,
            color:  leftBodyColor,
            align: leftBodyAlign,
            valign : leftBodyValign,
            fontFace: "Arial",
          },
          // text: "Content Placeholder",
        },
      },
      {
        placeholder: {
          options: {
            name: "rightBody",
            type: "body",
            x: rightBodyx,
            y: rightBodyy,
            w: rightBodyw,
            h: rightBodyh,
            bold : true,
            fontSize: rightBodyFontSize,
            color:  rightBodyColor,
            align: rightBodyAlign,
            valign : rightBodyValign,
            fontFace: "Arial",
          },
          // text: "Content Placeholder",
        },
      },
      
      // Footer
      {
        text: {
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4 , color : colors.title},
  });
  return pptx;
};
const titleSlide =async (pptx: pptxgen, colors : TBColor , model : string ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "center";
  const titleValign = "middle";

  //Body section settings
  const bodyx = 1;
  const bodyy = 3.75;
  const bodyw = 11.41;
  const bodyh = 3;
  const bodyFontSize = 22;
  const bodyColor = colors.body;
  const bodyAlign = "left";
  const bodyValign = "top";



  pptx.defineSlideMaster({
    title: `titleSlide`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } }
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4 , color : colors.title},
  });
return pptx;
}
const sectionHeader = async (pptx: pptxgen, colors : TBColor , model : string ) => {

  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "center";
  const titleValign = "middle";

  //Subtitle section settings
  const subx = 1;
  const suby = 3.75;
  const subw = 11.41;
  const subh = 3;
  const subFontSize = 23;
  const subColor = colors.body;
  const subAlign = "center";
  const subValign = "middle";

  pptx.defineSlideMaster({
    title: `sectionHeader`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4 , color : colors.title},
  });
  return pptx;
}
const twoContent = async (pptx: pptxgen, colors : TBColor , model : string ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0;
  const titlew = 11.41;
  const titleh = 1;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "center";
  const titleValign = "middle";

  //Content section settings
  const contentx = 1;
  const contenty = 1.5;
  const contentw = 5.5;
  const contenth = 4.5;
  const contentFontSize = 25;
  const contentColor = colors.body;
  const contentAlign = "left";
  const contentValign = "top";

  //Second content section settings
  const content2x = 7;
  const content2y = 1.5;
  const content2w = 5.5;
  const content2h = 4.5;
  const content2FontSize = 25;
  const content2Color = colors.body;
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: `twoContent`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
            bold : true,
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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
  });
  return pptx;
}
const comparison = async (pptx: pptxgen, colors : TBColor , model : string )=> {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "center";
  const titleValign = "middle";

  // Subheading section settings
  const subx = 1;
  const suby = 2;
  const subw = 5.5;
  const subh = 1;
  const subFontSize = 30;
  const subColor = colors.title;
  const subAlign = "center";
  const subValign = "middle";

  // Second subheading section settings
  const sub2x = 7;
  const sub2y = 2;
  const sub2w = 5.5;
  const sub2h = 1;
  const sub2FontSize = 30;
  const sub2Color = colors.title;
  const sub2Align = "center";
  const sub2Valign = "middle";

  // Content section settings
  const contentx = 1;
  const contenty = 3;
  const contentw = 5.5;
  const contenth = 3.5;
  const contentFontSize = 22;
  const contentColor = colors.body;
  const contentAlign = "left";
  const contentValign = "top";

  // Second content section settings
  const content2x = 7;
  const content2y = 3;
  const content2w = 5.5;
  const content2h = 3.5;
  const content2FontSize = 22;
  const content2Color = colors.body;
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: `comparison`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
            bold : true,
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
            bold : true,
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
            bold : true,
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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
  });
  return pptx;
}
const titleOnly = async (pptx: pptxgen, colors : TBColor , model : string ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "center";
  const titleValign = "middle";

  //picture section settings
  const picturex = 1.5;
  const picturey = 1.25;
  const picturew = 10.5;
  const pictureh = 5.5;
  const bodyFontSize = 20;
  const bodyColor = colors.body;
  const bodyAlign = "center";
  const bodyValign = "middle";


  pptx.defineSlideMaster({
    title: `titleOnly`,
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
  });
  return pptx;
}
const blank = async (pptx: pptxgen, model : string)  => {
    //picture section settings
    const picturex = 1;
    const picturey = 1;
    const picturew = 11.33;
    const pictureh = 5.5;
    const bodyFontSize = 20;
    const bodyColor = "000000";
    const bodyAlign = "center";
    const bodyValign = "middle";

  pptx.defineSlideMaster({
    title: `blank`,
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4,color : "000000" },
  });
  return pptx;
}
const contentWithCaption = async (pptx: pptxgen,  colors : TBColor , model : string ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = colors.title;
  const titleAlign = "left";
  const titleValign = "middle";

  // Content section settings
  const contentx = 7;
  const contenty = 0.5;
  const contentw = 5.5;
  const contenth = 6;
  const contentFontSize = 22;
  const contentColor = colors.body;
  const contentAlign = "left";
  const contentValign = "middle";

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2.5;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionColor = colors.body;
  const captionAlign = "left";
  const captionValign = "top";


  pptx.defineSlideMaster({
    title: `contentWithCaption`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },
  
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
            bold : true,
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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    
    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
  });
  
  return pptx;
}
const pictureWithCaption = async (pptx: pptxgen, colors : TBColor , model : string ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleColor = colors.title;
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
  const captionColor = colors.body;
  const captionAlign = "left";
  const captionValign = "top";

  pptx.defineSlideMaster({
    title: `pictureWithCaption`,
    objects: [
      // Background
      // { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ff1a9c" } } },
      // { image: { x:0, y:0, w:'100%', h:'100%', path: bgimage, sizing : {type : 'cover', w: '100%', h: '100%'}} },

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
            bold : true,
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
          text: "Made with Ai Flavoured",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6.5,
            fontSize: 14,
            color: "FFC0CB",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],

    slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
  });

  return pptx;
}

export type PresentaionData = {
  author : string,
  title : string,
  pptxData : string,  
  imageSearch : string,
  modelForColorAndTitle : string,
  waterMark : boolean,
}

export const presentation = async ({author, title, pptxData, imageSearch, modelForColorAndTitle, waterMark}: PresentaionData) => {
  console.log("presentaion function call");
  try {
    let templatePicker = Math.floor(Math.random() * 4);
    const templates = [presentationTemplateBlue, presentationTemplatePink, presentationTemplatePurple,presentationTemplateGradientPink];
    const colorsTB = [{title: "1a1d27", body: "030f25"}, {title: "ffb8ea", body: "f2e8ef"}, {title: "3b0145", body: "f6e6f9"}, {title: "0c151b", body: "1d2428"}];
    const base64Images = await varientsToBase64(templates[templatePicker]) as Base64Image[] ; 
    const colors : TBColor = colorsTB[templatePicker]; 

    let pptx = new pptxgen();

    // Set PPTX Author and Company
    pptx.author = author;
    pptx.title = title;
  
    // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
    pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
    pptx.rtlMode = true;
    pptx.theme = { headFontFace: "Arial Light", bodyFontFace: "Calibri" };
    

  const data: Presentation = await convertSlidesStringToObject(pptxData);
  let index = 0
  for(let slide of data){
    let key = Object.keys(slide)[0];

    const maxCharCountForBody = 55;
    const maxCharCountForContent = 35;

    // const link = base64Images[index].link;
    const base64 = base64Images[index].base64;
    const mime = base64Images[index].mime;
    const lineSpacing = 42;

      switch(key){        
      case "titleAndContent":
          let slideDataTAC = slide[key];
          pptx = await titleAndContent(pptx, colors, modelForColorAndTitle);
          const slideTAC = pptx.addSlide({ masterName: `titleAndContent` });
          const titleTAC = slideDataTAC!.title;
          const bodyTAC = slideDataTAC!.body;
          slideTAC.background = { data: base64};
          slideTAC.addText(titleTAC, {
            placeholder: "title",
          });
          if (Array.isArray(bodyTAC)) {
            // bodyTAC is an array of strings
            const points = bodyTAC.length;

            if(points > 10){
              const leftPoints = bodyTAC.slice(0, 10);
              const rightPoints = bodyTAC.slice(10, bodyTAC.length);
              let leftBodyTACString = leftPoints.map((item, index) =>{
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
                slideTAC.addText(leftBodyTACString, {
                  placeholder: "body",
                  lineSpacing :lineSpacing
                });
                let rightBodyTACString = rightPoints.map((item, index) =>{
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
                  slideTAC.addText(rightBodyTACString, {
                    placeholder: "body",
                    lineSpacing :lineSpacing
                  });
                
                  if(points > 20 ){
                    const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                    const newTitleTAC = slideDataTAC!.title;
                    newSlideTAC.addText(newTitleTAC, {
                      placeholder :"title",
                    })
                    const leftPoints = bodyTAC.slice(20, bodyTAC.length).join('\n');
                    newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, placeholder :"leftBody"})
                  }

            }else{          
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
              lineSpacing :lineSpacing
            });
          }
          } else {
            console.log("bodyTAC is a string")
            // bodyTAC is a strin
            if(bodyTAC.length < maxCharCountForBody){
              let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
              slideTAC.addText(bodyTACString, {
                placeholder: "body",
                lineSpacing :lineSpacing
              });
            }else{
              const points = bodyTAC.split('\n');
              if(points.length > 10) {
                const leftPoints = points.slice(0, 10);
                const rightPoints = points.slice(10, points.length);
                const leftBody = leftPoints.join('\n');
                const rightBody = rightPoints.join('\n');
                slideTAC.addText(leftBody, { x: 0.5, y: 1.55, lineSpacing: lineSpacing, placeholder :"leftBody"});
                slideTAC.addText(rightBody, { x: 6.5, y: 1.55, lineSpacing: lineSpacing, placeholder :"rightBody"});
              }else{
                
                slideTAC.addText(bodyTAC, {
                  placeholder: "body",
                });
              }
              if(points.length > 20 ){
                const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                const newTitleTAC = slideDataTAC!.title;
                newSlideTAC.addText(newTitleTAC, {
                  placeholder :"title",
                })
                const leftPoints = points.slice(20, points.length).join('\n');
                newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, placeholder :"leftBody"})
              }
            }// let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
  
          }
          break;
      case "twoContent":
            let slideDataTC = slide[key];
            pptx = await twoContent(pptx, colors, modelForColorAndTitle);
            const slideTC = pptx.addSlide({ masterName: `twoContent` });
            const titleTC = slideDataTC!.title;
            const contentTC =  slideDataTC!.content;
            const content2TC =  slideDataTC!.content2;
            slideTC.background = { data: base64};
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
                lineSpacing :lineSpacing
              });
            } else {
              if (contentTC.length > maxCharCountForContent){
                let contentTCString = contentTC.replace(/\n/g, '\n\n');
              slideTC.addText(contentTCString, {
                placeholder: "content",
                lineSpacing :lineSpacing
              });}else{
                slideTC.addText(contentTC, {
                  placeholder: "content",
                  lineSpacing :lineSpacing
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
            pptx =await titleSlide(pptx, colors, modelForColorAndTitle);
            const slideTS = pptx.addSlide({ masterName: `titleSlide` });
            const titleTS = slideDataTS!.title;
            const bodyTS = slideDataTS!.body;
            slideTS.background = { data: base64};
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
                lineSpacing :lineSpacing
              });
            } else {
              if (bodyTS.length > 50){
                let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
                slideTS.addText(bodyTSString, {
                  placeholder: "body",
                  lineSpacing :lineSpacing
                })}else{
    
                  slideTS.addText(bodyTS, {
                    placeholder: "body",
                    lineSpacing :lineSpacing
                  });
                }
            }
            break;
      case "sectionHeader":
        let slideDataSH = slide[key];
        pptx =await sectionHeader(pptx, colors, modelForColorAndTitle);
        const slideSH = pptx.addSlide({ masterName: "sectionHeader" });
        const titleSH = slideDataSH!.title;
        const bodySH = slideDataSH!.body;
        slideSH.background = { data: base64};
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
            lineSpacing :lineSpacing
          });
        } else {
          slideSH.addText(bodySH, {
            placeholder: "body",
            lineSpacing :lineSpacing
          });
        }
        break;
      case "comparison":
        let slideDataC = slide[key];
        pptx =await comparison(pptx, colors, modelForColorAndTitle);
        const slideC = pptx.addSlide({ masterName: "comparison" });
        const titleC = slideDataC!.title;
        const subheadingC = slideDataC!.subheading;
        const subheading2C = slideDataC!.subheading2;
        const contentC = slideDataC!.content;
        const content2C = slideDataC!.content2;
        slideC.background = { data: base64};
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
            lineSpacing :lineSpacing
          });
        } else {
          if (contentC.length > maxCharCountForContent){
            let contentCString = contentC.replace(/\n/g, '\n\n');
          slideC.addText(contentCString, {
            placeholder: "content",
            lineSpacing :lineSpacing
          });}else{
            slideC.addText(contentC, {
              placeholder: "content",
              lineSpacing :lineSpacing
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
        pptx =await titleOnly(pptx, colors, modelForColorAndTitle);
        const slideTO = pptx.addSlide({ masterName: "titleOnly" });
        const titleTO = slideDataTO!.title;
        const pictureTO =slideDataTO!.picture;
        slideTO.background = { data: base64};
        slideTO.addText(titleTO, {
          placeholder: "title",
        });
        if (typeof(pictureTO) === 'string') {
          // imageSearch variable === "Google Search"
          const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(pictureTO) as string;
          slideTO.addImage({ data: base64WithHeader, w: 10.5 , h: 5.5 , placeholder: "picture"});
          // pictureTO is a string to be displayed
          // slideTO.addText(pictureTO, {
          //   placeholder: "picture",
          // });
        }
        break;  
      case "blank":
        let slideDataB = slide[key];
        pptx =await blank(pptx, modelForColorAndTitle);
        const slideB = pptx.addSlide({ masterName: "blank" });
        const pictureB = slideDataB!.picture;
        // slideB.addShape(pptxgen.)
        slideB.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
          fill: {
              type: 'solid',
              color: 'FFC0CB',  
   
          }
      });
        if (typeof(pictureB) === 'string') {
          //imageSearch variable === "Google Search"
          const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(pictureB) as string;            
          slideB.addImage({ path: base64WithHeader, w: 11.33 , h: 5.5 , x: 1, y: 1, placeholder: "picture"});
        }
        break;
      case "contentWithCaption":
        let slideDataCWC = slide[key];
        pptx =await contentWithCaption(pptx, colors, modelForColorAndTitle);
        const slideCWC = pptx.addSlide({ masterName: "contentWithCaption" });
        const titleCWC = slideDataCWC!.title;
        const contentCWC = slideDataCWC!.content;
        const captionCWC = slideDataCWC!.caption;
        slideCWC.background = { data: base64};
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
            lineSpacing :lineSpacing
          });
        } else {
          if (contentCWC.length > maxCharCountForContent){
            let contentCWCString = contentCWC.replace(/\n/g, '\n\n');
            slideCWC.addText(contentCWCString, {
              placeholder: "content",
              lineSpacing :lineSpacing
            })}else{

              slideCWC.addText(contentCWC, {
                placeholder: "content",
                lineSpacing :lineSpacing
              });

            }
        }
        slideCWC.addText(captionCWC, {
          placeholder: "caption",
        });
        break;  
      case "pictureWithCaption":
        let slideDataPWC = slide[key];
        pptx =await pictureWithCaption(pptx, colors, modelForColorAndTitle);
        const slidePWC = pptx.addSlide({ masterName: `pictureWithCaption` });
        const titlePWC = slideDataPWC!.title;
        const picturePWC = slideDataPWC!.picture;
        const captionPWC = slideDataPWC!.caption;
        slidePWC.background = { data: base64};
        slidePWC.addText(titlePWC, {
          placeholder: "title",
        });
        if (typeof(picturePWC) === 'string') {
          //imageSearch variable === "Google Search"
          const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(picturePWC) as string;
          slidePWC.addImage({ data: base64WithHeader, w: 6 , h: 6, placeholder: "picture"});
        } 
        slidePWC.addText(captionPWC, {
          placeholder: "caption",
        });
        break;
      default:
        console.log(`No slide found for key : ${key}`)
    }  
    index++;
    if (index >= base64Images.length) {
      index = 0;
    }
  }
  // Generate a stream
  try {
    console.log("Generating Stream");
    const streamData = await pptx.stream();
    const buffer = ArrayBuffer.isView(streamData) ? streamData.buffer : undefined;
    
    if (buffer) {
      const bufferString = Buffer.from(buffer)
      const pptxBufferBase64 = bufferString.toString('base64')
      const fileName = `${title}_AiFlavoured.pptx`
      const fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const fileSize = buffer?.byteLength;
      // const param = await createChatSession(userId,fileName)
      const data = {
        fileName,
        fileType,
        fileSize,
        pptxBufferBase64,
      }
      console.log("exitng from presention")
      return data;
  
  //     const datapdf = await uploadToS3(fileName.replace(".pptx", ".pdf"), "application/pdf", pdfBuffer.byteLength, userId, param);

  //     const datapptx = await uploadToS3(fileName, fileType, fileSize, userId, param);
    
    
  //     if ('awsS3' in datapptx) {
  //     const uploadUrl = datapptx.awsS3.url;
  //     const res = await fetch(uploadUrl, {
  //       //uploading file to s3
  //       method: "PUT",
  //       body: buffer,
  //       headers: {
  //         "Content-Type": fileType,
  //       },
  //     });
  //     if(res.ok){
  //       console.log(`/aipresentation/${param}`)
  //       return `/aipresentation/${param}`;
  //     }
  // // ...
  //   }
      // const outputPath = "output/Presentation.pptx";
      // fs.writeFileSync(outputPath, new Uint8Array(buffer));
      // console.log(`Presentation written to ${outputPath}`);
    } else {
      console.error("Failed to generate buffer from streamData");
    }
  } catch (streamError) {
    console.error("Error generating stream:", streamError);
  } 
} catch (e) {
    console.log("Error generating pptx",e);
  }
};
