import {uploadFileCore} from "./uploadFileCore"

export async function PUT(req:Request){
      const body = await req.json();
      // console.log(body);
      // const uploadedFiles = body.uploadedFiles;
      for (const file of body) {  
          const userId = file.data.userId;
          const fileKey = file.data.fileKey;
          const fileName = file.data.fileName;
          const session = file.data.session;
          const fileType = file.data.fileType;
    
          console.log("from route", fileName);
          try{
            
            await uploadFileCore(userId, fileKey, fileName, fileType, session); 
    
          }catch(e){
            console.log(e);
            return Response.json({message: "error"});
          }
        }
        return Response.json({message: "success"});
    } 
    