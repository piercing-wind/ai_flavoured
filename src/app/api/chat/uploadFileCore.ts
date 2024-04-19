import { documentToText } from "@/aiflavoured/documentsToText";
import { imgToText } from "@/aiflavoured/imgs/imgToText";
import { summarize } from "@/aiflavoured/summarize";
import { textSplitter } from "@/aiflavoured/textsplitter";
import { textToEmbeddingAndStore } from "@/aiflavoured/textToEmbeddingAndStore";



export const uploadFileCore = async (userId: string, fileKey: string, fileName: string, fileType:string,chatId:string ) => {
  switch (fileType) {
    case "application/pdf":
      const textFromDocuments = await documentToText(fileKey, userId, fileType);

      // const summary = await summarize(textFromDocuments);

      const splittedDocuments = await textSplitter( textFromDocuments, userId, chatId);

      const vectoring = await textToEmbeddingAndStore(splittedDocuments);

      if (vectoring.message === "success") {
        return Response.json({ message: "success" });
      }
      break;
    case "image/png":
    case "image/jpeg":
      await imgToText(fileKey, fileType);
      break;
  }
};
