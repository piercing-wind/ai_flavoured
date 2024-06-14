import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import FullScreenPresentationViewer from "./fullScreenPresentationViewer";
import { FaRegEye } from "react-icons/fa6";
import { DisplayTheme } from "@/aiflavoured/presentation/displayThemes";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { IoAlertCircleOutline } from "react-icons/io5";
import { GiCardExchange } from "react-icons/gi";


export const ThemeChange =(
   {
   displayThemes,
   setCurrentTheme,
   setApply,
   setThemeFunction,
   setVariant,
   }:{
   displayThemes : DisplayTheme,
   setCurrentTheme : (v:string)=> void,
   setApply : (v:boolean)=> void,
   setThemeFunction : (v:string)=> void,
   setVariant : (v:string)=> void,
   })=>{
   const [currentPdf, setCurrentPdf] = useState('');
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [preview, setPreview] = useState(new Array(displayThemes.length).fill(false));   

   return (
      <div className="flex items-center justify-center bg-transparent ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <div className='relative rounded-md overflow-hidden cursor-pointer'>
            <div className='absolute top-0 left-0 bg-purple-300 hover:bg-purple-400 dark:bg-pink-100 dark:hover:bg-pink-200 blur-xl h-full w-full'/>
          <Button size="sm" variant={'default'} className='h-8 font-semibold'>Change Theme &nbsp; <GiCardExchange /></Button>      
         </div>
  
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="relative p-4 pt-6 bg-transparent dark:bg-transparent backdrop-blur-lg dark:backdrop-blur-lg z-10 rounded focus:ring-0 focus:outline-none grid grid-cols-3 gap-4"
          align="start"
          side="top"
          >
            <div className="absolute top-3 left-3">
               <IoAlertCircleOutline 
               className="text-lg"
               data-tooltip-id="theme" 
             />
            </div>
          <Tooltip className="z-10 w-96" id="theme">
            <div>Only these theme&apos;s are available for the current PPTX data.</div>
            <div>Please Create new presentation to use other themes.</div>
          </Tooltip>
          {displayThemes.map((theme, index) => (
            <DropdownMenuItem key={index} className="focus:outline-none focus:bg-transparent hover:bg-transparent dark:focus:outline-none dark:focus:bg-transparent dark:hover:bg-transparent cursor-pointer" >
            <div className=" flex items-center flex-col justify-between border-b border-gray-400">
              <div className="h-24 w-44 rounded-md " onClick={(e)=>{
                e.stopPropagation();
                setCurrentPdf(theme.pathPdf);
                setIsOpen(true)
              }}
              style={{
                backgroundImage: `url(${theme.pathSvg})`,   
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}

              onMouseEnter={() => {
                setPreview(prev => {
                  const newPrev = [...prev];
                  newPrev[index] = true;
                  return newPrev;
                });
              }}
              onMouseLeave={() => {
                setPreview(prev => {
                  const newPrev = [...prev];
                  newPrev[index] = false;
                  return newPrev;
                });
              }}
              >    
              {preview[index] && <div className='w-full h-full backdrop-blur-md rounded-md flex items-center justify-center z-10 text-neutral-100 text-sm '><p>Preview</p>&nbsp;<FaRegEye /></div>}                
              </div>

              <div className="relative w-full ">
                {!theme.variant ? 
                 (<div className='relative my-1 p-1 rounded-md w-full bg-neutral-900 text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-slate-200'
                  onClick={(e)=>{
                    if(!theme.variant){
                      setThemeFunction(`${theme.function}`)
                      setCurrentTheme(theme.pathSvg)
                      setApply(true);
                    }else{
                      e.stopPropagation();
                    }
                  }}
                  > 
                  <p className=" text-center text-nowrap text-sm font-semibold">{theme.name}</p>
                  </div>):(
                <DropdownMenu>  
                {isOpen && <FullScreenPresentationViewer filePath={`${currentPdf}`} isOpen={isOpen} setIsOpen={setIsOpen}/>}                  
                <DropdownMenuTrigger asChild>
                  <div className='relative my-1 p-1 rounded-md w-full bg-neutral-900 text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-slate-200'
                  onClick={(e)=>{
                    if(!theme.variant){
                      setThemeFunction(`${theme.function}`)
                      setCurrentTheme(theme.pathSvg)
                    }else{
                      e.stopPropagation();
                    }
                  }}
                  > 
                    <p className=" text-center text-nowrap text-sm font-semibold">{theme.name}</p>
                  </div>

                </DropdownMenuTrigger>
                  <DropdownMenuContent >         
                    <div className="absolute h-16 p-2 space-x-2 backdrop-blur-lg border rounded-md -bottom-16 flex items-center justify-center"
                    onMouseOver={(e)=> e.stopPropagation()}
                    >
                      <DropdownMenuItem onClick={(e)=>{setVariant('green'); setApply(true); setThemeFunction('facetThemePresentation'); setCurrentTheme(theme.variant!.green || '')}}
                        style={{
                          backgroundImage: `url(${theme.variant?.green || ''})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        className=" cursor-pointer h-14 w-24 rounded-md border"
                      />
                      <DropdownMenuItem onClick={(e)=>{setVariant('blue'); setApply(true); setThemeFunction('facetThemePresentation');  setCurrentTheme(theme.variant!.blue || '')}}
                        style={{
                          backgroundImage: `url(${theme.variant?.blue || ''})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        className=" cursor-pointer h-14 w-24 rounded-md border"
                      />
                      <DropdownMenuItem onClick={(e)=>{setVariant('pink'); setApply(true); setThemeFunction('facetThemePresentation'); setCurrentTheme(theme.variant!.pink || '')}}
                        style={{
                          backgroundImage: `url(${theme.variant?.pink || ''})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        className=" cursor-pointer h-14 w-24 rounded-md border"
                      />  
                      </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                )}
                </div>
            </div>
          </DropdownMenuItem>
            ))}

        </DropdownMenuContent>
      </DropdownMenu>
      </div>
   )
}