'use server'
import { google } from 'googleapis';
import { imageToBase64, localImageToBase64 } from '../imgs/imageToBase64';
import {imgs} from './imagesData';
import { googleImagePicker, googleImagesDesignFilterAI } from './googleImagesDesignFilterAI';

export type ImageData = {
      kind: string;
      title: string;
      htmlTitle: string;
      link: string;
      displayLink: string;
      snippet: string;
      htmlSnippet: string;
      mime: string;
      image: {
            contextLink: string;
            height: number;
            width: number;
            byteSize: number;
            thumbnailLink: string;
            thumbnailHeight: number;
            thumbnailWidth: number;
      } 
}
export type Images =  ImageData[];

export const getImagesFromGoogle =async ( query : string) =>{
      try {
      console.log('Getting images from google')
      const customsearch = google.customsearch('v1')
      const googleAPIKey = process.env.GOOGLE_API_KEY;
      const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
            const response = await customsearch.cse.list({
                  cx: searchEngineId,
                  q: query,
                  searchType: 'image',
                  num: 10,
                  key: googleAPIKey,
            });
            console.log("exiting from google")
            if(response.data.items){
            return response.data.items as Images;
            }
      } catch (e) {
            console.log(e);
      }
};

export type Base64Image = {
      link : string;
      base64 : string;
      mime : string;
};
export type Localbase64Image = {
      path : string;
      base64 : string;
      mime : string;
};
export const getImagesFromGoogleAsBase64ArrayWithoutHeaders = async ( query : string) =>{
      console.log('Converting images to base64 without header')
      try {
            let filteredImagesDesgins : Base64Image[] = [];
            let base64Images: Base64Image[] = [];
            const result = await getImagesFromGoogle(query);
            if(result){
            for(let i=0; i < result.length; i++){
                  try{
                        const image : string = result[i].link;
                        const mime : string = result[i].mime;
                        if(mime != 'image/webp'){
                              const base64Image = await imageToBase64(image);
                              if(base64Image !== 'fetch failed'){
                                    base64Images.push({link : image, base64 : base64Image, mime : mime});
                                    console.log({link : image, base64 : base64Image.substring(0,100), mime : mime})
                              }
                        }
                  }catch(e){
                        console.log(e)
                  }     
            }
            const filterAI = await googleImagesDesignFilterAI('gpt-4o', base64Images) as string[];
          console.log(filterAI)
           if(filterAI){ 
            for(let i=0; i < filterAI.length; i++){
                  if(filterAI[i].toLocaleLowerCase() === 'yes' || filterAI[i].toLocaleLowerCase() === 'yes.' || filterAI[i].toLocaleLowerCase().includes('yes')){
                        console.log("Added")
                        filteredImagesDesgins.push(base64Images[i]);
                  }
            }}
            
      }
      console.log(filteredImagesDesgins) 
      return filteredImagesDesgins;
      } catch (e) {
            console.log("Error from here",e);
      }

}
export const getImagesFromGoogleAsBase64ArrayWithHeaders =async ( query : string) =>{
      console.log('working on images from google as base64 with headers')
      try {
            let base64Image = ""
            let base64Images: Base64Image[] = [];
            const result = await getImagesFromGoogle(query);
            if(result){
            for(let i=0; i < result.length; i++){
                  const link : string = result[i].link;
                  const mime : string = result[i].mime;
                  if(mime != 'image/webp'){
                  const base64Image = await imageToBase64(link);
                   if(base64Image !== 'fetch failed'){
                        base64Images.push({link: link, base64 : `${mime};base64,${base64Image}`, mime : mime});
                   }
                  }
            }
            const filterAI = await googleImagePicker('gpt-4o', base64Images, query) as string[];
            if(filterAI){
                  const normalizedArray = filterAI.map(item => item.toLowerCase().replace(/[.!]/g, ''));
                  const index = normalizedArray.indexOf('yes');
                  if(index !== -1){
                        base64Image = base64Images[index].base64;
                        return base64Image;
                  }
                  if(filterAI.length === 0){
                        base64Image = base64Images[1].base64;
                        return base64Image;
                  }
            }            

            }
      } catch (e) {
            console.log(e);
      }
}

type Template = {
      link : string;
      mime : string;

}
type VarientTemplate = {
      path : string;
      mime : string;

}

export const varientsToBase64 = async (template : Template[]) : Promise<Base64Image[]> =>{
      let base64Template : Base64Image[] = [] 
      try{
            for(let i = 0; i < template.length; i++){
                  const base64Image = await imageToBase64(template[i].link);
                  if(base64Image !== 'fetch failed'){
                        base64Template.push({link : template[i].link, base64 :`${template[i].mime};base64,${base64Image}`, mime : template[i].mime});
      
                  }
            } 
            return base64Template;
      }catch(e){
            console.log(e);
      }
      return base64Template;
}
export const localVarientsToBase64 = async (template : VarientTemplate[]) : Promise<Localbase64Image[]> =>{
      let base64Template : Localbase64Image[] = [] 
      try{
            for(let i = 0; i < template.length; i++){
                  const base64Image = await localImageToBase64(template[i].path);
                  if(base64Image !== 'fetch failed'){
                        base64Template.push({path : template[i].path, base64 :`${template[i].mime};base64,${base64Image}`, mime : template[i].mime});
      
                  }
            } 
            return base64Template;
      }catch(e){
            console.log(e);
      }
      return base64Template;
}