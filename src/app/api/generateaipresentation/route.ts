import { NextRequest } from "next/server";
import { documentToText } from "@/aiflavoured/documentsToText";
import { pptxDocGenerator } from "@/aiflavoured/presentation/pptxDocGenerator";
import { aiSlidesForFacetThemePresentation } from "@/aiflavoured/presentation/aiSlidesForFacetThemePresentation";
import { aiSlidesForMinimalistSalePitchThemePresentation } from "@/aiflavoured/presentation/aiSlidesForMinimalistSalePitchThemePresentation";
import { aiSlidesForBiomePresentationTheme } from "@/aiflavoured/presentation/aiSlidesForBiomePresentationTheme";
import { textToPresentationContent } from "@/aiflavoured/presentation/generatePresentationFromText";

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
      let pptxDocSummary : string = "";
      const title = files[0].fileName;
      
      if(files.length > 0){
         const resultDoc = await Promise.all(
            files.map(async (file: FileObject) => {                                      //userid  
               const textFromDocument = await documentToText(file.fileKey, file.fileType, id);
               return textFromDocument.map((doc: { pageContent: string }) => doc.pageContent);
            })
            );
            
            fullDocument = resultDoc.flat();      
            pptxDocSummary  = await pptxDocGenerator(model, fullDocument);
      }else{
         pptxDocSummary = await  textToPresentationContent(model, audience,  wordAmount, textInputValue);   ;
      }


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