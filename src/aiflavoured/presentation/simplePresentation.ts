"use server";
import pptxgen from "pptxgenjs";
import fs from "fs";

const titleAndContent = async (pptx: pptxgen, colors : any, model : string) => {
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
export const spresentation = async () => {
      console.log("Called")
      const colors  = {title: "ffb8ea", body: "f2e8ef"}; 
  let pptx = new pptxgen();
      pptx = await titleAndContent(pptx, colors, "gpt-4-turbo");
  let slide = pptx.addSlide({masterName : "titleAndContent"});
  const text =    `Hello World! This AI Flavoured is a project that leverages artificial intelligence to revolutionize document comprehension and learning
  "The platform features advanced summarization engines, interactive communication, multilingual support, and personalized learning experiences."'`
  const lines = text.split('\n');
  const spacedLines = lines.map(line => `${line}\n`.repeat(3).trim()).join('\n');

  slide.addText(
      spacedLines,
    {
     placeholder: "body",
      x: 1.5,
      y: 1.5,
      fontSize: 18,
      color: "363636",
      glow : {size: 10, color: "ff0000", opacity: 1},
    }
  );
  const streamData = await pptx.stream();
  const buffer = ArrayBuffer.isView(streamData) ? streamData.buffer : undefined;
  
  if (buffer) {
      console.log("exiting")
      fs.writeFileSync("output/FPresentation.pptx", new Uint8Array(buffer));
  }
};
