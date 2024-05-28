'use server'
import sharp from 'sharp';
import Jimp from 'jimp';
import { Buffer } from 'buffer';
import { createCanvas, loadImage } from 'canvas';
import http from 'http';

export const webpToJpg = async (link?: string): Promise<string> => {
 try {
      const link = 'https://www.gstatic.com/webp/gallery/4.sm.webp'
      const response = await fetch(link);
      const webpBuffer = await response.arrayBuffer();
      console.log(webpBuffer)
      const jpgBuffer = await sharp(webpBuffer).toFormat('jpeg').toBuffer();
      console.log(jpgBuffer)
      console.log(jpgBuffer.toString('base64'))
      return jpgBuffer.toString('base64');

 }catch(e){
      console.log("eror",e)
 }
      return '';

 }
export const webpToJpg2 = async (link?: string): Promise<string> => {
     try {
          const link = 'https://www.gstatic.com/webp/gallery/4.sm.webp';
          const response = await fetch(link);
          const webpBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(webpBuffer);
          const image = await Jimp.read(buffer);
          const jpgBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
          console.log(jpgBuffer)
          return jpgBuffer.toString('base64');


     } catch (e) {
          console.log("eror2", e)
     }
     return '';
};

export const webpToJpg3 = async (link?: string): Promise<string> => {
     try{
          const link = 'https://www.gstatic.com/webp/gallery/4.sm.webp';
          const  response = await fetch(link);
          if(response.ok){
               const webpBuffer = await response.arrayBuffer();
               const buffer = Buffer.from(webpBuffer);
               console.log(typeof buffer)
               const image = await loadImage(buffer);
               console.log(image)
               const canvas = createCanvas(image.width, image.height);
               const ctx = canvas.getContext('2d');
               ctx.drawImage(image, 0, 0);
               const jpgBuffer = canvas.toBuffer('image/jpeg');
               console.log(jpgBuffer.toString('base64'))
               return jpgBuffer.toString('base64');
          }

     }catch(e){
          console.log("eror3",e)
     }
     return '';
}
export const webpToJpg4 = async (link?: string): Promise<string> => {
     try{
          link = 'https://www.gstatic.com/webp/gallery/4.sm.webp';
          const response = await fetch(link);
          const webpBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(webpBuffer);

               
     }catch(e){
          console.log("eror4",e)
     }
     return '';
}

