"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";
import {
      presentationTemplateBlue,
      presentationTemplatePink,
      presentationTemplateGradientPink,
      presentationTemplatePurple,
      varients ,
      themes,
    } from "../imagesData";
import { Base64Image, Localbase64Image, getImagesFromGoogleAsBase64ArrayWithHeaders, localVarientsToBase64, varientsToBase64 } from "../getImagesFromGoogleAndConvertToBase64";
import { convertSlidesStringToObject } from "../convertSlidesStringToObject";
import { PresentaionData } from "./presentation";
import libre from "libreoffice-convert";
import { add } from "lodash";
interface Slides {
  intro?: {
    title: string;
    body:  string;
  };
      titleSlide?: {
            title: string;
            body: string[] | string;
      };
      titleAndContent?: {
            title: string;
            body: string[] |string;
      };
      sectionTitle?: {
            title: string;
            picture: string[] | string;
      };
      twoContent?: {
        title: string;
        content: string[] | string;
        content2: string[] | string;
    };
  overview?: {
    title: string;
    content: string[] | string;
    picture: string;
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
  team?: {
    title: string;
    first: {
      name: string;
      picture: string;
    };
    second: {
      name: string;
      picture: string;
    };
    third: {
      name: string;
      picture: string;
    };
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
//start the slide with title only
//then intro

//title and body
const intro = async (pptx: pptxgen , font : Font, waterMark : boolean )=> {
  const FontFacetitle = font.title
  const bodyFontFace = font.body
  // Title section settings
  const titlex = 1;
  const titley = 0.35;
  const titlew = 5.67;
  const titleh = 2.6;
  const titleFontSize = 32;
  const titleAlign = "center";
  const titleValign = "middle";
  
  //body section setting
  
  const bodyx = 1;
  const bodyy = 3.11;
  const bodyw = 5.67;
  const bodyh = 3.42;
  const bodyFontSize = 20;
  const bodyAlign = "center";
  const bodyValign = "middle";


  pptx.defineSlideMaster({
    title: `intro`,
    objects: [
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
            fontFace: FontFacetitle,
          },
          text: "Title Placeholder",
        },
      },
      {
        placeholder:{
          options: {
            name: "body",
            type: "body",
            x: bodyx,
            y: bodyy,
            w: bodyw,
            h: bodyh,
            fontSize: bodyFontSize,
            align: bodyAlign,
            valign: bodyValign,
            fontFace: bodyFontFace,
          },
          text: "Body Placeholder",
        
        }
      },
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: 4,
          w: 3.3,
          h: 6.5,
          bold: true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: bodyFontFace,
        },
      },
    }, 
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '94%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: bodyFontFace,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
  ]
  });
  return pptx;
}
const titleSlide = async (pptx: pptxgen,font : Font, waterMark : boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.body;

  // Title section settigs
  const titlex = 0.73;
  const titley = 0.36;
  const titlew = 9.46;
  const titleh = 2.74;
  const titleFontSize = 60;
  const titleFontFace = FontFacetitle;
  const titleAlign = "left";
  const titleValign = "bottom";

  // Subtitle section settings
  const subtitlex = 0.73;
  const subtitley = 3.75;
  const subtitlew = 11.33;
  const subtitleh = 1.5;
  const subtitleFontSize = 28;
  const subtitleFontFace = bodyFontFace;
  const subtitleAlign = "left";
  const subtitleValign= "top";

  pptx.defineSlideMaster({
    title: `titleSlide`,
    objects: [
      // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
      //   type: 'outer',
      //   color: '000000',
      //   blur: 15,
      //   offset: 2,
      //   angle: 45,
      //   opacity: 0.5
      // } } },
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
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: 4,
          w: 3.3,
          h: 6.5,
          fontSize: 14,
          color: "f41c76",
          bold : true,
          align: "right",
          fontFace: bodyFontFace,
        },
      },
    },
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '94%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: bodyFontFace,
        },
        text: "SlideNumber Placeholder",
      
      }
    },
    ],
  });

  return pptx;
};
const titleAndContent = async (pptx: pptxgen, font :Font, waterMark : boolean) => {
   
      const fontFaceTitle = font.title;
      const fontFace = font.body;
      // Title section settings
      const titlex = 1;
      const titley = 0.4;
      const titlew = 7.96;
      const titleh = 1.8;
      const titleFontSize = 32;
      const titleFontFace = fontFaceTitle;
      const titleAlign = "center";
      const titleValign = "middle";
    
      // Content section settings
      const contentx = 1;
      const contenty = 2.2;
      const contentw = 7.96;
      const contenth = 4.55;
      const contentFontSize = 20;
      const contentFontFace = fontFace;
      const contentAlign = "left";
      const contentValign = "top";
    
      //leftbody
      const leftBodyx = 0.71;
      const leftBodyy = 2;
      const leftBodyw = 5.76;
      const leftBodyh = 4.8;
      const leftBodyFontSize = 20;
      const leftBodyFontFace = fontFace ;
      const leftBodyAlign = "left";
      const leftBodyValign = "top";
    
      //rightbody
      const rightBodyx = 6.67;
      const rightBodyy = 2;
      const rightBodyw = 5.76;
      const rightBodyh = 4.8;
      const rightBodyFontSize = 20;
      const rightBodyFontFace = fontFace;
      const rightBodyAlign = "left";
      const rightBodyValign = "top";
    
      pptx.defineSlideMaster({
        title: `titleAndContent`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                align: rightBodyAlign,
                valign : rightBodyValign,
                fontFace: rightBodyFontFace,
              },
            },
          },
          
          // Footer
          {
            text: {
            text: waterMark ? "Made with Ai Flavoured" : "",
            options: {
              x: 10,
              y: 4,
              w: 3.3,
              h: 6.5,
              bold : true,
              fontSize: 14,
              color: "f41c76",
              align: "right",
            },
          },
        },
        {
          placeholder:{
            options: {
              name: "slideNumber",
              type: "body",
              x: 0.5,
              y: '94%',
              w: 0.7,
              h: 0.4,
              fontSize: 12,
              align: 'center',
              valign: 'middle',
              fontFace: fontFace,
            },
            text: "SlideNumber Placeholder",
          
          }
        },
        ]
      });
      return pptx;
    };
const team = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
  const fontFaceTitle = font.title;
  const fontFaceBody = font.body;

      // Title section settings
      const titlex = 1;
      const titley = 0.39;
      const titlew = 11.33;
      const titleh = 1.18;
      const titleFontSize = 36;
      const titleFontFace = fontFaceTitle;
      const titleAlign = "center";
      const titleValign = "middle";

    
      // Left picture section settings
         const lpicNamex = 0.6;
         const lpicNamey = 5.9;
         const lpicNamew = 3.19;
         const lpicNameh = 1; 
         const lpicFontSize = 20;
         const lpicFontFace = fontFaceTitle;
         const lpicAlign = "center";
         const lpicVAlign = "middle";

         //Picture section settings
           const lpicturex = 0.6;
           const lpicturey = 2.61;
           const lpicturew = 3.19;
           const lpictureh = 3.19;

      //Middle Content section settings
        const mpicNamex = 5.02;
        const mpicNamey = 5.07;
        const mpicNamew = 3.19;
        const mpicNameh = 1;
        const mpicFontSize = 20;
        const mpicFontFace = fontFaceTitle;
        const mpicAlign = "center";
        const mpicVAlign = "middle";

         // Picture section settings
          const mpicturex = 5.07;
          const mpicturey = 1.66;
          const mpicturew = 3.19;
          const mpictureh = 3.19;
    
      // Right content section settings
        const rpicNamex = 9.44;
        const rpicNamey = 5.97;
        const rpicNamew = 3.19;
        const rpicNameh = 1;
        const rpicFontSize = 20;
        const rpicFontFace = fontFaceTitle;
        const rpicAlign = "center";
        const rpicVAlign = "middle";

       // Picture section settings
          const rpicturex = 9.44;
          const rpicturey = 2.64;
          const rpicturew = 3.19;
          const rpictureh = 3.19;
    
      pptx.defineSlideMaster({
        title: `team`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                fontFace: titleFontFace,
              },
              text: "Title Placeholder",
            },
          },
      
          // Left Content
          {
            placeholder: {
              options:{
                name : "lpicName",
                type : "body",
                x: lpicNamex,
                y: lpicNamey,
                w: lpicNamew,
                h: lpicNameh,
                fontSize: lpicFontSize,
                align: lpicAlign,
                valign : lpicVAlign,
                fontFace: lpicFontFace,
              }
            }
          },

            {
            placeholder: {
              options: {
                name: "lpic",
                type: "pic",
                x: lpicturex,
                y: lpicturey,
                w: lpicturew,
                h: lpictureh,
            },
              text: "Picture Placeholder",
            },
          },
          //middle
          {
            placeholder: {
              options:{
                name : "mpicName",
                type : "body",
                x: mpicNamex,
                y: mpicNamey,
                w: mpicNamew,
                h: mpicNameh,
                fontSize: mpicFontSize,
                align: mpicAlign,
                valign : mpicVAlign,
                fontFace: mpicFontFace,
              }
            }
          },
          {
            placeholder: {
              options: {
                name: "mpic",
                type: "pic",
                x: mpicturex,
                y: mpicturey,
                w: mpicturew,
                h: mpictureh,
            },
              text: "Picture Placeholder",
            },
          },
          // Right Content
          {
            placeholder: {
              options:{
                name : "rpicName",
                type : "body",
                x: rpicNamex,
                y: rpicNamey,
                w: rpicNamew,
                h: rpicNameh,
                fontSize: rpicFontSize,
                align: rpicAlign,
                valign : rpicVAlign,
                fontFace: rpicFontFace,
              }
            }
          },
          {
            placeholder: {
              options: {
                name: "rpic",
                type: "pic",
                x: rpicturex,
                y: rpicturey,
                w: rpicturew,
                h: rpictureh,
            },
              text: "Picture Placeholder",
            },
          },
          
          // Footer
          {
            text: {
            text:  waterMark ? "Made with Ai Flavoured" : "",
            options: {
              x: 10,
              y: 4,
              w: 3.3,
              h: 6.5,
              bold: true,
              fontSize: 14,
              color: "f41c76",
              align: "right",
              fontFace: fontFaceBody,
            },
          },
        },
        {
          placeholder:{
            options: {
              name: "slideNumber",
              type: "body",
              x: 0.5,
              y: '94%',
              w: 0.7,
              h: 0.4,
              fontSize: 12,
              align: 'center',
              valign: 'middle',
              fontFace: fontFaceBody,
            },
            text: "SlideNumber Placeholder",
          
          }
        }
        ],
      });
      return pptx;
    };
// 1 section and half image on right    
const sectionTitle = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
      const FontFacetitle = font.title;
      const bodyFontFace = font.title;
      
      // Title section settings
      const titlex = 1;
      const titley = 2.8;
      const titlew = 5.68;
      const titleh = 3.68;
      const titleFontSize = 40;
      const titleFontFace = FontFacetitle;
      const titleAlign = "center";
      const titleValign = "middle";
    
      // Subtitle section settings
      const picturex = 6.65;
      const picturey = 0;
      const picturew = 6.68;
      const pictureh = 7.5;
    
      pptx.defineSlideMaster({
        title: `sectionTitle`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                fontFace: titleFontFace,
              },
              text: "Title Placeholder",
            },
          },
      
          // Subtitle
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
              text: "Subtitle Placeholder",
            },
          },
          // Footer
          {
            text: {
            text:  waterMark ? "Made with Ai Flavoured" : "",
            options: {
              x: 10,
              y: 4,
              w: 3.3,
              h: 6.5,
              bold : true,
              fontSize: 14,
              color: "f41c76",
              align: "right",
              fontFace: bodyFontFace,
            },
          },
        },
        {
          placeholder:{
            options: {
              name: "slideNumber",
              type: "body",
              x: 0.5,
              y: '94%',
              w: 0.7,
              h: 0.4,
              fontSize: 12,
              align: 'center',
              valign: 'middle',
              fontFace: bodyFontFace,
            },
            text: "SlideNumber Placeholder",
          
          }
        }
        ],
      });
      return pptx;
    };
const comparison = async (pptx: pptxgen , font : Font, waterMark : boolean )=> {
      const FontFacetitle = font.title
      const bodyFontFace = font.body
      
      // Title section settings
      const titlex = 1;
      const titley = 0.48;
      const titlew = 11.33;
      const titleh = 1.2;
      const titleFontSize = 32;
      const titleAlign = "center";
      const titleValign = "middle";

      // Subheading section settings
      const subx = 0.72;
      const suby = 1.73;
      const subw = 5.5;
      const subh = 1;
      const subFontSize = 24;
      const subAlign = "center";
      const subValign = "middle";
      
      // Second subheading section settings
      const sub2x = 7.2;
      const sub2y = 1.73;
      const sub2w = 5.5;
      const sub2h = 1;
      const sub2FontSize = 24;
      const sub2Align = "center";
      const sub2Valign = "middle";
    
      // Content section settings
      const contentx = 0.8;
      const contenty = 2.88;
      const contentw = 5.86;
      const contenth = 3.62;
      const contentFontSize = 18;
      const contentAlign = "left";
      const contentValign = "top";
    
      // Second content section settings
      const content2x = 6.83;
      const content2y = 2.87;
      const content2w = 5.86;
      const content2h = 3.62;
      const content2FontSize = 18;
      const content2Align = "left";
      const content2Valign = "top";
      
      pptx.defineSlideMaster({
        title: `comparison`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                bold : false,
                fontSize: contentFontSize,
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
                bold : false,
                fontSize: content2FontSize,
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
            text:  waterMark ? "Made with Ai Flavoured" : "",
            options: {
              x: 10,
              y: 4,
              w: 3.3,
              h: 6.5,
              fontSize: 14,
              bold : true,
              color: "f41c76",
              align: "right",
              fontFace: bodyFontFace,
            },
          },
        },
        {
          placeholder:{
            options: {
              name: "slideNumber",
              type: "body",
              x: 0.5,
              y: '94%',
              w: 0.7,
              h: 0.4,
              fontSize: 12,
              align: 'center',
              valign: 'middle',
              fontFace: bodyFontFace,
            },
            text: "SlideNumber Placeholder",
          
          }
        }
        ],
      });
      return pptx;
    }
//overview contation left image and top section for title and body section
const overview = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.title;
  
  // Title section settings
  const titlex = 6.7;
  const titley = 1.43;
  const titlew = 5.26;
  const titleh = 2.94;
  const titleFontSize = 48;
  const titleFontFace = FontFacetitle;
  const titleAlign = "center";
  const titleValign = "middle";

  //body section setting
  const bodyx = 6.7;
  const bodyy = 4.56;
  const bodyw = 5.26;
  const bodyh = 2.61;
  const bodyFontSize = 20;
  const bodyAlign = "center";
  const bodyValign = "middle";
  const bodyMargin = 0.2;  

  // Subtitle section settings
  const picturex = 0;
  const picturey = 0;
  const picturew = 6.67;
  const pictureh = 7.5;

  pptx.defineSlideMaster({
    title: `overview`,
    objects: [
      // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
      //   type: 'outer',
      //   color: '000000',
      //   blur: 15,
      //   offset: 2,
      //   angle: 45,
      //   opacity: 0.5
      // } } },
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
            fontFace: titleFontFace,
          },
          text: "Title Placeholder",
        },
      },
      //body
      {
        placeholder:{
          options: {
            name: "body",
            type: "body",
            x: bodyx,
            y: bodyy,
            w: bodyw,
            h: bodyh,
            fontSize: bodyFontSize,
            align: bodyAlign,
            valign: bodyValign,
            fontFace: bodyFontFace,
            margin : bodyMargin
          },
          text: "Body Placeholder",
        }
      }, 
      // picture
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
          text: "Subtitle Placeholder",
        },
      },
      // Footer
      {
        text: {
        text:  waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: 4,
          w: 3.3,
          h: 6.5,
          bold : true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: bodyFontFace,
        },
      },
    },
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '94%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: bodyFontFace,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
    ]
  });
  return pptx;
};
const twoContent = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
  const fontFaceTitle = font.title;
  const bodyFontFace = font.body;
  // Title section settings
  const titlex = 1;
  const titley = 0.4;
  const titlew = 11.33;
  const titleh = 1.78;
  const titleFontSize = 32;
  const titleFontFace = fontFaceTitle;
  const titleAlign = "left";
  const titleValign = "middle";

  // Left content section settings
  const leftContentx = 1;
  const leftContenty = 2.21;
  const leftContentw = 5.46;
  const leftContenth = 4.1;
  const leftContentFontSize = 16;
  const leftContentFontFace = bodyFontFace;
  const leftContentAlign = "left";
  const leftContentValign = "top";

  // Right content section settings
  const rightContentx = 6.87;
  const rightContenty = 2.21;  
  const rightContentw = 5.46;
  const rightContenth = 4.1;
  const rightContentFontSize = 16;
  const rightContentFontFace = bodyFontFace;
  const rightContentAlign = "left";
  const rightContentValign = "top";

  pptx.defineSlideMaster({
    title: `twoContent`,
    objects: [
      // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
      //   type: 'outer',
      //   color: '000000',
      //   blur: 15,
      //   offset: 2,
      //   angle: 45,
      //   opacity: 0.5
      // } } },
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
            align: rightContentAlign,
            valign : rightContentValign,
            fontFace: rightContentFontFace,
          },
        },
      },
      
      // Footer
      {
        text: {
        text: waterMark ? "Made with Ai Flavoured" : "",
        options: {
          x: 10,
          y: 4,
          w: 3.3,
          h: 6.5,
          bold : true,
          fontSize: 14,
          color: "f41c76",
          align: "right",
          fontFace: bodyFontFace,
        },
      },
    },
    {
      placeholder:{
        options: {
          name: "slideNumber",
          type: "body",
          x: 0.5,
          y: '94%',
          w: 0.7,
          h: 0.4,
          fontSize: 12,
          align: 'center',
          valign: 'middle',
          fontFace: bodyFontFace,
        },
        text: "SlideNumber Placeholder",
      
      }
    }
  ]
  });
  return pptx;
};
const titleOnly = async (pptx: pptxgen, font : Font, waterMark : boolean )=> {
      const FontFacetitle = font.title
      const bodyFontFace = font.body
      // Title section settings
      const titlex = 6.67;
      const titley = 3.03;
      const titlew = 6.21;
      const titleh = 3.5;
      const titleFontSize = 48;
      const titleAlign = "left";
      const titleValign = "bottom";
    
      pptx.defineSlideMaster({
        title: `titleOnly`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                fontFace: FontFacetitle,
              },
              text: "Title Placeholder",
            },
          },
      
          // Footer
          {
            text: {
            text: waterMark ? "Made with Ai Flavoured" : "",
            options: {
              x: 10,
              y: 4,
              w: 3.3,
              h: 6.5,
              bold: true,
              fontSize: 14,
              color: "f41c76",
              align: "right",
              fontFace: bodyFontFace,
            },
          },
        },
        {
          placeholder:{
            options: {
              name: "slideNumber",
              type: "body",
              x: 0.5,
              y: '94%',
              w: 0.7,
              h: 0.4,
              fontSize: 12,
              align: 'center',
              valign: 'middle',
              fontFace: bodyFontFace,
            },
            text: "SlideNumber Placeholder",
          
          }
        }
      ]
      });
      return pptx;
    }
const blank = async (pptx: pptxgen , font : Font, waterMark : boolean )=> {

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
          //  { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                 fontFace: font.title,
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
                  y: 4,
                  w: 3.3,
                  h: 6.5,
                  bold : true,
                  fontSize: 14,
                  color: "f41c76",
                  align: "right",
                },
              },
            },
             ],
             slideNumber: { x: 0.5, y: "94%", w: 0.7, h: 0.4 , color : "f41c76", fontFace: "Calibri"},
      });
      return pptx;
    }
const contentWithCaption = async (pptx: pptxgen, font : Font, waterMark : boolean ) => {
      const FontFacetitle = font.title
      const bodyFontFace = font.body
      // Title section settings
      const titlex = 1;
      const titley = 0.4;
      const titlew = 11.42;
      const titleh = 1.77;
      const titleFontSize = 28
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Content section settings
      const contentx = 5.03;
      const contenty = 2.21;
      const contentw = 7.38;
      const contenth = 4.1;
      const contentFontSize = 18;
      const contentAlign = "left";
      const contentValign = "middle";
    
      // Caption section settings
      const captionx = 1;
      const captiony = 2.21;
      const captionw = 3.62;
      const captionh = 4.1;
      const captionFontSize = 16
      const captionAlign = "left";
      const captionValign = "top";
    
      pptx.defineSlideMaster({
        title: `contentWithCaption`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                bold : false,
                fontSize: contentFontSize,
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
              text:  waterMark ? "Made with Ai Flavoured" : "",
              options: {
                x: 10,
                y: 4,
                w: 3.3,
                h: 6.5,
                bold : true,
                fontSize: 14,
                color: "f41c76",
                align: "right",
                fontFace: bodyFontFace,
              },
            },
          },
          {
            placeholder:{
              options: {
                name: "slideNumber",
                type: "body",
                x: 0.5,
                y: '94%',
                w: 0.7,
                h: 0.4,
                fontSize: 12,
                align: 'center',
                valign: 'middle',
                fontFace: bodyFontFace,
              },
              text: "SlideNumber Placeholder",
            
            }
          }
      ]
      });
    
      return pptx;
}
const pictureWithCaption = async (pptx: pptxgen , font : Font , waterMark : boolean)=> {
      const FontFacetitle = font.title
      const bodyFontFace = font.body
      // Title section settings
      const titlex = 1;
      const titley = 0.49;
      const titlew = 5.66;
      const titleh = 1.58;
      const titleFontSize = 32;
      const titleAlign = "left";
      const titleValign = "middle";
    
      // Picture section settings
      const picturex = 6.65;
      const picturey = 0;
      const picturew = 6.69;
      const pictureh = 7.5;
    
      // Caption section settings
      const captionx = 8.05;
      const captiony = 0.44;
      const captionw = 6.32;
      const captionh = 5.05;
      const captionFontSize = 18;
      const captionAlign = "left";
      const captionValign = "top";
    
      pptx.defineSlideMaster({
        title: `pictureWithCaption`,
        objects: [
          // { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
          //   type: 'outer',
          //   color: '000000',
          //   blur: 15,
          //   offset: 2,
          //   angle: 45,
          //   opacity: 0.5
          // } } },
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
                bold : false,
                fontSize: captionFontSize,
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
              text:  waterMark ? "Made with Ai Flavoured" : "",
              options: {
                x: 9,
                y: 4,
                w: 3.2,
                h: 6.5,
                bold : true,
                fontSize: 14,
                color: "f41c76",
                align: "right",
                fontFace: bodyFontFace,
              },
            },
          },
          {
            placeholder:{
              options: {
                name: "slideNumber",
                type: "body",
                x: 0.5,
                y: '94%',
                w: 0.7,
                h: 0.4,
                fontSize: 12,
                align: 'center',
                valign: 'middle',
                fontFace: bodyFontFace,
              },
              text: "SlideNumber Placeholder",
            
            }
          }
        ],
      });
      return pptx;
    }

export const minimalistSalePitchThemePresentation = async ({author, title, pptxData, imageSearch, modelForColorAndTitle, waterMark}: PresentaionData) => {
      console.log("presentaion function call");
      try {
        let index = 0;
        let templatePicker = Math.floor(Math.random() * 4);
        const templates = [presentationTemplateBlue, presentationTemplatePink, presentationTemplatePurple,presentationTemplateGradientPink];
        const colorsTB = [{title: "1a1d27", body: "030f25"}, {title: "ffb8ea", body: "f2e8ef"}, {title: "3b0145", body: "f6e6f9"}, {title: "0c151b", body: "1d2428"}];
      //   const base64Images = await varientsToBase64(templates[templatePicker]) as Base64Image[] ; 

        const varient  =  themes.minimalistSalePitchTheme;  
        
        const base64Images = await localVarientsToBase64(varient) as  Localbase64Image[]
        
       
        const font : Font = {title: "Tenorite (Headings)", body: "Tenorite (Body)"};
        let pptx = new pptxgen();
    
        // Set PPTX Author and Company
        pptx.author = author;
        pptx.title = title;
      
        // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
        pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
        pptx.rtlMode = true;
        
    

      // const data: Presentation = await convertSlidesStringToObject(pptxData);
      const data : Presentation = [
        {
          "titleOnly":{
            "title" :"AI Flavoured",
          }
        },
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
      "sectionTitle":{
            "title" : "Introduction to AI Flavoured",
            "picture" : "AI Flavoured empowers users to efficiently extract insights from written content."
      }
    },
    {
      "overview":{
            "title" : "Project Overview",
            "content" : "AI Flavoured empowers users to efficiently extract insights from written content.",
            "picture" : "AI Flavoured empowers users to efficiently extract insights from written content."
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
      "sectionTitle":{
            "title" : "Project Overview",
            "picture" : "AI Flavoured empowers users to efficiently extract insights from written content."
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
      "team" : {
        "title" : "This is my First ai team",
        "first" :{
          "name" : "Sourav Sharma",
          "picture" : "Cat"
        },
        "second" : {
          "name" : "Sourav Sharma",
          "picture" : "dog"
        },
        "third" : {
          "name" : "Sourav Sharma",
          "picture" : "Parrot"
        
        }
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
    },
  ]
  
  
      
  let slideNumber =  1;
    for(let slide of data){
      let key = Object.keys(slide)[0];
        const maxCharCountForBody = 55;
        const maxCharCountForContent = 35;
        const colors : TBColor =  {
          title: [0, 2, 5, 12].includes(index) ? "FFFFFF": '000000' , 
          body: [0, 2, 5, 12].includes(index) ? "FFFFFF": '000000' 
        } 
        // const link = base64Images[index].link;
        const base64 = base64Images[index].base64;
        const mime = base64Images[index].mime;
        const lineSpacing: number = 40;
    
          switch(key){    
          case "intro":
            let slideI = slide[key];
            pptx = await intro(pptx, font, waterMark);
            const slideIntro = pptx.addSlide({ masterName: `intro` });
            const titleIntro = slideI!.title;
            const bodyIntro = slideI!.body;
            slideIntro.background = { data: base64};
            slideIntro.addText(titleIntro, {
              color : colors.title,
              placeholder: "title",
            });
            slideIntro.addText(bodyIntro, {
              color : colors.body,
              placeholder: "body",
            });
            slideIntro.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            
            break;      
          case "titleAndContent":
              let slideDataTAC = slide[key];
              pptx = await titleAndContent(pptx, font, waterMark );
              const slideTAC = pptx.addSlide({ masterName: `titleAndContent` });
              const titleTAC = slideDataTAC!.title;
              const bodyTAC = slideDataTAC!.body;
              slideTAC.background = { data: base64};
              slideTAC.addText(titleTAC, {
                placeholder: "title",
                color : colors.title
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
                      color : colors.body, 
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
                        color : colors.body, 
                        placeholder: "body",
                        lineSpacing :lineSpacing,
                        lineSpacingMultiple : 2.0
                  });
                    
                      if(points > 20 ){
                        const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                        const newTitleTAC = slideDataTAC!.title;
                        newSlideTAC.addText(newTitleTAC, {
                              color : colors.body, 
                              placeholder :"title"
                        })
                        const leftPoints = bodyTAC.slice(20, bodyTAC.length).join('\n');
                        newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, color : colors.body, 
                          placeholder :"leftBody"})
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
                  color : colors.body, 
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
                    color : colors.body, 
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
                    slideTAC.addText(leftBody, { x: 0.5, y: 1.55, lineSpacing: lineSpacing, color : colors.body, 
                      placeholder :"leftBody"});
                    slideTAC.addText(rightBody, { x: 6.5, y: 1.55, lineSpacing: lineSpacing, color : colors.body, 
                      placeholder :"rightBody"});
                  }else{
                    
                    slideTAC.addText(bodyTAC, {
                      color : colors.body, 
                      placeholder: "body",
                    });
                  }
                  if(points.length > 20 ){
                    const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                    const newTitleTAC = slideDataTAC!.title;
                    newSlideTAC.addText(newTitleTAC, {
                      color : colors.body, 
                      placeholder :"title",
                    })
                    const leftPoints = points.slice(20, points.length).join('\n');
                    newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, color : colors.body, 
                      placeholder :"leftBody"})
                    newSlideTAC.addText(slideNumber.toString(), {
                        color : colors.body,
                        placeholder : 'slideNumber'
                      } )
                  }
                }// let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
      
              }
              slideTAC.addText(slideNumber.toString(), {
                color : colors.body,
                placeholder : 'slideNumber'
              } )
              break;
          case "overview":
                let slideOverview = slide[key];
                pptx = await overview(pptx, font, waterMark);
                const slideO = pptx.addSlide({ masterName: `overview` });
                const titleO =  slideOverview!.title;
                const contentO =  slideOverview!.content;
                const pictureO = slideOverview!.picture;

                slideO.background = { data: base64};
                slideO.addText(titleO, {
                  color : colors.title,
                  placeholder: "title",
                });

                if (Array.isArray(contentO)) {
                  let contentOString = contentO.map((item, index) =>{
                    let charCount = item.length;
                    if(charCount > maxCharCountForContent){
                  return `${index + 1}. ${item} \n`
                    }else{
                     return `${index + 1}. ${item}`
                    }
                  }).join('\n');
                  console.log(lineSpacing)
                  slideO.addText(contentOString, {
                    color : colors.body,
                    placeholder: "body",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                  });
                } else {
                  if (contentO.length > maxCharCountForContent){
                    let contentOString = contentO.replace(/\n/g, '\n\n');
                  slideO.addText(contentOString, {
                    color : colors.body,
                    placeholder: "body",
                    lineSpacing :lineSpacing,
                    lineSpacingMultiple : 1.5,
                  });}else{
                    slideO.addText(contentO, {
                      color : colors.body,
                      placeholder: "body",
                      lineSpacing :lineSpacing,
                      lineSpacingMultiple : 1.5,
                    });
                  }
                } 
                if(pictureO === 'string'){
                  slideO.addImage({ path: "public/darkThemeMoon/titleSlide.jpg", w: 6.67, h: 7.5, placeholder : 'picture' });
                }
                
                slideO.addImage({ path: 'public/minimalistSalePitchTheme/leftTriangle.png', w:2.24, h: 7.5, x:4.95, y:0});
                // slideO.addShape('rtTriangle', {
                  //   x:4.95,
                  //   y:0,
                  //   h:7.5,
                  //   w:2.24,
                  //   fill : {color : colors.body === "FFFFFF"? "000000" : "FFFFFF"}
                  // })
                  slideO.addText(slideNumber.toString(), {
                    color : colors.body,
                    placeholder : 'slideNumber'
                  } )
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
              color : colors.title,
              placeholder: "title",
            });
            slideTC.addShape('line',{
              x :6.67,
              y:0.78,
              h:6.1,
              w:0,
              line :{color : colors.body, width : 1, dashType : "solid"},
              fill :{color : colors.body}
            })
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
                color: colors.body,
                placeholder: "leftContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
              });
            } else {
              if (contentTC.length > maxCharCountForContent){
                let contentTCString = contentTC.replace(/\n/g, '\n\n');
              slideTC.addText(contentTCString, {
                color: colors.body,
                placeholder: "leftContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
              });}else{
                slideTC.addText(contentTC, {
                  color: colors.body,
                  placeholder: "leftContent",
                  lineSpacing :lineSpacing,
                  lineSpacingMultiple : 1.5,
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
                placeholder: "rightContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
              });
            } else {
              if (content2TC.length > maxCharCountForContent){
                let content2TCString = content2TC.replace(/\n/g, '\n\n');
              slideTC.addText(content2TCString, {
                color: colors.body,
                placeholder: "rightContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
              });}else{
                slideTC.addText(content2TC, {
                  color: colors.body,
                  placeholder: "rightContent",
                  lineSpacing :lineSpacing,
                  lineSpacingMultiple : 1.5,
                });
              
              }
            }
            slideTC.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            break;                     
          case "titleSlide": 
          let slideDataTS = slide[key];
          pptx =await titleSlide(pptx, font, waterMark);
          const slideTS = pptx.addSlide({ masterName: `titleSlide` });
          const titleTS = slideDataTS!.title;
          const bodyTS = slideDataTS!.body;
          slideTS.background = { data: base64};
          slideTS.addText(titleTS, {
            color : colors.title,
            placeholder: "title",
            fit : "shrink"
          });
          slideTS.addShape('line',{
            x:2.53,
            y:3.39,
            h:0,
            w:8.52,
            line :{color : colors.body, width : 1, dashType : "solid"},
            fill :{color : colors.body}
          })
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
              placeholder: "subtitle",
              lineSpacing :lineSpacing
            });
          } else {
            if (bodyTS.length > 50){
              let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
              slideTS.addText(bodyTSString, {
                color: colors.body,
                placeholder: "subtitle",
                lineSpacing :lineSpacing
              })}else{
  
                slideTS.addText(bodyTS, {
                  color: colors.body,
                  placeholder: "subtitle",
                  lineSpacing :lineSpacing
                });
              }
          }
          slideTS.addText(slideNumber.toString(), {
            color : colors.body,
            placeholder : 'slideNumber'
          } )
          break;
          case "sectionTitle":
            let slideDataSH = slide[key];
            pptx =await sectionTitle(pptx, font, waterMark);
            const slideSH = pptx.addSlide({ masterName: "sectionTitle" });
            const titleSH = slideDataSH!.title;
            const picture = slideDataSH!.picture;
            slideSH.background = { data: base64};
            slideSH.addText(titleSH, {
              color : colors.title,
              placeholder: "title",
            });
            if (typeof(picture) === 'string') {
              // imageSearch variable === "Google Search"
              // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(picture) as string;
              slideSH.addImage({ data: base64, w: 6.68 , h: 7.5 , placeholder: "picture"});
              // picture is a string to be displayed
              // slideSH.addText(picture, {
              //   placeholder: "picture",
              // });
            }
            slideSH.addShape('rtTriangle',{
              x:6.65,
              y:0,
              w:2.6,
              h:7.5,
              fill : {color : colors.body === "FFFFFF"? "000000" : "FFFFFF"}
            })
            slideSH.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
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
              color : colors.title,
              placeholder: "title",
            });
            slideC.addText(subheadingC, {
              color : colors.body,  
              placeholder: "subheading",
            });
            slideC.addText(subheading2C, {
              color : colors.body,  
              placeholder: "subheading2",
            });
            slideC.addShape('line',{
              x:5.21,
              y:1.73,
              h:0,
              w:2.91,
              line :{color : colors.body, width : 1, dashType : "solid"},
              fill:{color: colors.body}
            })
            slideC.addShape('line',{
              x:6.67,
              y:2.73,
              h:3.99,
              w:0,
              line :{color : colors.body, width : 1, dashType : "solid"},
              fill:{color: colors.body}
            })
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
                color : colors.body,  
                placeholder: "content",
                lineSpacing :lineSpacing
              });
            } else {
              if (contentC.length > maxCharCountForContent){
                let contentCString = contentC.replace(/\n/g, '\n\n');
              slideC.addText(contentCString, {
                color : colors.body,  
                placeholder: "content",
                lineSpacing :lineSpacing
              });}else{
                slideC.addText(contentC, {
                  color : colors.body,  
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
                color : colors.body,  
                placeholder: "content2",
              });
            } else {
              if(content2C.length > maxCharCountForContent){
                let content2CString = content2C.replace(/\n/g, '\n\n');
                slideC.addText(content2CString, {
                  color : colors.body,  
                  placeholder: "content2",
                });}else{
                      
                  slideC.addText(content2C, {
                    color : colors.body,  
                    placeholder: "content2",
                  });
                }
            }
            slideC.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            break;
          case "titleOnly":
            let slideDataTO = slide[key];
            pptx =await titleOnly(pptx, font, waterMark);
            const slideTO = pptx.addSlide({ masterName: "titleOnly" });
            const titleTO = slideDataTO!.title;
            slideTO.background = { data: base64};
            slideTO.addText(titleTO, {
              color : colors.title,
              placeholder: "title",
            });
            slideTO.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            break;  
          case "blank":
            let slideDataB = slide[key];
            pptx =await blank(pptx, font, waterMark);
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
            slideB.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
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
                color : colors.body,
                placeholder: "content",
                lineSpacing :lineSpacing
              });
            } else {
              if (contentCWC.length > maxCharCountForContent){
                let contentCWCString = contentCWC.replace(/\n/g, '\n\n');
                slideCWC.addText(contentCWCString, {
                  color : colors.body,
                  placeholder: "content",
                  lineSpacing :lineSpacing
                })}else{
    
                  slideCWC.addText(contentCWC, {
                    color : colors.body,
                    placeholder: "content",
                    lineSpacing :lineSpacing
                  });
    
                }
            }
            slideCWC.addText(captionCWC, {
              color : colors.body,
              placeholder: "caption",
            });
            slideCWC.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
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
              color : colors.title,
              placeholder: "title",
            });
            slidePWC.addShape('line',{
              x:7.89,
              y:0.44,
              h:6.32,
              w:0,
              line :{color : colors.body, width : 1, dashType : "solid"},
              fill:{color: colors.body}
            })
            if (typeof(picturePWC) === 'string') {
              //imageSearch variable === "Google Search"
              const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(picturePWC) as string;
              slidePWC.addImage({ data: base64WithHeader, w: 5.19 , h: 7.06, placeholder: "picture"});
            } 
            slidePWC.addText(captionPWC, {
              color : colors.body,
              placeholder: "caption",
            });
            slidePWC.addShape('rtTriangle',{
              x:6.65,
              y:-0,
              w:2.23,
              h:7.5,
              fill : {color : colors.body === "FFFFFF"? "000000" : "FFFFFF"},
              rotate : 180
            })
            slidePWC.addShape('rtTriangle',{
              x:11.01,
              y:5.18,
              w:3.63,
              h:1.02,
              fill : {color : colors.body === "FFFFFF"? "000000" : "FFFFFF"},
              rotate : 90
            })
            slidePWC.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            break;
          case "team" :
            let slideDataTeam = slide[key];
            pptx =await team(pptx, font, waterMark);
            const slideTeam = pptx.addSlide({ masterName: `team` });
            const titleTeam = slideDataTeam!.title;
            const contentTeam = slideDataTeam!.first.name;
            const content2Team = slideDataTeam!.second.name;
            const content3Team = slideDataTeam!.third.name;
            const firstPicture = slideDataTeam!.first.picture;
            const secondPicture = slideDataTeam!.second.picture;
            const thirdPicture = slideDataTeam!.third.picture;

            slideTeam.background = { data: base64};
            slideTeam.addText(titleTeam, {
              color : colors.title,
              placeholder: "title",
            });
            slideTeam.addText(contentTeam, {
              color : colors.body,
              placeholder: "lpicName",
            });
            slideTeam.addText(content2Team, {
              color : colors.body,
              placeholder: "mpicName",
            });
            slideTeam.addText(content3Team, {
              color : colors.body,
              placeholder: "rpicName",
            });
            slideTeam.addShape('rect',{
              x : 0.6,
              y : 2.61,
              w : 3.19,
              h : 3.19,
              fill : {color : "1e1c1d"},
              shadow :{
                type: 'outer',
                color: '1e1c1d',
                blur: 18,
                offset: 2,
                angle: 45,
                opacity: 0.5
              },
            })
            slideTeam.addShape('rect',{
            x : 5.07,
            y : 1.66,
            w : 3.19,
            h : 3.19, 
            fill : {color : "1e1c1d"},
            shadow: {
              type: 'outer',
              color: '1e1c1d',
              blur: 18,
              offset: 2,
              angle: 45,
              opacity: 0.5
            },
            })
            slideTeam.addShape('rect',{
            x : 9.44,
            y : 2.64,
            w : 3.19,
            h : 3.19,
            fill : {color : "1e1c1d"},
            shadow: {
              type: 'outer',
              color: '1e1c1d',
              blur: 18,
              offset: 2,
              angle: 45,
              opacity: 0.5
            },
            })
            if (typeof(firstPicture) === 'string') {
              //imageSearch variable === "Google Search"
              // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(firstPicture) as string;
              // slideTeam.addImage({ data: base64WithHeader, w: 3 , h: 3, placeholder: "lpic"});
              slideTeam.addImage({ data: base64, w: 3.63 , h: 3.63, placeholder: "lpic"});
            }
            if (typeof(secondPicture) === 'string') {
              //imageSearch variable === "Google Search"
              // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(secondPicture) as string;
              // slideTeam.addImage({ data: base64WithHeader, w: 2.5 , h: 2.5, placeholder: "mpic"});
              slideTeam.addImage({ data: base64, w: 3.63 , h: 3.63, placeholder: "mpic"});
            }
            if (typeof(thirdPicture) === 'string') {
              //imageSearch variable === "Google Search"
              // const base64WithHeader : string = await getImagesFromGoogleAsBase64ArrayWithHeaders(thirdPicture) as string;
              // slideTeam.addImage({ data: base64WithHeader, w: 2.5 , h: 2.5, placeholder: "rpic"});
              slideTeam.addImage({ data: base64,  w: 3.63 , h: 3.6, placeholder: "rpic"});
            }
            slideTeam.addText(slideNumber.toString(), {
              color : colors.body,
              placeholder : 'slideNumber'
            } )
            break;
            default:
            console.log(`No slide found for key : ${key}`)
        }  
        slideNumber++;
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
            //temporarily saving the file

            fs.writeFileSync(`output/${title}.pptx`, new Uint8Array(buffer));

            // try{
            //   const res = await fetch('http://localhost:3000/api/runpythonscript',{
            //     method : 'POST',
            //     body   : JSON.stringify({path : `output/${title}.pptx`}),
            //   })
            //   if(res.ok){
            //     const resData = await res.json()
            //     const pdfBase64 = resData.pdfBase64
            //     console.log("file created")
            //     fs.writeFileSync(`output/${title}.pdf`, pdfBase64, 'base64');
            //   }

            // }catch(e){
            //   console.log("Error in creating pdf",e)
            // }

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
    