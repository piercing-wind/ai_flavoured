'use client'
import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import {displayThemes} from '@/aiflavoured/presentation/displayThemes'
import Styles from "@/app/frontpage.module.css"

export const DisplayPowerpointImages= ()=>{
   const [hover, setHover] = useState(false)
   const imageDiv = useRef<HTMLDivElement>(null)
   useEffect(()=>{
      function handleDivOutsideClick(event : Event){
         if(imageDiv.current && !imageDiv.current.contains(event.target as Node)){
            setHover(false)
         }
      }
      document.addEventListener('mousedown', handleDivOutsideClick)
      return ()=>{
         document.removeEventListener('mousedown', handleDivOutsideClick)
      }
   },[imageDiv])


   const minimalistSalePitchThemePresentation = displayThemes.find((theme)=>{ return theme.function === 'minimalistSalePitchThemePresentation'})?.pathSvg
   const ppPartyThemePresentation = displayThemes.find((theme)=>{ return theme.function === 'ppPartyThemePresentation'})?.pathSvg
   const scientificBluePresentationTheme = displayThemes.find((theme)=>{ return theme.function === 'scientificBluePresentationTheme'})?.pathSvg
   const darkThemeMoonPresentation = displayThemes.find((theme)=>{ return theme.function === 'darkThemeMoonPresentation'})?.pathSvg
   
   return (
      <div className='w-full ml-2 sm:ml-0 mt-12 md:mt-0 h-[12rem] sm:h-[15rem] md:w-[45%] md:h-[14rem] lg:w-[45%] xl:h-[20rem] lg:h-[18rem] rounded-xl relative overflow-visible' >

       <div className="w-full h-full relative rounded-xl overflow-hidden"
         onClick={()=>setHover(true)}
         onMouseEnter={()=>setHover(true)}
         style={{boxShadow : '-1px -1px 5px #fff4f4' }}
       >
          <Image
             src={'/frontPageimages/presentationDisplay.png'}
             alt="Picture of AI Presentation"
             fill
             style={{
                objectFit :'fill',
             }}
          />
       </div>
       <div className='w-full h-full max-w-[34rem] max-h-[20rem] absolute -top-3 -left-3 -z-10' >
          <div className="w-full h-full relative rounded-xl overflow-hidden"
          style={{boxShadow : '-1px -1px 5px #ff0786'  }}
          >
             <Image
                src={minimalistSalePitchThemePresentation ? minimalistSalePitchThemePresentation : '/frontPageimages/presentationDisplay.png'}
                alt="Picture of AI Presentation"
                fill
                style={{
                   objectFit :'cover',
                }}
             />
          </div>
       </div>
             {hover &&
             <div 
             ref={imageDiv}
             onMouseLeave={()=>setHover(false)}
             className='absolute z-20 -top-60 left-12 md:-left-12 lg:-left-24 md:-top-10 lg:top-0 block md:grid md:grid-cols-2 md:w-[25rem] lg:w-[37rem]'>
               <div className={`rounded-xl overflow-hidden mt-10 relative h-[7.5rem] md:h-[7.5rem] w-[12rem] lg:h-[10rem] lg:w-[17rem] ${Styles.animate_from_left_top} `} style={{backgroundColor : '#ff0786'}}>
                 <Image
                   src={ppPartyThemePresentation ? ppPartyThemePresentation : '/frontPageimages/presentationDisplay.png'}
                   alt="Picture of AI Presentation"
                   fill
                   className='p-2' 
                   style={{
                     objectFit :'fill',
                   }}
                 />
               </div>
                 <div className={`relative  rounded-xl mt-5 overflow-hidden h-[7.5rem] md:h-[7.5rem] w-[12rem] lg:h-[10rem] lg:w-[17rem] ${Styles.animate_from_right_top}`} style={{backgroundColor : '#ff0786'}}>
                   <Image
                     src={darkThemeMoonPresentation ? darkThemeMoonPresentation : '/frontPageimages/presentationDisplay.png'}
                     alt="Picture of AI Presentation"
                     fill
                     className='p-2' 
                     style={{
                       objectFit :'fill',
                     }}
                   />
                 </div>
             <div className={`relative rounded-xl mt-5 overflow-hidden h-[7.5rem] md:h-[7.5rem] w-[12rem] lg:h-[10rem] lg:w-[17rem] ${Styles.animate_from_left_bottom}`} style={{backgroundColor : '#ff0786'}}>
               <Image
                 src={scientificBluePresentationTheme ? scientificBluePresentationTheme : '/frontPageimages/presentationDisplay.png'}
                 alt="Picture of AI Presentation"
                 fill
                 className='p-2' 
                 style={{
                   objectFit :'fill',
                 }}
               />
             </div>
             <div className={`relative rounded-xl mt-5 md:mt-0 mb-10 overflow-hidden h-[7.5rem] md:h-[7.5rem] w-[12rem] lg:h-[10rem] lg:w-[17rem] ${Styles.animate_from_right_bottom}`} style={{backgroundColor : '#ff0786'}}>
               <Image
                 src={minimalistSalePitchThemePresentation ? minimalistSalePitchThemePresentation : '/frontPageimages/presentationDisplay.png'}
                 alt="Picture of AI Presentation"
                 fill
                 className='p-2' 
                 style={{
                   objectFit :'fill',
                 }}
               />
             </div>
            </div>
         }
          
   </div>  
   )
}

export const ChatWithDocumentImage =()=>{
   
   return(
      <div className='relative h-[25rem] sm:h-[32rem] md:h-[40rem] lg:h-[52rem] w-full'>
             <Image
                unoptimized
                src={'/frontPageimages/frontPage.png'}
                alt="Picture of AI Presentation"
                fill
                style={{
                   objectFit :'contain'
                }}
              />
  
     </div>
   )
}