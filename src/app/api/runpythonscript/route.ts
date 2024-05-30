import {exec as execCb} from "child_process";
import { promisify } from 'util';
import path from 'path';

const exec = promisify(execCb);

export async function POST(req: Request) {
  const body = await req.json();
  const respptxPath = body.path;
  console.log("Python script running");
  const pptxPath = path.resolve(respptxPath);

  try { 
    const { stdout, stderr } : any = await exec(`python pyscripts/script.py ${pptxPath} `);

    console.log("stderr", stderr);

    return Response.json({ pdfBase64: stdout }, { status: 200 });
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
