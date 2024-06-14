import { NextRequest } from "next/server";
import { documentToText } from "@/aiflavoured/documentsToText";
import { pptxDocGenerator } from "@/aiflavoured/presentation/pptxDocGenerator";
import { aiSlidesForPresentation } from "@/aiflavoured/presentation/aiSlidesForPresentation";
import { aiSlidesForFacetThemePresentation } from "@/aiflavoured/presentation/aiSlidesForFacetThemePresentation";
import { aiSlidesForMinimalistSalePitchThemePresentation } from "@/aiflavoured/presentation/aiSlidesForMinimalistSalePitchThemePresentation";
import { aiSlidesForBiomePresentationTheme } from "@/aiflavoured/presentation/aiSlidesForBiomePresentationTheme";

interface FileObject {
      id?: number;
      userId?: string;
      fileKey: string;
      fileName: string;
      url: string;
      session?: string;
      fileType: string;
      createdAt?: Date;
    }
export async function POST(req: NextRequest){
      try{

      const body = await req.json();
      const files :FileObject[] = body.files;
      const model = body.ppmodel;
      const id = body.userId  
      const numberOfSlides = body.numberOfSlides;
      const author = body.author;
      const wordAmount = body.wordsAmount;
      const audience = body.audience;
      const imageSearch = body.imageSearch;
      const waterMark : boolean = body.waterMark;
      const textInputValue : string = body.textInputValue;
      const themeFunction :  string = body.themeFunction
     
      let fullDocument: string[] = [];
      
      const resultDoc = await Promise.all(
          files.map(async (file: FileObject) => {                     //userid  
            const textFromDocument = await documentToText(file.fileKey, id, file.fileType);
            return textFromDocument.map((doc: { pageContent: string }) => doc.pageContent);
          })
        );
      
      fullDocument = resultDoc.flat();
    
      const title = files[0].fileName;
      const pptxDocSummary : string = await pptxDocGenerator(model, fullDocument);
      let pptxData : string = ""
      // presentation -> aiSlidesForPresentation

      //names are confusing
      const themeFunctionMapping = {
        'facetThemePresentation': aiSlidesForFacetThemePresentation,
        'ppPartyThemePresentation': aiSlidesForFacetThemePresentation,
        'darkThemeMoonPresentation': aiSlidesForFacetThemePresentation,
        'minimalistSalePitchThemePresentation': aiSlidesForMinimalistSalePitchThemePresentation,
        'biomePresentationTheme': aiSlidesForBiomePresentationTheme,
        'scientificBluePresentationTheme': aiSlidesForBiomePresentationTheme,
      };
      
      if (themeFunction in themeFunctionMapping) {
        const themeFunctionToCall = themeFunctionMapping[themeFunction as keyof typeof themeFunctionMapping];
        pptxData = await themeFunctionToCall(model, numberOfSlides, pptxDocSummary , audience, wordAmount, textInputValue);
      }



      return Response.json({
        author: author.replace(/(\.pdf| )/g, "_"),
        title :  title.replace(/(\.pdf| )/g, "_"),
        pptxData,
        imageSearch,
        userId : id,
        waterMark,
      });          
      }catch(e){

            return Response.json({message: "error"});
      }
}