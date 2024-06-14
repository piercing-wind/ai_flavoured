"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";
import {
      presentationTemplateBlue,
      presentationTemplatePink,
      presentationTemplateGradientPink,
      presentationTemplatePurple,
      varients,
      themes 
    } from "../imagesData";
import { Base64Image, Localbase64Image, getImagesFromGoogleAsBase64ArrayWithHeaders, localVarientsToBase64, varientsToBase64 } from "../getImagesFromGoogleAndConvertToBase64";
import { convertSlidesStringToObject } from "../convertSlidesStringToObject";
import { PresentationData } from "./presentation";
import { PresentationImage } from "../generatePresentaionAndStore";
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
type Font ={
  title : string;
  body : string;
}

const titleAndContent = async (pptx: pptxgen,font : Font,waterMark : boolean) => {
  const fontFaceTitle = font.title;
  const fontFace = font.body

  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 12.83;
  const titleh = 1.5;
  const titleFontSize = 36;
  const titleFontFace = fontFaceTitle;
  const titleAlign = "left";
  const titleValign = "middle";
    
  // Content section settings
  const contentx = 0.5;
  const contenty = 2;
  const contentw = 12.33;
  const contenth = 5;
  const contentFontSize = 18;
  const contentFontFace = fontFace;
  const contentAlign = "left";
  const contentValign = "top";
    
  //leftbody
  const leftBodyx = 0.5;
  const leftBodyy = 2;
  const leftBodyw = 6.165;
  const leftBodyh = 5;
  const leftBodyFontSize = 18;
  const leftBodyFontFace = fontFace ;
  const leftBodyAlign = "left";
  const leftBodyValign = "top";
    
  //rightbody
  const rightBodyx = 6.665;
  const rightBodyy = 2;
  const rightBodyw = 6.165;
  const rightBodyh = 5;
  const rightBodyFontSize = 18;
  const rightBodyFontFace = fontFace;
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
const twoContent = async (pptx: pptxgen,font : Font,waterMark : boolean) => {
  const FontFacetitle = font.title
  const bodyFontFace = font.body
  // Title section settings
  const titlex = 0.5;
  const titley = 0.5;
  const titlew = 12.83;
  const titleh = 1.5;
  const titleFontSize = 36;
  const titleFontFace = FontFacetitle;
  const titleAlign = "left";
  const titleValign = "middle";
    
  // Left content section settings
  const leftContentx = 0.5;
  const leftContenty = 2;
  const leftContentw = 6.165;
  const leftContenth = 5;
  const leftContentFontSize = 18;
  const leftContentFontFace = bodyFontFace;
  const leftContentAlign = "left";
  const leftContentValign = "top";
    
  // Right content section settings
  const rightContentx = 7.665;
  const rightContenty = 2;
  const rightContentw = 6.165;
  const rightContenth = 5;
  const rightContentFontSize = 18;
  const rightContentFontFace = bodyFontFace;
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
const team = async (pptx: pptxgen, font : Font, waterMark : boolean) => {
      const fontFaceTitle = font.title;
      const fontFaceBody = font.body;
    
          // Title section settings
          const titlex = 1;
          const titley = 0.48;
          const titlew = 11.33;
          const titleh = 1.18;
          const titleFontSize = 36;
          const titleFontFace = fontFaceTitle;
          const titleAlign = "center";
          const titleValign = "middle";
    
        
          // Left picture section settings
             const lpicNamex = 0.69;
             const lpicNamey = 5.8;
             const lpicNamew = 3.63;
             const lpicNameh = 1; 
             const lpicFontSize = 20;
             const lpicFontFace = fontFaceTitle;
             const lpicAlign = "center";
             const lpicVAlign = "middle";
    
             //Picture section settings
               const lpicturex = 0.69;
               const lpicturey = 1.92;
               const lpicturew = 3.63;
               const lpictureh = 3.63;
    
          //Middle Content section settings
            const mpicNamex = 4.81;
            const mpicNamey = 5.8;
            const mpicNamew = 3.63;
            const mpicNameh = 1;
            const mpicFontSize = 20;
            const mpicFontFace = fontFaceTitle;
            const mpicAlign = "center";
            const mpicVAlign = "middle";
    
             // Picture section settings
              const mpicturex = 4.81;
              const mpicturey = 1.92;
              const mpicturew = 3.63;
              const mpictureh = 3.63;
        
          // Right content section settings
            const rpicNamex = 8.85;
            const rpicNamey = 5.8;
            const rpicNamew = 3.63;
            const rpicNameh = 1;
            const rpicFontSize = 20;
            const rpicFontFace = fontFaceTitle;
            const rpicAlign = "center";
            const rpicVAlign = "middle";
    
           // Picture section settings
              const rpicturex = 8.85;
              const rpicturey = 1.92;
              const rpicturew = 3.63;
              const rpictureh = 3.63;
        
          pptx.defineSlideMaster({
            title: `team`,
            objects: [
              { rect: { x: 0.5, y: 0.5, w: 12.33, h: 6.5, fill: { color: "faf4f4" },shadow: {
                type: 'outer',
                color: '000000',
                blur: 15,
                offset: 2,
                angle: 45,
                opacity: 0.5
              } } },
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
const titleSlide = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.body;

  // Title section settings
  const titlex = 1;
  const titley = 2;
  const titlew = 11;
  const titleh = 2;
  const titleFontSize = 54;
  const titleFontFace = FontFacetitle;
  const titleAlign = "center";
  const titleValign = "middle";

  // Subtitle section settings
  const subtitlex = 1;
  const subtitley = 4.5;
  const subtitlew = 11;
  const subtitleh = 1.5;
  const subtitleFontSize = 24;
  const subtitleFontFace = bodyFontFace;
  const subtitleAlign = "right";
  const subtitleValign = "top";

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
};
const sectionHeader = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.body;

  // Title section settings
  const titlex = 0.5;
  const titley = 2;
  const titlew = 11.33;
  const titleh = 2;
  const titleFontSize = 40;
  const titleFontFace = FontFacetitle;
  const titleAlign = "right";
  const titleValign = "middle";

  // Subtitle section settings
  const subtitlex = 0.5;
  const subtitley = 4;
  const subtitlew = 12.33;
  const subtitleh = 1.5;
  const subtitleFontSize = 20;
  const subtitleFontFace = bodyFontFace;
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
};
const comparison = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.body;

  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 36;
  const titleAlign = "left";
  const titleValign = "middle";

  // Subheading section settings
  const subx = 1;
  const suby = 2;
  const subw = 5.5;
  const subh = 1;
  const subFontSize = 24;
  const subAlign = "center";
  const subValign = "middle";

  // Second subheading section settings
  const sub2x = 7;
  const sub2y = 2;
  const sub2w = 5.5;
  const sub2h = 1;
  const sub2FontSize = 24;
  const sub2Align = "center";
  const sub2Valign = "middle";

  // Content section settings
  const contentx = 1;
  const contenty = 3;
  const contentw = 5.5;
  const contenth = 3.5;
  const contentFontSize = 18;
  const contentAlign = "left";
  const contentValign = "top";

  // Second content section settings
  const content2x = 7;
  const content2y = 3;
  const content2w = 5.5;
  const content2h = 3.5;
  const content2FontSize = 18;
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
            bold: true,
            fontSize: subFontSize,
            align: subAlign,
            valign: subValign,
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
            bold: true,
            fontSize: sub2FontSize,
            align: sub2Align,
            valign: sub2Valign,
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
            fontSize: contentFontSize,
            align: contentAlign,
            valign: contentValign,
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
            fontSize: content2FontSize,
            align: content2Align,
            valign: content2Valign,
            fontFace: bodyFontFace,
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
};
const titleOnly = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
  const FontFacetitle = font.title;
  const bodyFontFace = font.body;
  // Title section settings
  const titlex = 1;
  const titley = 0.25;
  const titlew = 11.41;
  const titleh = 1.5;
  const titleFontSize = 36;
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
};
const blank = async (pptx: pptxgen ,font : Font,waterMark : boolean )=> {

    const fontFace = font.body;
    
     
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
const contentWithCaption = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
      const FontFacetitle = font.title;
      const bodyFontFace = font.body;
      // Title section settings
      const titlex = 0.5;
      const titley = 1.5;
      const titlew = 6;
      const titleh = 1.5;
      const titleFontSize = 32;
      const titleAlign = "left";
      const titleValign = "middle";

      // Content section settings
      const contentx = 7;
      const contenty = 1.5;
      const contentw = 5.5;
      const contenth = 6;
      const contentFontSize = 18;
      const contentAlign = "left";
      const contentValign = "middle";

      // Caption section settings
      const captionx = 0.5;
      const captiony = 3;
      const captionw = 6;
      const captionh = 4;
      const captionFontSize = 18;
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
                bold : true,
                fontSize: titleFontSize,
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
                fontSize: contentFontSize,
                align: contentAlign,
                valign: contentValign,
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
                fontSize: captionFontSize,
                align: captionAlign,
                valign: captionValign,
                fontFace: bodyFontFace,
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
        ],
        
      });

      return pptx;
    };
const pictureWithCaption = async (pptx: pptxgen, font: Font, waterMark: boolean) => {
      const FontFacetitle = font.title;
      const bodyFontFace = font.body;
      // Title section settings
      const titlex = 0.5;
      const titley = 0.5;
      const titlew = 6;
      const titleh = 1.5;
      const titleFontSize = 24;
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
                fontSize: captionFontSize,
                align: captionAlign,
                valign: captionValign,
                fontFace: bodyFontFace,
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
        ],
      });

      return pptx;
    };

export const facetThemePresentation = async ({author, title, pptxData, imageSearch, waterMark}: PresentationData, photosWithLink : PresentationImage, variant : string) => {
      console.log("presentaion function call");
      try {

      //   const base64Images = await varientsToBase64(templates[templatePicker]) as Base64Image[] ; 
        const varient  =  themes.facetTheme;  
        const base64Images = await localVarientsToBase64(varient) as  Localbase64Image[]
        const colors : TBColor = {title: "3B3838", body: "222A35"}; 
        const font : Font = {title: "Calibri Light (Headings)", body: "Calibri"};
         
        let pptx = new pptxgen();
    
        // Set PPTX Author and Company
        pptx.author = author;
        pptx.title = title;
      
        // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
        pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
        pptx.rtlMode = true;
      // const data = [
      //   {
      //       "titleSlide": {
      //           "title": "AI Flavoured: Revolutionizing Document Comprehension & Learning"
      //       }
      //   },
      //   {
      //       "titleAndContent": {
      //           "title": "Challenges Addressed by AI Flavoured",
      //           "body": "1. Information overload impedes learning.\n2. Documents are hard to grasp, hindering understanding.\n3. Traditional methods are time-consuming.\n4. Language barriers limit collaboration.\n5. One-size-fits-all approach hampers learning."
      //       }
      //   },
      //   {
      //       "sectionHeader": {
      //           "title": "Empowerment through AI Flavoured",
      //           "body": "Overcoming overload, language barriers, and enhancing learning efficiency."
      //       }
      //   },
      //   {
      //       "twoContent": {
      //           "title": "Features of the Project",
      //           "content": "Efficient Summarization: Condenses lengthy documents into concise summaries.",
      //           "content2": "Interactive Communication: Real-time dialogue with AI assistant."
      //       }
      //   },
      //   {
      //       "comparison": {
      //           "title": "Features of the Project",
      //           "subheading": "Multilingual Support",
      //           "subheading2": "Personalized Learning",
      //           "content": "Breaks linguistic barriers, empowering users globally.",
      //           "content2": "Caters to diverse learning styles with customizable options."
      //       }
      //   },
      //   {
      //       "contentWithCaption": {
      //           "title": "Home Page of the Web Software",
      //           "content": "First, log in to access the software features.",
      //           "caption": "Upload any PDF or Document Here"
      //       }
      //   },
      //   {
      //       "pictureWithCaption": {
      //           "title": "Chat Interface",
      //           "picture": "Image prompt",
      //           "caption": "Sidebar panel for chat history, resizable interaction panels, communication with AI & Doc"
      //       }
      //   },
      //   {
      //       "team": {
      //           "title": "Methodology Followed",
      //           "first": {
      //               "name": "Agile (Scrum)",
      //               "picture": "Image prompt"
      //           },
      //           "second": {
      //               "name": "Resource Requirement",
      //               "picture": "Image prompt"
      //           },
      //           "third": {
      //               "name": "Backend Tools",
      //               "picture": "Image prompt"
      //           }
      //       }
      //   },
      //   {
      //       "titleOnly": {
      //           "title": "Front End Technology Used",
      //           "picture": "Image prompt"
      //       }
      //   },
      //   {
      //       "contentWithCaption": {
      //           "title": "Development Process",
      //           "content": "Adheres to best practices like version control, CI/CD, and rigorous testing.",
      //           "caption": "Delivers sleek, responsive UI integrating seamlessly with backend AI capabilities."
      //       }
      //   },
      //   {
      //       "comparison": {
      //           "title": "Benefits of Front End Technology",
      //           "subheading": "React.js",
      //           "subheading2": "Next.js",
      //           "content": "Powers frontend with reusable UI components.",
      //           "content2": "Enables server-side rendering and static site generation."
      //       }
      //   },
      //   {
      //       "twoContent": {
      //           "title": "Future Scope of the Project",
      //           "content": "1. Advanced Summarization Techniques: Improved algorithms for accuracy.",
      //           "content2": "2. Expanded Interactive Communication: Voice-based interactions."
      //       }
      //   },
      //   {
      //       "contentWithCaption": {
      //           "title": "Future Scope of the Project",
      //           "content": "3. Personalized Learning: Adaptive systems and recommendation engines.",
      //           "caption": "4. Collaborative and Social Features: Sharing and social components."
      //       }
      //   },
      //   {
      //       "comparison": {
      //           "title": "Future Scope of the Project",
      //           "subheading": "Learning Analytics",
      //           "subheading2": "Thank you",
      //           "content": "Tools for progress tracking and personalized feedback.",
      //           "content2": "End of Presentation"
      //       }
      //   },
      //   {
      //       "blank": {
      //           "picture": "Image prompt"
      //       }
      //   }
      // ]  
     
    const data: Presentation = await convertSlidesStringToObject(pptxData);

      let slideNumber = 1;
      let index = 0
      for(let slide of data){
        let key = Object.keys(slide)[0];
        
        const maxCharCountForBody = 55;
        const maxCharCountForContent = 35;
        
        let findPicture;
        const ix = photosWithLink.findIndex((item) => item.slideNumber === slideNumber);
        if( ix !== -1){
           findPicture = photosWithLink[ix];
         }  
    
        // const link = base64Images[index].link;
        const base64 = base64Images[index].base64;
        const lineSpacing: number = 50;
    
          switch(key){        
            case "titleAndContent":
              let slideDataTAC = slide[key];
              pptx = await titleAndContent(pptx,font, waterMark);
              const slideTAC = pptx.addSlide({ masterName: `titleAndContent` });
              const titleTAC = slideDataTAC!.title;
              const bodyTAC = slideDataTAC!.body;
              slideTAC.background = { data: base64};
              slideTAC.addText(titleTAC, {
              placeholder: "title",
              color: colors.title
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
                  lineSpacingMultiple : 2.0,
                  color: colors.body
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
                  lineSpacingMultiple : 2.0,
                  color: colors.body
                });
                
                  if(points > 20 ){
                  const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                  const newTitleTAC = slideDataTAC!.title;
                  newSlideTAC.addText(newTitleTAC, {
                      placeholder :"title",
                      color: colors.title
                  })
                  const leftPoints = bodyTAC.slice(20, bodyTAC.length).join('\n');
                  newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing, color : colors.body,placeholder :"leftBody"})
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
                placeholder: "body",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 2.0,
                color: colors.body
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
                lineSpacingMultiple : 2.0,
                color: colors.body
                });
              }else{
                const points = bodyTAC.split('\n');
                if(points.length > 10) {
                const leftPoints = points.slice(0, 10);
                const rightPoints = points.slice(10, points.length);
                const leftBody = leftPoints.join('\n');
                const rightBody = rightPoints.join('\n');
                slideTAC.addText(leftBody, { x: 0.5, y: 1.55, lineSpacing: lineSpacing, placeholder :"leftBody", color: colors.body});
                slideTAC.addText(rightBody, { x: 6.5, y: 1.55, lineSpacing: lineSpacing, placeholder :"rightBody", color: colors.body});
                }else{
                
                slideTAC.addText(bodyTAC, {
                  placeholder: "body",
                  color: colors.body
                });
                }
                if(points.length > 20 ){
                const newSlideTAC = pptx.addSlide({ masterName: `titleAndContent` });
                const newTitleTAC = slideDataTAC!.title;
                newSlideTAC.addText(newTitleTAC, {
                  placeholder :"title",
                  color: colors.title
                })
                const leftPoints = points.slice(20, points.length).join('\n');
                newSlideTAC.addText(leftPoints, {x:0.5, y: 1.5, lineSpacing: lineSpacing,color: colors.body, placeholder :"leftBody"})
                }
              }// let bodyTACString = bodyTAC.replace(/\n/g, '\n\n');
          
              }
              slideTAC.addText(slideNumber.toString(), {
                color: colors.body,
                placeholder: 'slideNumber'
              });
              break;
            case "twoContent":
              // try{
              let slideDataTC = slide[key];
              pptx = await twoContent(pptx,font, waterMark);
              const slideTC = pptx.addSlide({ masterName: `twoContent` });
              const titleTC = slideDataTC!.title;
              const contentTC =  slideDataTC!.content;
              const content2TC =  slideDataTC!.content2;
              slideTC.background = { data: base64};
              slideTC.addText(titleTC, {
                placeholder: "title",
                color: colors.title
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
                color: colors.body
                });
              } else {
                if (contentTC.length > maxCharCountForContent){
                let contentTCString = contentTC.replace(/\n/g, '\n\n');
                slideTC.addText(contentTCString, {
                placeholder: "leftContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
                color: colors.body
                });}else{
                slideTC.addText(contentTC, {
                  placeholder: "leftContent",
                  lineSpacing :lineSpacing,
                  lineSpacingMultiple : 1.5,
                  color: colors.body
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
                color: colors.body
                });
              } else {
                if (content2TC.length > maxCharCountForContent){
                let content2TCString = content2TC.replace(/\n/g, '\n\n');
                slideTC.addText(content2TCString, {
                placeholder: "rightContent",
                lineSpacing :lineSpacing,
                lineSpacingMultiple : 1.5,
                color: colors.body
                });}else{
                slideTC.addText(content2TC, {
                  placeholder: "rightContent",
                  lineSpacing :lineSpacing,
                  lineSpacingMultiple : 1.5,
                  color: colors.body
                });
                
                }
              }
              slideTC.addText(slideNumber.toString(), {
                color: colors.body,
                placeholder: 'slideNumber'
              });
            // }catch(e){console.log("pppp",e) }
              break;    
            case "titleSlide": 
                let slideDataTS = slide[key];
                pptx =await titleSlide(pptx,font, waterMark);
                const slideTS = pptx.addSlide({ masterName: `titleSlide` });
                const titleTS = slideDataTS!.title;
                const bodyTS = slideDataTS!.body;
                slideTS.background = { data: base64};
                slideTS.addText(titleTS, {
                  placeholder: "title",
                  color: colors.title,
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
                  placeholder: "subtitle",
                  lineSpacing :lineSpacing,
                  color: colors.body
                  });
                } else {
                  if (bodyTS.length > 50){
                  let bodyTSString = bodyTS.replace(/\n/g, '\n\n');
                  slideTS.addText(bodyTSString, {
                    placeholder: "subtitle",
                    lineSpacing :lineSpacing,
                    color: colors.body
                  })}else{
            
                    slideTS.addText(bodyTS, {
                    placeholder: "subtitle",
                    lineSpacing :lineSpacing,
                    color: colors.body
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
            pptx =await sectionHeader(pptx,font, waterMark);
            const slideSH = pptx.addSlide({ masterName: "sectionHeader" });
            const titleSH = slideDataSH!.title;
            const bodySH = slideDataSH!.body;
            slideSH.background = { data: base64};
            slideSH.addText(titleSH, {
              placeholder: "title",
              color: colors.title
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
              lineSpacing :lineSpacing,
              color: colors.body
              });
            } else {
              slideSH.addText(bodySH, {
              placeholder: "subtitle",
              lineSpacing :lineSpacing,
              color: colors.body
              });
            }
            slideSH.addText(slideNumber.toString(), {
              color: colors.body,
              placeholder: 'slideNumber'
            });
            break;
            case "comparison":
            let slideDataC = slide[key];
            pptx = await comparison(pptx, font, waterMark);
            const slideC = pptx.addSlide({ masterName: "comparison" });
            const titleC = slideDataC!.title;
            const subheadingC = slideDataC!.subheading;
            const subheading2C = slideDataC!.subheading2;
            const contentC = slideDataC!.content;
            const content2C = slideDataC!.content2;
            slideC.background = { data: base64 };
            slideC.addText(titleC, {
              placeholder: "title",
              color: colors.title
            });
            slideC.addText(subheadingC, {
              placeholder: "subheading",
              color: colors.body
            });
            slideC.addText(subheading2C, {
              placeholder: "subheading2",
              color: colors.body
            });
            if (Array.isArray(contentC)) {
              let contentCString = contentC.map((item, index) => {
              let charCount = item.length;
              if (charCount > maxCharCountForContent) {
                return `${index + 1}. ${item} \n`
              } else {
                return `${index + 1}. ${item}`
              }
              }).join('\n');
              slideC.addText(contentCString, {
              placeholder: "content",
              lineSpacing: lineSpacing,
              color: colors.body
              });
            } else {
              if (contentC.length > maxCharCountForContent) {
              let contentCString = contentC.replace(/\n/g, '\n\n');
              slideC.addText(contentCString, {
                placeholder: "content",
                lineSpacing: lineSpacing,
                color: colors.body
              });
              } else {

              slideC.addText(contentC, {
                placeholder: "content",
                lineSpacing: lineSpacing,
                color: colors.body
              });

              }
            }

            if (Array.isArray(content2C)) {
              let content2CString = content2C.map((item, index) => {
              let charCount = item.length;
              if (charCount > maxCharCountForContent) {
                return `${index + 1}. ${item} \n`
              } else {
                return `${index + 1}. ${item}`
              }
              }).join('\n');
              slideC.addText(content2CString, {
              placeholder: "content2",
              color: colors.body
              });
            } else {
              if (content2C.length > maxCharCountForContent) {
              let content2CString = content2C.replace(/\n/g, '\n\n');
              slideC.addText(content2CString, {
                placeholder: "content2",
                color: colors.body
              });
              } else {

              slideC.addText(content2C, {
                placeholder: "content2",
                color: colors.body
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
            pptx = await titleOnly(pptx, font, waterMark);
            const slideTO = pptx.addSlide({ masterName: "titleOnly" });
            const titleTO = slideDataTO!.title;
            const pictureTO = slideDataTO!.picture;
            slideTO.background = { data: base64 };
            slideTO.addText(titleTO, {
              placeholder: "title",
              color: colors.title
            });
            if (typeof (pictureTO) === 'string' && findPicture  && ix !== -1) {
              slideTO.addImage({ path: findPicture.picture , w: 10.5, h: 5.5, x:1 , y:2, placeholder: "picture" });
            }
            slideTO.addText(slideNumber.toString(), {
              color: colors.body,
              placeholder: 'slideNumber'
            });
            break;
            case "blank":
            let slideDataB = slide[key];
            pptx = await blank(pptx, font, waterMark);
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
            if (typeof (pictureB) === 'string' && findPicture && ix !== -1) {
              slideB.addImage({ path: findPicture.picture, w: 11.33, h: 5.5, x: 1, y: 1, placeholder: "picture" });
            }
            slideB.addText(slideNumber.toString(), {
              color: colors.body,
              placeholder: 'slideNumber'
            });
            break;
            case "contentWithCaption":
            let slideDataCWC = slide[key];
            pptx = await contentWithCaption(pptx, font, waterMark);
            const slideCWC = pptx.addSlide({ masterName: "contentWithCaption" });
            const titleCWC = slideDataCWC!.title;
            const contentCWC = slideDataCWC!.content;
            const captionCWC = slideDataCWC!.caption;
            slideCWC.background = { data: base64 };
            slideCWC.addText(titleCWC, {
              placeholder: "title",
              color: colors.title
            });
            if (Array.isArray(contentCWC)) {
              let contentCWCString = contentCWC.map((item, index) => {
              let charCount = item.length;
              if (charCount > maxCharCountForContent) {
                return `${index + 1}. ${item} \n`
              } else {
                return `${index + 1}. ${item}`
              }
              }).join('\n');
              slideCWC.addText(contentCWCString, {
              placeholder: "content",
              lineSpacing: lineSpacing,
              color: colors.body
              });
            } else {
              if (contentCWC.length > maxCharCountForContent) {
              let contentCWCString = contentCWC.replace(/\n/g, '\n\n');
              slideCWC.addText(contentCWCString, {
                placeholder: "content",
                lineSpacing: lineSpacing,
                color: colors.body
              })
              } else {

              slideCWC.addText(contentCWC, {
                placeholder: "content",
                lineSpacing: lineSpacing,
                color: colors.body
              });

              }
            }
            slideCWC.addText(captionCWC, {
              placeholder: "caption",
              color: colors.body
            });
            slideCWC.addText(slideNumber.toString(), {
              color: colors.body,
              placeholder: 'slideNumber'
            });
            break; 
            case "pictureWithCaption":
              let slideDataPWC = slide[key];
              pptx = await pictureWithCaption(pptx, font, waterMark);
              const slidePWC = pptx.addSlide({ masterName: `pictureWithCaption` });
              const titlePWC = slideDataPWC!.title;
              const picturePWC = slideDataPWC!.picture;
              const captionPWC = slideDataPWC!.caption;
              slidePWC.background = { data: base64 };
              slidePWC.addText(titlePWC, {
                placeholder: "title",
                color: colors.title
              });
              if (typeof (picturePWC) === 'string' && findPicture && ix !== -1) {
                slidePWC.addImage({ path: findPicture.picture, w: 6, h: 6, placeholder: "picture" });
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
            case "team":
              let slideDataTeam = slide[key];
              pptx = await team(pptx, font, waterMark);
              const slideTeam = pptx.addSlide({ masterName: `team` });
              const titleTeam = slideDataTeam!.title;
              const contentTeam = slideDataTeam!.first.name;
              const content2Team = slideDataTeam!.second.name;
              const content3Team = slideDataTeam!.third.name;
              const firstPicture = slideDataTeam!.first.picture;
              const secondPicture = slideDataTeam!.second.picture;
              const thirdPicture = slideDataTeam!.third.picture;

              slideTeam.background = { data: base64 };
              slideTeam.addText(titleTeam, {
                placeholder: "title",
                color: colors.title
              });
              slideTeam.addText(contentTeam, {
                placeholder: "lpicName",
                color: colors.body
              });
              slideTeam.addText(content2Team, {
                placeholder: "mpicName",
                color: colors.body
              });
              slideTeam.addText(content3Team, {
                placeholder: "rpicName",
                color: colors.body
              });
              slideTeam.addShape('rect', {
                x: 0.70,
                y: 1.93,
                w: 3.61,
                h: 3.6,
                fill: { color: "1e1c1d" },
                shadow: {
                  type: 'outer',
                  color: '1e1c1d',
                  blur: 18,
                  offset: 2,
                  angle: 45,
                  opacity: 0.5
                },
              })
              slideTeam.addShape('rect', {
                x: 4.82,
                y: 1.93,
                w: 3.61,
                h: 3.61,
                fill: { color: "1e1c1d" },
                shadow: {
                  type: 'outer',
                  color: '1e1c1d',
                  blur: 18,
                  offset: 2,
                  angle: 45,
                  opacity: 0.5
                },
              })
              slideTeam.addShape('rect', {
                x: 8.86,
                y: 1.93,
                w: 3.61,
                h: 3.5,
                fill: { color: "1e1c1d" },
                shadow: {
                  type: 'outer',
                  color: '1e1c1d',
                  blur: 18,
                  offset: 2,
                  angle: 45,
                  opacity: 0.5
                },
              })
              let matchingPictures = photosWithLink.filter((item) => item.slideNumber === slideNumber);
              let placeholders = ['lpic', 'mpic', 'rpic'];
              
              placeholders.forEach((placeholder) => {
                  if (matchingPictures.length > 0) {
                      let picture = matchingPictures[0];
                      slideTeam.addImage({ path: picture.picture, w: 3.63, h: 3.63, placeholder: placeholder });
                      matchingPictures = matchingPictures.slice(1);
                  }
              });

              slideTeam.addText(slideNumber.toString(), {
                color: colors.body,
                placeholder: 'slideNumber'
              });
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
            fs.writeFileSync(`output/${title}.pptx`, new Uint8Array(buffer));
          const bufferString = Buffer.from(buffer)
          const pptxBufferBase64 = bufferString.toString('base64')
          const fileName = `${author}_AiFlavoured.pptx`
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
    