import { documentToText } from "@/aiflavoured/documentsToText";
import { imgToText } from "@/aiflavoured/imgs/imgToText";
import { textSplitter } from "@/aiflavoured/textsplitter";
import { textToEmbeddingAndStore } from "@/aiflavoured/textToEmbeddingAndStore";



export const uploadFileCore = async (userId: string, fileKey: string, fileName: string, fileType:string,chatId:string ) => {
      const textFromDocuments = await documentToText(fileKey, userId, fileType);

      const splittedDocuments = await textSplitter( textFromDocuments, userId, chatId);

      const vectoring = await textToEmbeddingAndStore(splittedDocuments);

      if (vectoring.message === "success") {
        return Response.json({ message: "success" });
      }
};
