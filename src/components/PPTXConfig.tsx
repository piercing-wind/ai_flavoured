'use client'
import React, { useState } from "react";
import Styles from "@/app/(x)/chat/chat.module.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CgDetailsMore } from "react-icons/cg";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoAddSharp, IoCheckmarkSharp, IoChevronDown } from "react-icons/io5";
import { PiListBullets, PiTextAlignCenterThin } from "react-icons/pi";
import { Divider } from "./divider";
import FullScreenPresentationViewer from "./fullScreenPresentationViewer";
import { FaRegEye } from "react-icons/fa";
import { displayThemes, DisplayTheme } from "@/aiflavoured/presentation/displayThemes";

export const PPTXConfig = ({
setSlides,
setWordsAmount,
setAudience,
setImageSearch,
setThemeFunction,
setVariant,
slides,
wordsAmount,
audience,
imageSearch,
variant
}:{
  setSlides : (v: number) => void,
  setWordsAmount : (v: string) => void,
  setAudience : (v: string) => void,
  setImageSearch : (v: string) => void,
  setThemeFunction : (v: string) => void,
  setVariant : (v: string) => void,
  variant : string,
  themeFunction: string,
  slides: number,
  wordsAmount: string,
  audience: string,
  imageSearch: string

}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>('https://di6ccwru5n10a.cloudfront.net/public/displayThemes/ppPartyTheme.svg');
  const [seeMoreTheme, setSeeMoreTheme] = useState<boolean>(false);
  const [preview, setPreview] = useState(new Array(displayThemes.length).fill(false));
  const [currentPdf, setCurrentPdf] = useState('');
  // const [varintDisplay, setVarintDisplay] = useState(new Array(displayThemes.length).fill(false));

  const audienceData = ['General', 'Students', 'Professionals', 'Experts', 'Bussiness', 'Teacher', 'Employee', 'Colleague']

 
  return (
    <div
      className={`relative backdrop-blur-xl text-gray-800 dark:text-gray-200 w-full justify-center flex items-center z-20 `}
    >
      <div className="bg-neutral-100 dark:bg-neutral-950 rounded-md">
      <div className="flex space-x-4 items-center m-2">
        {/* /Themes */}
        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center m-2 h-16 w-28 border border-gray-500 rounded focus:outline-none cursor-pointer "
                style={{
                  backgroundImage: `url(${currentTheme})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onMouseEnter={()=> setSeeMoreTheme(true)}
                onMouseLeave={()=> setSeeMoreTheme(false)}
              >   
              {seeMoreTheme && <div className='w-full h-full backdrop-blur-md rounded flex items-center justify-center z-10 text-sm font-semibold text-gradient'>More Themes</div>}              
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              className="relative p-4 backdrop-blur-3xl z-20 rounded focus:ring-0 focus:outline-none grid grid-cols-3 gap-4"
              align="start"
              side="top"
              style={{
                backgroundImage: 'linear-gradient(to top right, #ff6e7f, #bfe9ff)',
              }}
              >
              {displayThemes.map((theme, index) => (
                <DropdownMenuItem key={index} className="focus:outline-none cursor-pointer" >
                <div className=" flex items-center flex-col justify-between border-b border-gray-400">
                  <div className=" h-24 w-44 rounded-md border border-black " onClick={(e)=>{
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

                  <div className="relative w-full">

                    {!theme.variant ? 
                     (<div className='relative my-1 p-1 rounded-md w-full bg-neutral-900 text-neutral-100 hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-slate-200'
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
                      <DropdownMenuContent>         
                        <div className="absolute z-20 h-16 p-2 space-x-2 backdrop-blur-lg border rounded-md -bottom-16 flex items-center justify-center"
                        onMouseOver={(e)=> e.stopPropagation()}
                        style={{
                          backgroundImage: 'linear-gradient(to top right, #ff6e7f, #bfe9ff)',
                        }}
                        >
                          <DropdownMenuItem onClick={(e)=>{setVariant('green');  setThemeFunction('facetThemePresentation'); setCurrentTheme(theme.variant!.green || '')}}
                            style={{
                              backgroundImage: `url(${theme.variant?.green || ''})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                            className="h-14 w-24 rounded-md border"
                          />
                          <DropdownMenuItem onClick={(e)=>{setVariant('blue'); setThemeFunction('facetThemePresentation'); setCurrentTheme(theme.variant!.blue || '')}}
                            style={{
                              backgroundImage: `url(${theme.variant?.blue || ''})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                            className="h-14 w-24 rounded-md border"
                          />
                          <DropdownMenuItem onClick={(e)=>{setVariant('pink'); setThemeFunction('facetThemePresentation'); setCurrentTheme(theme.variant!.pink || '')}}
                            style={{
                              backgroundImage: `url(${theme.variant?.pink || ''})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                            className="h-14 w-24 rounded-md border"
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


        <div className="text-left">
         <p><b>Generate New AI Presentation</b></p>
         <p className="text-sm">Create PPTX presentations powered by the world&apos;s fastest and smartest AI, GPT-4o &#40; Omni &#41;.</p>
        </div>
      </div>
        <Divider className='my-1 w-full '/>
        <div className="flex flex-wrap justify-center rounded p-2 px-10 flex-grow ">
        {/* for slides */}
        <div className="slidesDropdown  ">
        <p className="mx-4 text-center">
        Slides / Pages
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-800 w-32 px-2 rounded-md h-8">
              {slides} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className=" z-20 bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={()=>setSlides(7)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>7</p>
              {slides === 7 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSlides(10)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>10</p>
              {slides === 10 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSlides(15)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>15</p>
                  {slides === 15 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSlides(20)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p className="shiny-text">20</p>
              {slides === 20 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSlides(25)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
            <p className="shiny-text">25</p>
            {slides === 25 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {/* for word amounts */}
        <div className="wordAmountsropDown ">
        <p className="mx-4 text-center">
        Wording
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-800 w-32 px-2 rounded-md h-8">
              {wordsAmount} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className=" z-30  bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={() => setWordsAmount('Bullets')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Bullets</p> <PiListBullets/>
              {wordsAmount === 'Bullets' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setWordsAmount('Concise')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Concise</p> <PiTextAlignCenterThin />
                  {wordsAmount === 'Concise' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setWordsAmount('Regular')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Regular</p> <CiTextAlignLeft />
                  {wordsAmount === 'Regular' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setWordsAmount('Detailed')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Detailed</p> <CgDetailsMore />
             {wordsAmount === 'Detailed' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {/* Audience drop down */}
        <div className="audienceDropDown">
        <p className="mx-4 text-center">
        Audience
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-800 w-32 px-2 rounded-md h-8">
              {audience} <IoChevronDown />
           </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`h-52 z-20 overflow-auto bg-neutral-100 dark:bg-neutral-900 rounded ${Styles.chatscroll}`}>
            {audienceData.map((audienceList, index) => (
            <DropdownMenuItem key={index} onClick={() => setAudience(audienceList)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-36 px-2 h-8">
              <p>{audienceList}</p> 
                  <span>
                {audienceList === audience && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
                </span>
            </div>                 
            </DropdownMenuItem>
            ))}
         
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      {/* Image Dropdown */}
      <div className="imagedropdown">
        <p className="mx-4 text-center">
        Images Search
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center -z-10 justify-between m-2 border border-gray-800 w-40 px-2 rounded-md h-8">
              {imageSearch} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-3xl bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={() => setImageSearch('Google Search')}>
            <div className=" flex items-center justify-between border-b border-gray-400 w-40 px-2 h-8">
              <p>Google Search</p> 
              <span>
                {imageSearch === 'Simple Search' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
                </span>
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setImageSearch('AI Search')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-300 w-40 px-2 h-8 text-nowrap">
              <p className=" font-semibold shiny-text">AI Search </p> 
              &nbsp;
              <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border text-sm justify-end">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            {imageSearch === 'AI Search' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
        
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setImageSearch('AI Generated')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-300 w-40 px-2 h-8 text-nowrap">
            <p className=" font-semibold shiny-text">AI Generated</p> 
              &nbsp;
              <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border text-sm justify-end">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            {imageSearch === 'AI Generated' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
         
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
       </div>          
      </div>  
      {/* <div className="w-28 my-2 flex justify-end self-end">
      <Button onClick={()=>handleGenerate()} variant='outline' className=" border-pink-300 bg-red-100 dark:text-black hover:bg-neutral-200 text-base h-8 w-28 px-4" >
      Create PPTX
      </Button>
      </div>   */}
      </div>       
  );
};
