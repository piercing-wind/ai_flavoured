import { NextRequest } from "next/server";
import {getNumberOfPages} from "@/actions/file/getNumberOfPages";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const files = body.getAll("files[]") as File[];
    const fileTypes = body.getAll("fileTypes[]") as string[];

    const result = []
    for (let i = 0; i < files.length; i++) {
      const numPages = await getNumberOfPages(files[i], fileTypes[i]);
      result.push({fileName : files[i].name,pages : numPages});
    }


    return Response.json({ result });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "error" });
  }
}