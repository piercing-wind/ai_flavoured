import { downloadFileFromS3 } from "@/actions/file/downloadFileFromS3";
import { createWorker } from "tesseract.js";

export const imgToText = async (fileKey: string, fileType: string) => {
 
  const buffer: any = await downloadFileFromS3(fileKey);
  const blob = new Blob([buffer], { type: fileType });
  const arrayBuffer = await blob.arrayBuffer();
 
  const worker = await createWorker("eng", 1, {
    logger: (m) => console.log(m.progress),
  });

  // const worker = await createWorker('eng',1,{workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js"});
  try {
    const img = "/tmp/Screenshot from 2024-04-04 17-57-49.png";
    const { data: { text }} = await worker.recognize(blob);
    console.log(text);
    return text;
  } catch (error) {
    console.log("image extraction error", error);
    throw error;
  } finally {
    await worker.terminate();
  }
};
