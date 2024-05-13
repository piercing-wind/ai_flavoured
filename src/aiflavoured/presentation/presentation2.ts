"use server";

import pptxgen from "pptxgenjs";
import fs from "fs";

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
    const titleColor = "333333";
    const titleAlign = "center";
    const titleValign = "middle";

    // Content section settings
    const contentx = 1;
    const contenty = 2;
    const contentw = 11.41;
    const contenth = 5.75;
    const contentFontSize = 20;
    const contentColor = "666666";
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%"},
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
  const titleColor = "333333";
  const titleAlign = "center";
  const titleValign = "middle";

  //Body section settings
  const bodyx = 1;
  const bodyy = 3.75;
  const bodyw = 11.41;
  const bodyh = 3;
  const bodyFontSize = 20;
  const bodyColor = "666666";
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "center";
  const titleValign = "middle";

  //Subtitle section settings
  const subx = 1;
  const suby = 3.75;
  const subw = 11.41;
  const subh = 3;
  const subFontSize = 20;
  const subColor = "666666";
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
            name: "subtitle",
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "center";
  const titleValign = "middle";

  //Content section settings
  const contentx = 1;
  const contenty = 2;
  const contentw = 5.5;
  const contenth = 4.5;
  const contentFontSize = 20;
  const contentColor = "666666";
  const contentAlign = "left";
  const contentValign = "top";

  //Second content section settings
  const content2x = 7;
  const content2y = 2;
  const content2w = 5.5;
  const content2h = 4.5;
  const content2FontSize = 20;
  const content2Color = "666666";
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "center";
  const titleValign = "middle";

  // Subheading section settings
  const subx = 1;
  const suby = 2;
  const subw = 5.5;
  const subh = 1;
  const subFontSize = 24;
  const subColor = "666666";
  const subAlign = "center";
  const subValign = "middle";

  // Second subheading section settings
  const sub2x = 7;
  const sub2y = 2;
  const sub2w = 5.5;
  const sub2h = 1;
  const sub2FontSize = 24;
  const sub2Color = "666666";
  const sub2Align = "center";
  const sub2Valign = "middle";

  // Content section settings
  const contentx = 1;
  const contenty = 3;
  const contentw = 5.5;
  const contenth = 3.5;
  const contentFontSize = 20;
  const contentColor = "666666";
  const contentAlign = "left";
  const contentValign = "top";

  // Second content section settings
  const content2x = 7;
  const content2y = 3;
  const content2w = 5.5;
  const content2h = 3.5;
  const content2FontSize = 20;
  const content2Color = "666666";
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "center";
  const titleValign = "middle";

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
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "94%", w: 0.5, h: 0.5 },
  });
  return pptx;
}
const blank = (pptx: pptxgen) => {

  pptx.defineSlideMaster({
    title: "blank",
    objects: [
      // Background
      { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "ffffff" } } },
  
      // Footer
      {
        text: {
          text: "© Your Company Name",
          options: {
            x: 1,
            y: 4,
            w: 12.2,
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "left";
  const titleValign = "middle";

  // Content section settings
  const contentx = 7;
  const contenty = 0.5;
  const contentw = 5.5;
  const contenth = 6;
  const contentFontSize = 20;
  const contentColor = "666666";
  const contentAlign = "left";
  const contentValign = "top";

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionColor = "666666";
  const captionAlign = "left";
  const captionValign = "middle";


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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],
    
    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
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
  const titleColor = "333333";
  const titleAlign = "left";
  const titleValign = "middle";

  // Picture section settings
  const picturex = 7;
  const picturey = 0.7;
  const picturew = 6;
  const pictureh = 7;

  // Caption section settings
  const captionx = 0.5;
  const captiony = 2;
  const captionw = 6;
  const captionh = 4;
  const captionFontSize = 24;
  const captionColor = "666666";
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
            h: 6,
            fontSize: 18,
            color: "999999",
            align: "right",
            fontFace: "Arial",
          },
        },
      },
    ],

    slideNumber: { x: 0.1, y: "95%", w: 0.5, h: 0.5 },
  });

  return pptx;
}

export const createPresentationSlides = async () => {
  console.log("presentaion function call");
  let pptx = new pptxgen();

  // Set PPTX Author and Company
  pptx.author = "Brent Ely";
  pptx.company = "S.T.A.R. Laboratories";
  pptx.revision = "15";
  pptx.subject = "Annual Report";
  pptx.title = "PptxGenJS Sample Presentation";

  // Set PPTX Layout (LAYOUT_WIDE, LAYOUT_CUSTOM, etc.)
  pptx.layout = "LAYOUT_WIDE"; //13.33x7.5
  pptx.rtlMode = true;
  pptx.theme = { headFontFace: "Arial Light", bodyFontFace: "Calibri" };



  let data = [{titleAndContent : {title: "Title and Content", body: "Content"}},{twoContent :{
    title : `Ai Flavoured Presention Structure`,
    content : `Hello World from PptxGenJS...${"\n"}qwsdjiasuh this is body text`,
    content2 : `Hello World from PptxGenJS...${"\n"}qwsdjiasuh this is body text i am suceeding`
  }}]
  

  for(let slideData of data){
    let key = Object.keys(slideData)[0];
    switch(key){
      case "titleAndContent":
        pptx = titleAndContent(pptx);
        const slideTAC = pptx.addSlide({ masterName: "titleAndContent" });
        const titleTAC = slideData[key]!.title;
        const bodyTAC = slideData[key]!.body;
        slideTAC.addText(titleTAC, {
          placeholder: "title",
        });
        slideTAC.addText(bodyTAC, {
          placeholder: "body",
        });
        break;
      case "twoContent":
        pptx = twoContent(pptx);
        const slideTC = pptx.addSlide({ masterName: "twoContent" });
        const titleTC = slideData[key]!.title;
        const contentTC = slideData[key]!.content;
        const content2TC = slideData[key]!.content2;
        slideTC.addText(titleTC, {
          placeholder: "title",
        });
        slideTC.addText(contentTC, {
          placeholder: "content",
        });
        slideTC.addText(content2TC, {
          placeholder: "content2",
        });

        break;
      default:
        console.log(`No slide found for key : ${key}`)
    }  
  
}
  
  // pptx = pictureWithCaption(pptx);
  //this for content filling
  // slide.addText(`AI Flavoured Ai Flavoured`, {
  //   placeholder: "subheading",
  // });
  // slide.addText(`Ai FLavoured`, {
  //   placeholder: "subheading2",
  // });
  // slide.addText(`Hello World from PptxGenJS...${"\n"}qwsdjiasuh this is body text`, {
  //   placeholder: "content",
  // });
  // slide.addImage({ path: "public/heartbroken-dog-meme.png", w:6 , h: 6, placeholder: "picture"});
  // //this for image filling
  // slide.addText(`Ai Flavoured Presention Structure`, { placeholder: "title" });





  // Generate a stream
  const streamData = await pptx.stream();
  const buffer = ArrayBuffer.isView(streamData) ? streamData.buffer : undefined;

  // Write the Buffer to a file if it is not undefined
  if (buffer) {
    fs.writeFileSync("output/Presentation.pptx", new Uint8Array(buffer));
  }
  console.log("Exiting");
};











// objects: [
//   { rect: { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "0088CC" } } },
//   //   { image: { x:0, y:0, w:'100%', h:'100%', path:'./assets/background.jpg' } },
//   {
//     placeholder: {
//       options: {
//         name: "title",
//         type: "title",
//         x: 1,
//         y: 0.25,
//         w: 11.41,
//         h: 1,
//         fontSize: 40,
//         color: "FFFFFF",
//         bold: true,
//         align: "center",
//         fontFace: "Calibri",
//       },
//       text: "(Ai Flavoured placeholder text!)",
//     },
//   },
//   {
//     placeholder: {
//       options: {
//         name: "body",
//         type: "body",
//         x: 1,
//         y: 1.37,
//         w: 11.41,
//         h: 5.76,
//         fontSize: 20,
//         color: "ff1a9c",
//         align: "center",
//       },
//       text: "(custom placeholder text!)",
//     },
//   },
// ],