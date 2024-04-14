import {exec as execCb} from "child_process";
import { promisify } from 'util';

const exec = promisify(execCb);

export async function GET(req: Request) {
  console.log("Python script running");
  let output = "";
  const data = "Sourabh";

  try {
    const { stdout, stderr } : any = await exec(`python3 pyscripts/script.py  ${data}`);
    console.log("stdout", stdout);
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
