import { documentToText } from "@/aiflavoured/documentsToText";
import { imgToText } from "@/aiflavoured/imgs/imgToText";
import { textSplitter } from "@/aiflavoured/textsplitter";
import { textToEmbeddingAndStore } from "@/aiflavoured/textToEmbeddingAndStore";



export const uploadFileCore = async (userId: string, fileKey: string, fileName: string, fileType:string,session:string ) => {
      const textFromDocuments = await documentToText(fileKey, userId, fileType);

      const splittedDocuments = await textSplitter( textFromDocuments, userId, session);

      const vectoring = await textToEmbeddingAndStore(splittedDocuments);

      if (vectoring.message === "success") {
        return Response.json({ message: "success" });
      }
};
