import { NextRequest } from "next/server";
import { documentToText } from "@/aiflavoured/documentsToText";

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
      const togather = body.togather;
      console.log(files);     

      files.forEach(async (file: FileObject) => {}
      // const id = body.id;
      // const fileType = body.fileType;
      // const aiModel = body.aiModel;
      

      // const textFromDocument = await documentToText(fileKey, id, fileType);
      // console.log(typeof(textFromDocument), textFromDocument);
      // const summary = 

      return Response.json({message: "success"});          
      }catch(e){
            console.log(e);
            return Response.json({message: "error"});
      }
}