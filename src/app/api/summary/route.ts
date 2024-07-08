import { NextRequest } from "next/server";
import { documentToText } from "@/aiflavoured/documentsToText";
import { summarize } from "@/aiflavoured/summarize";

export async function POST(req: NextRequest){
      try{

      const body = await req.json();
            
      const fileKey = body.fileKey;
      const id = body.id;
      const fileType = body.fileType;
      const aiModel = body.aiModel;
      

      const textFromDocument = await documentToText(fileKey,fileType , id);
      const summary = await summarize(textFromDocument, aiModel);

      return Response.json({summary});          
      }catch(e){
            console.log(e);
            return Response.json({message: "error"});
      }
}