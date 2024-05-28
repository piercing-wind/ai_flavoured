"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";
import {
      presentationTemplateBlue,
      presentationTemplatePink,
      presentationTemplateGradientPink,
      presentationTemplatePurple,
      varients  
    } from "./imagesData";
import { Base64Image, Localbase64Image, getImagesFromGoogleAsBase64ArrayWithHeaders, localVarientsToBase64, varientsToBase64 } from "./getImagesFromGoogleAndConvertToBase64";
import { convertSlidesStringToObject } from "./convertSlidesStringToObject";
import { PresentaionData } from "./presentation";
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
      const fontFaceTitle = "Calibri Light (Headings)"
      const fontFace = 'Calibri'

      // Title section settings
      const titlex = 0.5;
      const titley = 0.5;
      const titlew = 12.83;
      const titleh = 1.5;
      const titleFontSize = 36;
      const titleFontFace = fontFaceTitle;
      const titleColor = colors.title;
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Content section settings
      const contentx = 0.5;
      const contenty = 2;
      const contentw = 12.33;
      const contenth = 5;
      const contentFontSize = 18;
      const contentFontFace = fontFace;
      const contentColor = colors.body;
      const contentAlign = "left";
      const contentValign = "top";
    
      //leftbody
      const leftBodyx = 0.5;
      const leftBodyy = 2;
      const leftBodyw = 6.165;
      const leftBodyh = 5;
      const leftBodyFontSize = 18;
      const leftBodyFontFace = fontFace ;
      const leftBodyColor = colors.body;
      const leftBodyAlign = "left";
      const leftBodyValign = "top";
    
      //rightbody
      const rightBodyx = 6.665;
      const rightBodyy = 2;
      const rightBodyw = 6.165;
      const rightBodyh = 5;
      const rightBodyFontSize = 18;
      const rightBodyFontFace = fontFace;
      const rightBodyColor = colors.body;
      const rightBodyAlign = "left";
      const rightBodyValign = "top";
    
      pptx.defineSlideMaster({
        title: `titleAndContent`,
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: titleFontFace,
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
                bold : false,
                fontSize: contentFontSize,
                color: contentColor,
                align: contentAlign,
                valign : contentValign,
                fontFace: contentFontFace,
              },
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
                bold : false,
                fontSize: leftBodyFontSize,
                color:  leftBodyColor,
                align: leftBodyAlign,
                valign : leftBodyValign,
                fontFace: leftBodyFontFace,
                margin : 0.2
              },
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
                bold : false,
                fontSize: rightBodyFontSize,
                color:  rightBodyColor,
                align: rightBodyAlign,
                valign : rightBodyValign,
                fontFace: rightBodyFontFace,
              },
            },
          },
          
          // Footer
          {
            text: {
              text: "Made with Ai Flavoured",
              options: {
                x: 0.5,
                y: "90%",
                w: 13.33,
                h: 0.5,
                fontSize: 14,
                color: "FFC0CB",
                align: "right",
                fontFace: fontFace,
              },
            },
          },
        ],
        slideNumber: { x: 0.5, y: "94%", w: 0.7, h: 0.4 , color : colors.title, fontFace: "Calibri"},
      });
      return pptx;
    };
const twoContent = async (pptx: pptxgen, colors : TBColor, model : string) => {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      // Title section settings
      const titlex = 0.5;
      const titley = 0.5;
      const titlew = 12.83;
      const titleh = 1.5;
      const titleFontSize = 36;
      const titleFontFace = FontFacetitle;
      const titleColor = colors.title;
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Left content section settings
      const leftContentx = 0.5;
      const leftContenty = 2;
      const leftContentw = 6.165;
      const leftContenth = 5;
      const leftContentFontSize = 18;
      const leftContentFontFace = bodyFontFace;
      const leftContentColor = colors.body;
      const leftContentAlign = "left";
      const leftContentValign = "top";
    
      // Right content section settings
      const rightContentx = 7.665;
      const rightContenty = 2;
      const rightContentw = 6.165;
      const rightContenth = 5;
      const rightContentFontSize = 18;
      const rightContentFontFace = bodyFontFace;
      const rightContentColor = colors.body;
      const rightContentAlign = "left";
      const rightContentValign = "top";
    
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: titleFontFace,
              },
              text: "Title Placeholder",
            },
          },
      
          // Left Content
          {
            placeholder: {
              options: {
                name: "leftContent",
                type: "body",
                x: leftContentx,
                y: leftContenty,
                w: leftContentw,
                h: leftContenth,
                bold : false,
                fontSize: leftContentFontSize,
                color: leftContentColor,
                align: leftContentAlign,
                valign : leftContentValign,
                fontFace: leftContentFontFace,
              },
            },
          },
          
          // Right Content
          {
            placeholder: {
              options: {
                name: "rightContent",
                type: "body",
                x: rightContentx,
                y: rightContenty,
                w: rightContentw,
                h: rightContenth,
                bold : false,
                fontSize: rightContentFontSize,
                color: rightContentColor,
                align: rightContentAlign,
                valign : rightContentValign,
                fontFace: rightContentFontFace,
              },
            },
          },
          
          // Footer
          {
                text: {
              text: "Made with Ai Flavoured",
              options: {
                x: 0.5,
                y: "90%",
                w: 14.5,
                h: 0.5,
                fontSize: 14,
                color: "FFC0CB",
                align: "right",
                fontFace: "Calibri",
              },
            },
          },
        ],
        slideNumber: { x: 0.5, y: "94%", w: 0.7, h: 0.4 , color : colors.title, fontFace: "Calibri"},
      });
      return pptx;
    };
const titleSlide = async (pptx: pptxgen, colors: TBColor, model: string) => {
      const FontFacetitle = "Calibri Light (Headings)";
      const bodyFontFace = "Calibri";
    
      // Title section settings
      const titlex = 1;
      const titley = 2.5;
      const titlew = 11;
      const titleh = 2;
      const titleFontSize = 54;
      const titleFontFace = FontFacetitle;
      const titleColor = colors.title;
      const titleAlign = "center";
      const titleValign = "middle";
    
      // Subtitle section settings
      const subtitlex = 1;
      const subtitley = 4.5;
      const subtitlew = 11;
      const subtitleh = 1.5;
      const subtitleFontSize = 24;
      const subtitleFontFace = bodyFontFace;
      const subtitleColor = colors.body;
      const subtitleAlign = "right";
      const subtitleValign= "top";
    
      pptx.defineSlideMaster({
        title: `titleSlide`,
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: titleFontFace,
              },
              text: "Title Placeholder",
            },
          },
    
          // Subtitle
          {
            placeholder: {
              options: {
                name: "subtitle",
                type: "body",
                x: subtitlex,
                y: subtitley,
                w: subtitlew,
                h: subtitleh,
                bold: false,
                fontSize: subtitleFontSize,
                color: subtitleColor,
                align: subtitleAlign,
                valign: subtitleValign,
                fontFace: subtitleFontFace,
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
                y: "90%",
                w: 13,
                h: 0.5,
                fontSize: 16,
                color: "FFC0CB",
                align: "right",
                fontFace: bodyFontFace,
              },
            },
          },
        ],
        slideNumber: { x: 1, y: "94%", w: 0.7, h: 0.4, color: colors.title, fontFace: "Calibri" },
      });
    
      return pptx;
    };
const sectionHeader = async (pptx: pptxgen, colors : TBColor, model : string) => {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      
      // Title section settings
      const titlex = 0.5;
      const titley = 2;
      const titlew = 12.33;
      const titleh = 2;
      const titleFontSize = 40;
      const titleFontFace = FontFacetitle;
      const titleColor = colors.title;
      const titleAlign = "right";
      const titleValign = "middle";
    
      // Subtitle section settings
      const subtitlex = 0.5;
      const subtitley = 4;
      const subtitlew = 12.33;
      const subtitleh = 1.5;
      const subtitleFontSize = 20;
      const subtitleFontFace = bodyFontFace;
      const subtitleColor = colors.body;
      const subtitleAlign = "center";
      const subtitleValign = "top";
    
      pptx.defineSlideMaster({
        title: `sectionHeader`,
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: titleFontFace,
              },
              text: "Title Placeholder",
            },
          },
      
          // Subtitle
          {
            placeholder: {
              options: {
                name: "subtitle",
                type: "body",
                x: subtitlex,
                y: subtitley,
                w: subtitlew,
                h: subtitleh,
                bold : false,
                fontSize: subtitleFontSize,
                color: subtitleColor,
                align: subtitleAlign,
                valign : subtitleValign,
                fontFace: subtitleFontFace,
              },
              text: "Subtitle Placeholder",
            },
          },
          
          // Footer
          {
            text: {
              text: "Made with Ai Flavoured",
              options: {
                x: 0.5,
                y: "90%",
                w: 14.5,
                h: 0.5,
                fontSize: 14,
                color: "FFC0CB",
                align: "right",
                fontFace: bodyFontFace,
              },
            },
          },
        ],
        slideNumber: { x: 0.5, y: "94%", w: 0.7, h: 0.4 , color : colors.title, fontFace: "Calibri"},
      });
      return pptx;
    };
const comparison = async (pptx: pptxgen, colors : TBColor , model : string )=> {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      
      // Title section settings
      const titlex = 1;
      const titley = 0.25;
      const titlew = 11.41;
      const titleh = 1.5;
      const titleFontSize = 36;
      const titleColor = colors.title;
      const titleAlign = "left";
      const titleValign = "top";

      // Subheading section settings
      const subx = 1;
      const suby = 2;
      const subw = 5.5;
      const subh = 1;
      const subFontSize = 24;
      const subColor = colors.title;
      const subAlign = "center";
      const subValign = "middle";
      
      // Second subheading section settings
      const sub2x = 7;
      const sub2y = 2;
      const sub2w = 5.5;
      const sub2h = 1;
      const sub2FontSize = 24;
      const sub2Color = colors.title;
      const sub2Align = "center";
      const sub2Valign = "middle";
    
      // Content section settings
      const contentx = 1;
      const contenty = 3;
      const contentw = 5.5;
      const contenth = 3.5;
      const contentFontSize = 18;
      const contentColor = colors.body;
      const contentAlign = "left";
      const contentValign = "top";
    
      // Second content section settings
      const content2x = 7;
      const content2y = 3;
      const content2w = 5.5;
      const content2h = 3.5;
      const content2FontSize = 18;
      const content2Color = colors.body;
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: FontFacetitle,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
              },
            },
          },
        ],
        slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
      });
      return pptx;
    }
const titleOnly = async (pptx: pptxgen, colors : TBColor , model : string )=> {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      // Title section settings
      const titlex = 1;
      const titley = 0.25;
      const titlew = 11.41;
      const titleh = 1.5;
      const titleFontSize = 36;
      const titleColor = colors.title;
      const titleAlign = "center";
      const titleValign = "middle";
    
      pptx.defineSlideMaster({
        title: `titleOnly`,
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: FontFacetitle,
              },
              text: "Title Placeholder",
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
                fontFace: bodyFontFace,
              },
            },
          },
      ],
        slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
      });
      return pptx;
    }
const blank = async (pptx: pptxgen , model : string )=> {

    const fontFace = "Arial";
    
     
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
                     fontFace: fontFace,
                   },
                 },
               },
             ],
             slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : bodyColor},
      });
      return pptx;
    }
const contentWithCaption = async (pptx: pptxgen, colors : TBColor , model : string ) => {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      // Title section settings
      const titlex = 0.5;
      const titley = 1.5;
      const titlew = 6;
      const titleh = 1.5;
      const titleFontSize = 20;
      const titleColor = colors.title;
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Content section settings
      const contentx = 7;
      const contenty = 1.5;
      const contentw = 5.5;
      const contenth = 6;
      const contentFontSize = 18;
      const contentColor = colors.body;
      const contentAlign = "left";
      const contentValign = "middle";
    
      // Caption section settings
      const captionx = 0.5;
      const captiony = 2.5;
      const captionw = 6;
      const captionh = 4;
      const captionFontSize = 14;
      const captionColor = colors.body;
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
                fontSize: titleFontSize,
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: FontFacetitle,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
              },
            },
          },
      ],
        slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
      });
    
      return pptx;
}
const pictureWithCaption = async (pptx: pptxgen, colors : TBColor , model : string )=> {
      const FontFacetitle = "Calibri Light (Headings)"
      const bodyFontFace = 'Calibri'
      // Title section settings
      const titlex = 0.5;
      const titley = 0.5;
      const titlew = 6;
      const titleh = 1.5;
      const titleFontSize = 24;
      const titleColor = colors.title;
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Picture section settings
      const picturex = 7;
      const picturey = 0.5;
      const picturew = 5.5;
      const pictureh = 6;
    
      // Caption section settings
      const captionx = 0.5;
      const captiony = 2.5;
      const captionw = 6;
      const captionh = 4;
      const captionFontSize = 18;
      const captionColor = colors.body;
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
                color: titleColor,
                bold: true,
                align: titleAlign,
                valign: titleValign,
                fontFace: bodyFontFace,
              },
              text: FontFacetitle,
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
              text: "Picture Placeholder",
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
                fontFace: bodyFontFace,
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
                fontFace: bodyFontFace,
              },
            },
          },
        ],
        slideNumber: { x: 0.1, y: "94%", w: 0.7, h: 0.4, color : colors.title},
      });
      return pptx;
    }

export const facetPresentation = async ({author, title, pptxData, imageSearch, modelForColorAndTitle, userId}: PresentaionData) => {
      console.log("presentaion function call");
      try {
        let templatePicker = Math.floor(Math.random() * 4);
        const templates = [presentationTemplateBlue, presentationTemplatePink, presentationTemplatePurple,presentationTemplateGradientPink];
        const colorsTB = [{title: "1a1d27", body: "030f25"}, {title: "ffb8ea", body: "f2e8ef"}, {title: "3b0145", body: "f6e6f9"}, {title: "0c151b", body: "1d2428"}];
      //   const base64Images = await varientsToBase64(templates[templatePicker]) as Base64Image[] ; 
        const varient  =  varients.facet  
        const base64Images = await localVarientsToBase64(varient) as  Localbase64Image[]
        const colors : TBColor = {title: "ffb8ea", body: "f2e8ef"}; 
    
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

      let index = 0
      for(let slide of data){
        let key = Object.keys(slide)[0];
        
        const maxCharCountForBody = 55;
        const maxCharCountForContent = 35;
    
        // const link = base64Images[index].link;
        const base64 = base64Images[index].base64;
        const mime = base64Images[index].mime;
        const lineSpacing: number = 50;
    
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
                      lineSpacing :lineSpacing,
                      lineSpacingMultiple : 2.0
      
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
                        lineSpacing :lineSpacing,
                        lineSpacingMultiple : 2.0
                  });
                    
                      if(points > 20 ){
                        const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                        const newTitleTAC = slideDataTAC!.title;
                        newSlideTAC.addText(newTitleTAC, {
                              placeholder :"title"
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
                  lineSpacing :lineSpacing,
                  lineSpacingMultiple : 2.0
                });
              }
              } else {
                console.log("bodyTAC is a string")
                // bodyTAC is a strin
                if(bodyTAC.length < maxCharCountForBody){
                  let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
                  slideTAC.addText(bodyTACString, {
                    placeholder: "body",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 2.0
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
                  console.log(lineSpacing)
                  slideTC.addText(contentTCString, {
                    placeholder: "leftContent",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                    glow: {size: 10, color: "ff0000", opacity: 1}
                  });
                } else {
                  if (contentTC.length > maxCharCountForContent){
                    let contentTCString = contentTC.replace(/\n/g, '\n\n');
                  slideTC.addText(contentTCString, {
                    placeholder: "leftContent",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                    glow: {size: 10, color: "ff0000", opacity: 1}
                  });}else{
                    slideTC.addText(contentTC, {
                      placeholder: "leftContent",
                      lineSpacing :lineSpacing,
                      lineSpacingMultiple : 1.5,
                      glow: {size: 10, color: "ff0000", opacity: 1}
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
                    placeholder: "rightContent",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                    glow: {size: 10, color: "ff0000", opacity: 1}
                  });
                } else {
                  if (content2TC.length > maxCharCountForContent){
                    let content2TCString = content2TC.replace(/\n/g, '\n\n');
                  slideTC.addText(content2TCString, {
                    placeholder: "rightContent",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                    glow: {size: 10, color: "ff0000", opacity: 1}
                  });}else{
                    slideTC.addText(content2TC, {
                      placeholder: "rightContent",
                      lineSpacing :lineSpacing,
                      lineSpacingMultiple : 1.5,
                      glow: {size: 10, color: "ff0000", opacity: 1}
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
                    placeholder: "subtitle",
                    lineSpacing :lineSpacing
                  });
                } else {
                  if (bodyTS.length > 50){
                    let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
                    slideTS.addText(bodyTSString, {
                      placeholder: "subtitle",
                      lineSpacing :lineSpacing
                    })}else{
        
                      slideTS.addText(bodyTS, {
                        placeholder: "subtitle",
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
                placeholder: "subtitle",
                lineSpacing :lineSpacing
              });
            } else {
              slideSH.addText(bodySH, {
                placeholder: "subtitle",
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
            console.log("exiting")
            fs.writeFileSync("output/FacetPresentation.pptx", new Uint8Array(buffer));
            //     const bufferString = Buffer.from(buffer)
      //     const pptxBufferBase64 = bufferString.toString('base64')
      //     const fileName = `${title}_AiFlavoured.pptx`
      //     const fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      //     const fileSize = buffer?.byteLength;
      //     // const param = await createChatSession(userId,fileName)
      //     const data = {
      //       fileName,
      //       fileType,
      //       fileSize,
      //       pptxBufferBase64,
      //     }
      //     console.log("exitng from presention")
      //     return data;
    
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
    