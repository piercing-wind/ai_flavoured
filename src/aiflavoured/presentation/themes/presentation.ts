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
    caption: string | string[];
  };
}

type Presentation = Slides[]
type TBColor = {
  title: string;
  body: string;
};
type Font = {
  title: string;
  body: string;
};


const titleAndContent = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors: TBColor = await getTheBestColorForTitleAndSubheading(model , dominantColors);

  // Title section settings
  const titlex = 1;
    const titley = 0.25;
    const titlew = 11.41;
    const titleh = 1.3;
    const titleFontSize = 40;
    const titleAlign = "center";
    const titleValign = "middle";

    // Content section settings
    const contentx = 1;
    const contenty = 1.55;                      
    const contentw = 11.41;
    const contenth = 5.5;
    const contentFontSize = 26;
    const contentAlign = "left";
    const contentValign = "top";
    
    //leftbody
    const leftBodyx = 0.5;
    const leftBodyy = 1.55;
    const leftBodyw = 6;
    const leftBodyh = 5.5;
    const leftBodyFontSize = 26;
    const leftBodyAlign = "left";
    const leftBodyValign = "top";

    //rightbody
    const rightBodyx = 6.5;
    const rightBodyy = 1.55;
    const rightBodyw = 6;
    const rightBodyh = 5.5;
    const rightBodyFontSize = 26;
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
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: contentAlign,
            valign : contentValign,
            fontFace: font.body,
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
            fontSize: leftBodyFontSize,
            align: leftBodyAlign,
            valign : leftBodyValign,
            fontFace: font.body,
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
            fontSize: rightBodyFontSize,
            align: rightBodyAlign,
            valign : rightBodyValign,
            fontFace: font.body,
          },
          // text: "Content Placeholder",
        },
      },
      
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ]
  });
  return pptx;
};
const titleSlide =async (pptx: pptxgen, font: Font, waterMark : boolean ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleAlign = "center";
  const titleValign = "middle";

  //Body section settings
  const bodyx = 1;
  const bodyy = 3.75;
  const bodyw = 11.41;
  const bodyh = 3;
  const bodyFontSize = 22;
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
            bold: true,
            fontSize: titleFontSize,
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: bodyAlign,
            valign : bodyValign,
            fontFace: font.body,
          },
          text: "Content Placeholder",
        },
      },
  
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ],
  });
return pptx;
}
const sectionHeader = async (pptx: pptxgen,font : Font, waterMark : boolean ) => {

  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 3.5;
  const titleFontSize = 40;
  const titleAlign = "center";
  const titleValign = "middle";

  //Subtitle section settings
  const subx = 1;
  const suby = 3.75;
  const subw = 11.41;
  const subh = 3;
  const subFontSize = 23;
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
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: subAlign,
            valign : subValign,
            fontFace: font.title,
          },
          text: "Subtitle Placeholder",
        },
      },
  
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ],
  });
  return pptx;
}
const twoContent = async (pptx: pptxgen,font : Font, waterMark : boolean ) => {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0;
  const titlew = 11.41;
  const titleh = 1;
  const titleFontSize = 40;
  const titleAlign = "center";
  const titleValign = "middle";

  //Content section settings
  const contentx = 1;
  const contenty = 1.5;
  const contentw = 5.5;
  const contenth = 4.5;
  const contentFontSize = 25;
  const contentAlign = "left";
  const contentValign = "top";

  //Second content section settings
  const content2x = 7;
  const content2y = 1.5;
  const content2w = 5.5;
  const content2h = 4.5;
  const content2FontSize = 25;
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: `twoContent`,
    objects: [
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
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: contentAlign,
            valign : contentValign,
            fontFace: font.body,
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
            align: content2Align,
            valign : content2Valign,
            fontFace: font.body,
          },
          text: "Second Content Placeholder",
        },
      },

      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ],
  });
  return pptx;
}
const comparison = async (pptx: pptxgen, font:Font, waterMark : boolean )=> {
  // const dominantColors : string = await histogram(bgimage);
  // const colors = await getTheBestColorForTitleAndSubheading(model , dominantColors);
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleAlign = "center";
  const titleValign = "middle";

  // Subheading section settings
  const subx = 1;
  const suby = 2;
  const subw = 5.5;
  const subh = 1;
  const subFontSize = 30;
  const subAlign = "center";
  const subValign = "middle";

  // Second subheading section settings
  const sub2x = 7;
  const sub2y = 2;
  const sub2w = 5.5;
  const sub2h = 1;
  const sub2FontSize = 30;
  const sub2Align = "center";
  const sub2Valign = "middle";

  // Content section settings
  const contentx = 1;
  const contenty = 3;
  const contentw = 5.5;
  const contenth = 3.5;
  const contentFontSize = 22;
  const contentAlign = "left";
  const contentValign = "top";

  // Second content section settings
  const content2x = 7;
  const content2y = 3;
  const content2w = 5.5;
  const content2h = 3.5;
  const content2FontSize = 22;
  const content2Align = "left";
  const content2Valign = "top";

  pptx.defineSlideMaster({
    title: `comparison`,
    objects: [
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
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            bold: true,
            fontSize: subFontSize,
            align: subAlign,
            valign : subValign,
            fontFace: font.body,
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
            align: sub2Align,
            valign : sub2Valign,
            fontFace: font.body,
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
            align: contentAlign,
            valign : contentValign,
            fontFace: font.body,
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
            align: content2Align,
            valign : content2Valign,
            fontFace: font.body,
          },
          text: "Second Content Placeholder",
        },
      },

      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ],
  });
  return pptx;
}
const titleOnly = async (pptx: pptxgen,font : Font, waterMark : boolean ) => {
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1;
  const titleFontSize = 40;
  const titleAlign = "center";
  const titleValign = "middle";

  //picture section settings
  const picturex = 1.5;
  const picturey = 1.25;
  const picturew = 10.5;
  const pictureh = 5.5;
  const bodyFontSize = 20;
  const bodyAlign = "center";
  const bodyValign = "middle";


  pptx.defineSlideMaster({
    title: `titleOnly`,
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
            bold: true,
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: bodyAlign,
            valign: bodyValign,
            fontFace: font.body,
          },
          text: "body Placeholder",
        },
      },
  
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ]
  });
  return pptx;
}
const blank = async (pptx: pptxgen,font: Font, waterMark :boolean)  => {
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
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ]
  });
  return pptx;
}
const contentWithCaption = async (pptx: pptxgen,font: Font, waterMark : boolean ) => {
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
  const titleAlign = "left";
  const titleValign = "middle";

  // Content section settings
  const contentx = 7;
  const contenty = 0.5;
  const contentw = 5.5;
  const contenth = 6;
  const contentFontSize = 22;
  const contentAlign = "left";
  const contentValign = "middle";

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2.5;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionAlign = "left";
  const captionValign = "top";


  pptx.defineSlideMaster({
    title: `contentWithCaption`,
    objects: [
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
            bold: true,
            fontSize: titleFontSize,
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
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
            align: contentAlign,
            valign : contentValign,
            fontFace: font.body,
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
            align: captionAlign,
            valign : captionValign,
            fontFace: font.body,
          },
          text: "Caption Placeholder",
        },
      },

      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ]
  });
  
  return pptx;
}
const pictureWithCaption = async (pptx: pptxgen,font: Font, waterMark : boolean ) => {
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 6;
  const titleh = 1.5;
  const titleFontSize = 40;
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
  const captionAlign = "left";
  const captionValign = "top";

  pptx.defineSlideMaster({
    title: `pictureWithCaption`,
    objects: [
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
            align: titleAlign,
            valign: titleValign,
            fontFace: font.title,
          },
          text: "Title Placeholder",
        },
      },

      // Picture
      {
        placeholder: {
          options: {
            name: "picture",
            type: "pic",
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
            align: captionAlign,
            valign : captionValign,
            fontFace: font.body,
          },
          text: "Caption Placeholder",
        },
      },

      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: '95%',
          w: 3,
          h: 0.28,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: font.body,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '95%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: font.body,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
  ]
  });

  return pptx;
}

export type PresentationData = {
  author : string,
  title : string,
  pptxData : string | Object ,  
  imageSearch : string,
  waterMark : boolean,
  variant? : string
}

export const presentation = async ({author, title, pptxData, imageSearch, waterMark}: PresentationData) => {
  console.log("presentaion function call");
  try {
    let templatePicker = Math.floor(Math.random() * 4);
    const templates = [presentationTemplateBlue, presentationTemplatePink, presentationTemplatePurple,presentationTemplateGradientPink];
    const colorsTB = [{title: "1a1d27", body: "030f25"}, {title: "ffb8ea", body: "f2e8ef"}, {title: "3b0145", body: "f6e6f9"}, {title: "0c151b", body: "1d2428"}];
    
    const base64Images = await varientsToBase64(templates[templatePicker]) as Base64Image[] ; 
    const font :Font = {title: "Arial", body: "Arial"}; 
    const colors : TBColor = colorsTB[templatePicker];
    let pptx = new pptxgen();

    // Set PPTX Author and Company
    pptx.author = author;
    pptx.title = title;
  
    // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
    pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
    pptx.rtlMode = true;
    pptx.theme = { headFontFace: "Arial Light", bodyFontFace: "Calibri" };
    

  // const data: Presentation = await convertSlidesStringToObject(pptxData);
  const data : Presentation = [
    {
      "titleAndContent": {
        "title": "Content List",
        "body": [
          "Introduction to AI Flavoured",
          "Project Overview",
          "Core Functionalities",
          "Intelligent Summarization",
          "Interactive Engagement",
          "Multilingual Support",
          "Personalized Learning Experiences",
          "Technical Aspects and Benefits",
          "Future Scopes",
          "Thank You"
        ]
      }
    },
    {
      "titleSlide":{
            "title" : "Introduction to AI Flavoured",
            "body" : "AI Flavoured is a project that leverages artificial intelligence to revolutionize document comprehension and learning."
      }
    },
    {
      "titleAndContent": {
        "title": "Introduction to AI Flavoured",
        "body": [
          "AI Flavoured is a project that leverages artificial intelligence to revolutionize document comprehension and learning.",
          "The platform features advanced summarization engines, interactive communication, multilingual support, and personalized learning experiences.",
          "It aims to address challenges such as information overload, complex documents, and language barriers."
        ]
      }
    },
    {
      "sectionHeader":{
            "title" : "Project Overview",
            "body" : "AI Flavoured empowers users to efficiently extract insights from written content."
      }
    },
    {
      "twoContent": {
        "title": "Core Functionalities",
        "content": [
          "Intelligent Summarization",
          "Interactive Engagement",
          "Multilingual Support",
          "Personalized Learning Experiences"
        ],
        "content2": [
          "Streamlines information retrieval",
          "Improves knowledge acquisition",
          "Fosters collaboration",
          "Enhances learning environments"
        ]
      }
    },
    {
      "comparison":{
            "title" : "Core Functionalities",
            "subheading": "Core Functionalities",
            "content": ["Intelligent Summarization", "Interactive Engagement", "Multilingual Support", "Personalized Learning Experiences"],
            "subheading2": "Benefits",
            "content2" : ["Streamlines information retrieval", "Improves knowledge acquisition", "Fosters collaboration", "Enhances learning environments"]
      }
    },
    {
      "contentWithCaption": {
        "title": "Intelligent Summarization",
        "content": [
          "AI Flavoured's summarization engine condenses complex documents into concise summaries.",
          "This feature helps users quickly grasp the essence of lengthy texts."
        ],
        "caption": "Efficiently extract key insights from vast amounts of information."
      }
    },
    {
      "contentWithCaption": {
        "title": "Interactive Engagement",
        "content": [
          "The platform offers interactive communication features to enhance user engagement.",
          "Users can interact with the content, ask questions, and receive instant feedback."
        ],
        "caption": "Foster a more engaging and interactive learning experience."
      }
    },
    {
      "contentWithCaption": {
        "title": "Multilingual Support",
        "content": [
          "AI Flavoured supports multiple languages, breaking down language barriers.",
          "This feature ensures accessibility for a global audience."
        ],
        "caption": "Promote inclusivity and accessibility in document comprehension."
      }
    },
    {
      "contentWithCaption": {
        "title": "Personalized Learning Experiences",
        "content": [
          "The platform offers personalized learning experiences tailored to individual needs.",
          "Users receive recommendations and insights based on their preferences and learning patterns."
        ],
        "caption": "Enhance learning outcomes through personalized content."
      }
    },
    {
      "titleAndContent": {
        "title": "Technical Aspects and Benefits",
        "body": [
          "AI Flavoured showcases the feasibility and operational benefits of AI in document comprehension.",
          "It streamlines information retrieval, improves knowledge acquisition, and fosters collaboration.",
          "The project aims to stay at the forefront of AI-powered education and knowledge sharing."
        ]
      }
    },
    {
      "titleSlide": {
        "title": "Thank You",
        "body": "Thank you for your attention. We hope AI Flavoured will revolutionize your document comprehension and learning experience."
      }
    }
  ]

  let slideNumber = 1
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
          pptx = await titleAndContent(pptx, font, waterMark );
          const slideTAC = pptx.addSlide({ masterName: `titleAndContent` });
          const titleTAC = slideDataTAC!.title;
          const bodyTAC = slideDataTAC!.body;
          slideTAC.background = { data: base64};
          slideTAC.addText(titleTAC, {
        color: colors.title,
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
          color: colors.body,
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
            color: colors.body,
            placeholder: "body",
            lineSpacing :lineSpacing
          });
            
          if(points > 20 ){
            const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
            const newTitleTAC = slideDataTAC!.title;
            newSlideTAC.addText(newTitleTAC, {
              color: colors.title,
              placeholder :"title",
            })
            const leftPoints = bodyTAC.slice(20, bodyTAC.length).join('\n');
            newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, color : colors.body, placeholder :"leftBody"})
            newSlideTAC.addText(slideNumber.toString(), {
              color: colors.body,
              placeholder: 'slideNumber'
            });
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
          color: colors.body,
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
            color: colors.body,
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
            slideTAC.addText(leftBody, { x: 0.5, y: 1.55, lineSpacing: lineSpacing, color : colors.body, placeholder :"leftBody"});
            slideTAC.addText(rightBody, { x: 6.5, y: 1.55, lineSpacing: lineSpacing,color : colors.body,  placeholder :"rightBody"});
          }else{
            
            slideTAC.addText(bodyTAC, {
          color: colors.body,
          placeholder: "body",
            });
          }
          if(points.length > 20 ){
            const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
            const newTitleTAC = slideDataTAC!.title;
            newSlideTAC.addText(newTitleTAC, {
          color: colors.title,
          placeholder :"title",
            })
            const leftPoints = points.slice(20, points.length).join('\n');
            newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, placeholder :"leftBody"})
          }
        }// let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
      
          }
          slideTAC.addText(slideNumber.toString(), {
        color: colors.body,
        placeholder: 'slideNumber'
          });
          break;
      case "twoContent":
        let slideDataTC = slide[key];
        pptx = await twoContent(pptx, font, waterMark);
        const slideTC = pptx.addSlide({ masterName: `twoContent` });
        const titleTC = slideDataTC!.title;
        const contentTC =  slideDataTC!.content;
        const content2TC =  slideDataTC!.content2;
        slideTC.background = { data: base64};
        slideTC.addText(titleTC, {
          color: colors.title,
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
            color: colors.body,
            placeholder: "content",
            lineSpacing :lineSpacing
          });
        } else {
          if (contentTC.length > maxCharCountForContent){
            let contentTCString = contentTC.replace(/\n/g, '\n\n');
          slideTC.addText(contentTCString, {
            color: colors.body,
            placeholder: "content",
            lineSpacing :lineSpacing
          });}else{
            slideTC.addText(contentTC, {
          color: colors.body,
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
            color: colors.body,
            placeholder: "content2",
          });
        } else {
          if (content2TC.length > maxCharCountForContent){
            let content2TCString = content2TC.replace(/\n/g, '\n\n');
          slideTC.addText(content2TCString, {
            color: colors.body,
            placeholder: "content2",
          });}else{
            slideTC.addText(content2TC, {
          color: colors.body,
          placeholder: "content2",
            });
          
          }
        }
        slideTC.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;    
      case "titleSlide": 
        let slideDataTS = slide[key];
        pptx =await titleSlide(pptx, font, waterMark);
        const slideTS = pptx.addSlide({ masterName: `titleSlide` });
        const titleTS = slideDataTS!.title;
        const bodyTS = slideDataTS!.body;
        slideTS.background = { data: base64};
        slideTS.addText(titleTS, {
          color: colors.title,
          placeholder: "title",
          fit: 'shrink',
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
            color: colors.body,
            placeholder: "body",
            lineSpacing :lineSpacing
          });
        } else {
          if (bodyTS.length > 50){
            let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
            slideTS.addText(bodyTSString, {
          color: colors.body,
          placeholder: "body",
          lineSpacing :lineSpacing
            })}else{
        
          slideTS.addText(bodyTS, {
            color: colors.body,
            placeholder: "body",
            lineSpacing :lineSpacing
          });
            }
        }
        slideTS.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;
      case "sectionHeader":
        let slideDataSH = slide[key];
        pptx =await sectionHeader(pptx, font, waterMark);
        const slideSH = pptx.addSlide({ masterName: "sectionHeader" });
        const titleSH = slideDataSH!.title;
        const bodySH = slideDataSH!.body;
        slideSH.background = { data: base64};
        slideSH.addText(titleSH, {
          placeholder: "title",
          color: colors.title,
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
        lineSpacing :lineSpacing,
        color: colors.body,
          });
        } else {
          slideSH.addText(bodySH, {
        placeholder: "body",
        lineSpacing :lineSpacing,
        color: colors.body,
          });
        }
        slideSH.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;
      case "comparison":
        let slideDataC = slide[key];
        pptx =await comparison(pptx, font, waterMark);
        const slideC = pptx.addSlide({ masterName: "comparison" });
        const titleC = slideDataC!.title;
        const subheadingC = slideDataC!.subheading;
        const subheading2C = slideDataC!.subheading2;
        const contentC = slideDataC!.content;
        const content2C = slideDataC!.content2;
        slideC.background = { data: base64};
        slideC.addText(titleC, {
          placeholder: "title",
          color: colors.title,
        });
        slideC.addText(subheadingC, {
          placeholder: "subheading",
          color: colors.body,
        });
        slideC.addText(subheading2C, {
          placeholder: "subheading2",
          color: colors.body,
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
        lineSpacing :lineSpacing,
        color: colors.body,
          });
        } else {
          if (contentC.length > maxCharCountForContent){
        let contentCString = contentC.replace(/\n/g, '\n\n');
        slideC.addText(contentCString, {
          placeholder: "content",
          lineSpacing :lineSpacing,
          color: colors.body,
        });
          }else{
        slideC.addText(contentC, {
          placeholder: "content",
          lineSpacing :lineSpacing,
          color: colors.body,
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
        color: colors.body,
          });
        } else {
          if(content2C.length > maxCharCountForContent){
        let content2CString = content2C.replace(/\n/g, '\n\n');
        slideC.addText(content2CString, {
          placeholder: "content2",
          color: colors.body,
        });
          }else{
        slideC.addText(content2C, {
          placeholder: "content2",
          color: colors.body,
        });
          }
        }
        slideC.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;
      case "titleOnly":
        let slideDataTO = slide[key];
        pptx =await titleOnly(pptx, font, waterMark);
        const slideTO = pptx.addSlide({ masterName: "titleOnly" });
        const titleTO = slideDataTO!.title;
        const pictureTO =slideDataTO!.picture;
        slideTO.background = { data: base64};
        slideTO.addText(titleTO, {
          placeholder: "title",
          color: colors.title,
        });
        if (typeof(pictureTO) === 'string') {
          // imageSearch variable === "Google Search"
          // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(pictureTO) as string;
          slideTO.addImage({ path: 'public/public/darkThemeMoon/comparison', w: 10.5 , h: 5.5 , placeholder: "picture"});
          // pictureTO is a string to be displayed
          // slideTO.addText(pictureTO, {
          //   placeholder: "picture",
          // });
        }
        slideTO.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;  
      case "blank":
        let slideDataB = slide[key];
        pptx =await blank(pptx, font, waterMark);
        const slideB = pptx.addSlide({ masterName: "blank" });
        const pictureB = slideDataB!.picture;
        // slideB.addShape(pptxgen.)
        slideB.addShape(pptx.ShapeType.rect, {
          x: 0.5,
          y: 0.5,
          w: '95%',
          h: '95%',
          fill: {
          type: 'solid',
          color: 'FFC0CB',   
          }
      });
        if (typeof(pictureB) === 'string') {
          //imageSearch variable === "Google Search"
          // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(pictureB) as string;            
          slideB.addImage({ path: "public/darkThemeMoon/comparison", w: 11.33 , h: 5.5 , x: 1, y: 1, placeholder: "picture"});
        }
        slideB.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;
      case "contentWithCaption":
        let slideDataCWC = slide[key];
        pptx =await contentWithCaption(pptx, font, waterMark);
        const slideCWC = pptx.addSlide({ masterName: "contentWithCaption" });
        const titleCWC = slideDataCWC!.title;
        const contentCWC = slideDataCWC!.content;
        const captionCWC = slideDataCWC!.caption;
        slideCWC.background = { data: base64};
        slideCWC.addText(titleCWC, {
          color: colors.title,
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
        color: colors.body,
        placeholder: "content",
        lineSpacing :lineSpacing
          });
        } else {
          if (contentCWC.length > maxCharCountForContent){
        let contentCWCString = contentCWC.replace(/\n/g, '\n\n');
        slideCWC.addText(contentCWCString, {
          color: colors.body,
          placeholder: "content",
          lineSpacing :lineSpacing
        })}else{
          slideCWC.addText(contentCWC, {
            color: colors.body,
            placeholder: "content",
            lineSpacing :lineSpacing
          });
        }
        }
        slideCWC.addText(captionCWC, {
          color: colors.body,
          placeholder: "caption",
        });
        slideCWC.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;  
      case "pictureWithCaption":
        let slideDataPWC = slide[key];
        pptx =await pictureWithCaption(pptx, font, waterMark);
        const slidePWC = pptx.addSlide({ masterName: `pictureWithCaption` });
        const titlePWC = slideDataPWC!.title;
        const picturePWC = slideDataPWC!.picture;
        const captionPWC = slideDataPWC!.caption;
        slidePWC.background = { data: base64};
        slidePWC.addText(titlePWC, {
          color: colors.title,
          placeholder: "title",
        });
        if (typeof(picturePWC) === 'string') {
          //imageSearch variable === "Google Search"
          const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(picturePWC) as string;
          slidePWC.addImage({ data: base64WithHeader, w: 6 , h: 6, placeholder: "picture"});
        } 
        if(Array.isArray(captionPWC)){
          let captionPWCString = captionPWC.map((item, index) =>{
            let charCount = item.length;
            if(charCount > maxCharCountForContent){
          return ` ${item} \n`
            }else{
             return `${index + 1}. ${item}`
            }
          }).join('\n');
          slidePWC.addText(captionPWCString, {
            color : colors.body,
            placeholder: "caption",
          });
        }else{
        slidePWC.addText(captionPWC, {
          color : colors.body,
          placeholder: "caption",
        });}

        slidePWC.addText(slideNumber.toString(), {
          color: colors.body,
          placeholder: 'slideNumber'
        });
        break;
      default:
        console.log(`No slide found for key : ${key}`)
    }  
    index++;
    slideNumber++;
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
      fs.writeFileSync(`output/${title}.pptx`, bufferString);
      const pptxBufferBase64 = bufferString.toString('base64')
      const fileName = `${title}_AiFlavoured.pptx`
      const fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const fileSize = buffer?.byteLength;
      const filePath = `output/${title}.pptx`
      // const param = await createChatSession(userId,fileName)
      const data = {
        fileName,
        fileType,
        fileSize,
        pptxBufferBase64,
        filePath
      }
      console.log("exitng from presention")
      return data;
  
  //     const datapdf = await uploadToS3(fileName.replace(".pptx", ".pdf"), "application/pdf", pdfBuffer.byteLength, userId, param);

  //     const datapptx = await uploadToS3(fileName, fileType, fileSize, userId, param);
    
    
  //     if (datapptx && 'awsS3' in datapptx) {
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
