import { OpenAIEmbeddings } from "@langchain/openai";
import {
  DistanceStrategy,
  PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { pool } from "@/db/db";

const originalConfig = {
  pool: pool,
  tableName: '"AIMemory"',
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
    vectorColumn : 3072,
  },
  // supported distance strategies: cosine (default), innerProduct, or euclidean
  distanceStrategy: "cosine" as DistanceStrategy,
};

export const vectorStore = async () => {
  const pgvectorStore = new PGVectorStore(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-large",
    }),
    originalConfig
  ); 
  return pgvectorStore;
}
// convert text to embeddings and store in the vector store

export const textToEmbeddingAndStore = async (documents: any) => {
  const pgvectorStore = await vectorStore();
  try {
    await pgvectorStore.addDocuments(documents);
    // console.log("Documents added to the vector store");
    return { message: "success" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
