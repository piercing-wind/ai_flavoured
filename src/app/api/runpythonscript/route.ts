import {exec as execCb} from "child_process";
import { promisify } from 'util';
import path from 'path';

const exec = promisify(execCb);

export async function GET(req: Request) {
  console.log("Python script running");
 
  const pptxPath = path.resolve('output/ppPartyThemePresentation.pptx');
  const pdfPath = path.resolve('output/python.pdf');
  try {
    const { stdout, stderr } : any = await exec(`python3 pyscripts/script.py ${JSON.stringify(pptxPath)} `);
    console.log("stdout", stdout);
    console.log("stderr", stderr);
    return Response.json({ message: stdout }, { status: 200 });
  } catch (error) {
    console.log("Error in python script", error);
    return Response.json({ error: "Failed to execute python script" },{status: 500});
  }

  // const result = (error: any, stdout: any, stderr: any) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return Response.json({ error: "Failed to execute python script" });
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   output = stdout;

  //   exec(`python3 pyscripts/script.py  ${data}`, result);
  // };
}
