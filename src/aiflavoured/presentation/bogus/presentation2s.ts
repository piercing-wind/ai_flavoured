"use server";
import officegen from "officegen";
import fs from "fs";
import path from "path";

//comments are witten by sourabh!

export const createPresentation = () => {
  try {
    console.log("presentaion function call");
    let pptx = officegen({
      type: "pptx", // We want to create a Microsoft Powerpoint document.
      // Extra options goes here.
    });

    // Create a new slide:
    let slide = pptx.makeNewSlide({
      userLayout : 'title'
    });
    slide.name = "The first slide!";
    
    //background image
    slide.back = {type: 'solid', color: '008800'};
    //Title of the slide
    slide.setTitle([
      // This array is like a paragraph and you can use any settings that you pass for creating a paragraph,
      // Each object here is like a call to addText:
      {
        text: 'Hello ',
        options: {font_size: 56}
      },
      {
        text: 'World!',
        options: {
          font_size: 56,
          font_face: 'Arial',
          color: 'ffff00'
        }
      }
    ]);

    // Add some text to the slide:
    slide.addText("Hello, world!", { x: "c", y: "c",fontSize: 24 });

    // Generate the PowerPoint file:
    let outputDir = path.join(__dirname, 'output');
    console.log("outputDir", outputDir)
    fs.mkdirSync(outputDir, { recursive: true }); // Create the output directory if it does not exist.
    let outputPath = path.join(outputDir, 'Presentation.pptx');
    console.log("outputPath", outputPath)
    let stream = fs.createWriteStream(outputPath);
    pptx.generate(stream);
    console.log("Exiting")
  } catch (e) {
    console.log(e);
  }
};

    // Assume you have an array of slide contents:
    // let slideContents = ["Content 1", "Content 2", "Content 3", "Content 4", "Content 5", "Content 6", "Content 7", "Content 8", "Content 9", "Content 10"];

    // // Create a new slide for each content in the array:
    // slideContents.forEach((content, index) => {
    //   let slide = pptx.makeNewSlide();
    //   slide.name = `Slide ${index + 1}`;
    //   slide.addText(content, { x: "c", y: "c" });
    // });