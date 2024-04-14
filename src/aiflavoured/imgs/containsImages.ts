'use server'
import { getDocument } from 'pdfjs-dist';
import pdfParse from 'pdf-parse';
import fs from 'fs';
export const containsImages = async (pdfUrl: any) => {

  try {
    let dataBuffer = fs.readFileSync(pdfUrl);
    pdfParse(dataBuffer).then(async (data) => {
      const images = (data as any).images; // Access the 'images' property from the 'data' object
      if (images && images.length > 0) {
        console.log('Images found in PDF:', images);
        return true; // Found images on this page
      }
    });
    console.log('No images found in PDF');
    return false; // No images found in the entire PDF

  } catch (error) {
    console.error('Error checking for images in PDF:', error);
    throw error;
  }
};
