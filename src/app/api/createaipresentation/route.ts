import { NextRequest } from "next/server";
import { documentToText } from "@/aiflavoured/documentsToText";
import { pptxDocGenerator } from "@/aiflavoured/presentation/pptxDocGenerator";
import { aiSlides } from "@/aiflavoured/presentation/aiSlides";
import { PresentaionData, presentation } from "@/aiflavoured/presentation/presentation";

interface FileObject {
      id: number;
      userId: string;
      fileKey: string;
      fileName: string;
      url: string;
      chatId: string;
      fileType: string;
      createdAt: Date;
    }
export async function POST(req: NextRequest){
      try{

      const body = await req.json();
      const files :FileObject[] = body.files;
      const model = body.aiModel;
      const id = body.userId  
      const numberOfSlides = body.numberOfSlides;
      const author = body.author;
      const wordAmount = body.wordsAmount;
      const audience = body.audience;
      const imageSearch = body.imageSearch;
      const modelForColorAndTitle = body.modelForColorAndTitle; 
      
  
      let fullDocument: string[] = [];
      
      const resultDoc: string[][] = await Promise.all(
          files.map(async (file: FileObject) => {
            const textFromDocument = await documentToText(file.fileKey, id, file.fileType);
            return textFromDocument.map((doc: { pageContent: string }) => doc.pageContent);
          })
        );
      fullDocument = resultDoc.flat();
    
      const title = files[0].fileName;
      const pptxDocSummary : string = await pptxDocGenerator(model, fullDocument);
      const pptxData = await aiSlides(model, numberOfSlides, pptxDocSummary , audience, wordAmount);
     
      // const pptx = await presentation(pptxParameters);


      return Response.json({
        author,
        title,
        pptxData,
        imageSearch,
        modelForColorAndTitle,
        userId : id
      });          
      }catch(e){

            return Response.json({message: "error"});
      }
}