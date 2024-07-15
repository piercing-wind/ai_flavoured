import { NextRequest } from "next/server";
import libre from "libreoffice-convert";
import { uploadToS3 } from "@/actions/file/awsS3";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const base64 = body.pptxBufferBase64;
  const param = body.param;
  const fileName = body.fileName;
  const user = body.userId;

  const pptxBuf =  Buffer.from(base64, 'base64');
  try {
    const convertToPdf = (buffer: Buffer): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        libre.convert(buffer, '.pdf', undefined, (err, pdfBuffer) => {
          if (err) {
            return reject(err);
          }
          resolve(pdfBuffer);
        });
      });
    };

    const pdfBuffer = await convertToPdf(pptxBuf);
    const upload  = await uploadToS3(fileName.replace(".pptx", ".pdf"), "application/pdf", pdfBuffer.length, user, param, "aiflavoured");
    if(upload && 'awsS3' in upload){
      const url = upload.awsS3.url;
      try{
        const res = await fetch(url, {
          method: "PUT",
          headers: {'Content-Type': 'application/pdf'},
          body: pdfBuffer
        })
        if(res.ok){
        }
      }catch(e){
        console.log("error upload", e);
      }
    }
    return Response.json({success : "Success"} );

  } catch (e) {
    console.log(e);
    return Response.json({ error: "An Error Occured" });
  }
}
