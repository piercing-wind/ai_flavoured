'use server'
import fs from 'fs';

export async function imageToBase64(image: string): Promise<string> {
    try{
          const response = await fetch(image)

          if (response.ok) {
              const imageBuffer = await response.arrayBuffer();
              const base64Image = Buffer.from(new Uint8Array(imageBuffer)).toString('base64');
              return base64Image;
            } else {
                return response.statusText;
            }
        }catch(e){
            if(e instanceof TypeError){
               return e.message;
            }
            else if(e instanceof Error){
            console.log(e.message)
            return e.message;
        }
        }
    return '';
}

export async function localImageToBase64(imagePath: string): Promise<string> {
    try{
        const image = fs.readFileSync(imagePath);
        const base64Image = Buffer.from(image).toString('base64');
        return base64Image;
      
        }catch(e){
            if(e instanceof TypeError){
               return e.message;
            }
            else if(e instanceof Error){
            console.log(e.message)
            return e.message;
            }
        }
    return '';
}
