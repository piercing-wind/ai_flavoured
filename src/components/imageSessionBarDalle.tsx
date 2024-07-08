"use client";

import React, { RefObject, createRef, useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import ChatGPTIcon, { LogoText } from "./logo";
import { ModeToggle } from "@/components/themeModeChange";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Styles from "@/app/(x)/chat/chat.module.css";
import UpscaleButton from "@/components/social.module.css"
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { HiOutlineThumbDown } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import { BiShareAlt } from "react-icons/bi";

import { UserIcon } from "./userIcon";
import Share from "./share";
import { Data, uploadImageToS3 } from "@/actions/userPromptImage/uploadImageToS3";
import {  insertUserPromptImage, updateLike } from "@/actions/userPromptImage/userPromptImage";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "@/components/ui/label"
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { GoInfo } from "react-icons/go";
import { FaHatWizard } from "react-icons/fa6";
import { Input } from "./ui/input";
import {
   Tooltip as ShadCNTooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
 } from "@/components/ui/tooltip"

import { updateImageQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { Pricing } from "./pricing";
import { textToImageOpenAI } from "@/openai_models/textToImageOpenAi";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"

import { RightBar } from "./configRightBarForImageSessionDalle";
import { ServerUserProfile } from "./header/links/serverUserProfile";

 

type DataType = {
   id: string;
   userId: string;
   session: string;
   prompt?: string | null;
   images : Data[];
   createdAt?: Date;
   updatedAt?: Date;
 }[];

export type Database = {
   id : string;
   userId: string;
   session: string;
   images : Data[];
   prompt?: string | null;
}

export const ImageSessionBarDalle = ({
  user,
  params,
  prevUserPromptImages,
  chatName,
  imageQuota,
}: {
  user: any;
  params: { slug: string };
  prevUserPromptImages: DataType;
  chatName: string;
   imageQuota: number;
}) => {
  const [remainingImageQuota, setRemaingImageQuota] = useState<number>(imageQuota);
  const [error, setError] = useState<boolean>(false);
  const [model, setModel] = useState<'dall-e-2' | 'dall-e-3'>("dall-e-3");
  const [textInputValue, setTextInputValue] = useState("");
  const [isOpen, setIsOpen] = useState('');
  const [like, setLike] = useState(()=>{
   const initialLikes: Record<string, boolean | null> = {};
   prevUserPromptImages.forEach((promptAndImage) => {
      promptAndImage.images!.forEach(image => {
         initialLikes[image.id!] = image.like;
      });
   });
   return initialLikes;
  })
  const [share, setShare] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [prevUserData, setPrevUserData] = useState<DataType>(prevUserPromptImages);
  const { toast } = useToast();
  const shareRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const [loadingTempPrompt, setLoadingTempPrompt] = useState<string>('');
  
  const [size, setSize] = useState<'256x256' | '512x512' | '1024x1024'>("1024x1024");
  const [samples, setSamples] = useState<number>(1); 
  const [imageStyle, setImageStyle] = useState<'vivid' | 'natural'>('vivid');
  //loader animation
  const [loading, setLoading] = useState(false);
  const [upscaling, setUpscaling] = useState(false);
  const [positions, setPositions] = useState(Array(10).fill({top: '0%', left: '0%'}));
  
  const [clickedImageId, setClickedImageId] = useState<string | null>(null);
  const imageRefs = useRef<Record<string, React.RefObject<HTMLImageElement>>>({});
  const endRef = useRef<HTMLDivElement>(null);

  const colors = ['bg-pink-600', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-indigo-500', 'bg-orange-500'];
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(positions.map(() => ({top: `${Math.random()*100}%`, left: `${Math.random()*100}%`})));
    }, 1000); // Change positions every 1 second

    return () => clearInterval(interval); // Clean up on component unmount
  }, [positions]);

 const handleShare = (id: string, cloudUrl : string,e:  React.MouseEvent ) => {
    e.stopPropagation();
    setImagePath(cloudUrl);
    setShare(`${webUrl}/share/${id}`);
    console.log(share);
 };  
  
const handleLike = async (id: string, value: boolean | null) => {
   setLike(prevLikes => ({ ...prevLikes, [id]: value })); 
   await updateLike(id, value);
 };

const generateImageAndStoreToS3 = async () => {
   setLoadingTempPrompt(textInputValue);
   setTextInputValue('');
   setLoading(true);

   console.log(remainingImageQuota)
   if(remainingImageQuota <= samples){
      toast({
         variant: "destructive",
         title: "Insufficient Image Quota",
         description: `You have reached your image quota limit. Please upgrade your plan to continue generating images.`,
       });
         setLoading(false)
         setTextInputValue('')
         setError(true)
         return;
   }
   setRemaingImageQuota(remainingImageQuota - samples);
   try{
    const text2imgData = {
      prompt : textInputValue, 
      samples : samples,
      model : model,
      size : size,
      style : imageStyle,
      userId :  user.id,
   };  
   const images = await textToImageOpenAI(text2imgData)   
   const data : Database = {
     id: uuidv4(),
     userId: user.id, 
     session: params.slug,
     images: images,
     prompt: textInputValue,
   }

   toast({
      title: "Image Generated Successfully",
      description: "Your image is ready! Feel free to download and share it with your friends. 🌟",
    });
    images.forEach(image => {
      setLike(prevLikes => ({ ...prevLikes, [image.id]: null }));
    });

   setPrevUserData(prev => [...prev, data]);
   setLoading(false);
   await saveToDatabase(data, images);
   } catch (e) {
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "Image Generation Error",
         description: `We couldn't generate your image :${error.message}`,
       });
      setLoading(false);
      return;
   }
 };
 const saveToDatabase = async (data: Database , images : Data[]) => {
   try{
      await updateImageQuota(user.id, remainingImageQuota);
      await insertUserPromptImage(data, images);
   }catch(e){
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "Image Save Error",
         description: `Error saving image to database: ${error.message}`,
       });
   }
 };

 const handleDownload = (url : string , fileName : string) => {
   const link = document.createElement('a');
   link.href = url;
   link.download = fileName ; 
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   toast({
      title: "Image Downloading started.s",
      description: "Your image is downloaded! Feel free to share it with your friends. 🌟",
    });
 }

 useEffect(() => {
   function handleClickOutside(event: MouseEvent) {
     if (shareButtonRef.current && shareButtonRef.current.contains(event.target as Node)) {
       return;
     }
     if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
       setShare("");
     }
   }
 
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [shareRef, shareButtonRef]);


useEffect(() => {
  prevUserData.forEach((data) => {
    data.images.forEach((image) => {
      if (!imageRefs.current[image.id]) {
        imageRefs.current[image.id] = React.createRef();
      }
    });
  });
}, [prevUserData]);

 useEffect(() => {
   if (isOpen && clickedImageId !== null && imageRefs.current[clickedImageId]?.current) {
     const imageElement = imageRefs.current[clickedImageId].current as HTMLImageElement;
     const requestFullscreen = imageElement.requestFullscreen;
 
     if (requestFullscreen) {
       requestFullscreen.call(imageElement);
     }
   }
 }, [isOpen, clickedImageId]);


useEffect(() => {
   const end = endRef.current;
   if (end) {
       end.scrollIntoView({ behavior: "smooth" });
   }
}, [prevUserData, loading]); 

useEffect(() => {
   const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
           setIsOpen("");
       }
   };

   window.addEventListener('keydown', handleKeyDown);

   // Clean up the event listener when the component unmounts
   return () => {
       window.removeEventListener('keydown', handleKeyDown);
   };
}, []);

  return (
    <>
    <Toaster />
    {error && <Pricing setPricing={setError}/>}
    {isOpen !== "" && (
      <div 
      className="z-50 backdrop-blur-md"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} onClick={() => setIsOpen("")}>
        <img  src={isOpen} alt="a cat" style={{maxWidth: '100%', maxHeight: '100%'}}  onContextMenu={(e) => e.preventDefault()}/>
      </div>
    )}
      <main className="relative w-full flex-col flex h-full flex-grow">
        <div className="relative flex flex-wrap p-3 items-center justify-between shadow-md">
          <div className="rounded-r-sm flex items-center text-nowrap">
            {chatName} &nbsp; &nbsp; <ChatGPTIcon />
          </div>
          <div className="flex flex-wrap items-center justify-center">

            <div className=" flex items-center ml-4 rounded-md">
            <Select defaultValue={model} onValueChange={(v)=>{setModel(v as 'dall-e-2' | 'dall-e-3'); if(v === "dall-e-3"){setSamples(1); setSize('1024x1024')}}}>
              <SelectTrigger className=" h-8 w-28 focus:ring-0 focus:outline-none focus:border-none dark:bg-inherit">
                <SelectValue placeholder={model} />
              </SelectTrigger>
              <SelectContent>
               <div className="flex items-center space-x-2">
                  <ChatGPTIcon /> <SelectItem value="dall-e-3"> Dall-E 3</SelectItem>
               </div>
               <div className="flex items-center space-x-2">
                  <ChatGPTIcon /> <SelectItem value="dall-e-2"> Dall-E 2</SelectItem>
               </div>
              </SelectContent>
            </Select>
            </div>
            <div className="mx-2">
               <ServerUserProfile user={user}/>
               <ModeToggle/>

            </div>
        </div>
      </div>
      
        <div className=" h-full relative flex flex-col w-full justify-center items-center overflow-hidden ">
          <div className="flex w-full h-full justify-center relative overflow-hidden">
           
          <div className={`w-full p-2  overflow-y-auto ${Styles.chatscroll}`}>

           {share !== "" && (
              <Share ref={shareRef} shareUrl={share} setShare={setShare} cloudUrl={imagePath} />
            )}

            {prevUserData.map((promptAndImage,indexx) =>( 
               <div key={promptAndImage.id}  className="w-full">
                  {promptAndImage.prompt && 
                  <div className="flex space-x-4 p-2">
                     <UserIcon userImage={user?.image}/>
                     <div className={`p-2 w-[70%] rounded-md break-words dark:border-neutral-700 shadow-sm shadow-neutral-700 `}>
                        {promptAndImage.prompt}
                     </div>
                  </div>
                  }
                  
                  <div className=" flex space-x-4 p-2 mb-10">
                     <span>
                        <LogoText className="h-9 w-9"/>
                     </span>
                     <div className=" max-w-[90%] md:max-w-[70%] flex  p-2 dark:bg-neutral-800 rounded-md space-x-1 relative shadow-md dark:shadow-neutral-600">
                       {promptAndImage.images.map((image, index) =>(
                        <div className={`flex relative ${image.upscaled && "w-full"} `}
                        key={index}
                        >
                           <img 
                           ref={imageRefs.current[image.id]}
                           src={image.url} 
                           alt ={image.fileName}
                           className="cursor-pointer hover:scale-[1.005]"
                           style={{width: "100%", height: "100%"}}
                           onClick={() => {setIsOpen(image.url); setClickedImageId(image.id);}}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                          
                        <div className=" absolute flex text-xl my-2 space-x-4 right-2 bottom-0 text-white">
                           {like[image.id] === null ? <AiOutlineHeart className=' cursor-pointer ' onClick={()=>handleLike(image.id, true)}/> : (like[image.id] && <IoIosHeart className="text-red-700 cursor-pointer" onClick={()=>handleLike(image.id, null)}/> )}
                           {like[image.id] === null ? <HiOutlineThumbDown  className=' cursor-pointer' onClick={()=>handleLike(image.id, false)}/> : (!like[image.id] && <HiThumbDown className='cursor-pointer' onClick={()=>handleLike(image.id, null)}/>)}
                           <HiDownload className="cursor-pointer" onClick={()=>handleDownload(image.url,image.fileName)}/>
                           <div ref={shareButtonRef} onClick={(e : React.MouseEvent)=>{handleShare(image.id, image.url,e)}}>
                            <BiShareAlt className="cursor-pointer"  />
                           </div>
                        </div>
                        </div>
                       ))}
                     </div>
                  </div>
               </div>
            ))}

            {/* loader */}
            {loading &&
               <div className="w-full">
                  {upscaling && 
                  <div className="flex space-x-4 p-2">
                     <UserIcon userImage={user?.image}/>
                     <div className={`p-2 w-[70%] rounded-md break-words dark:border-neutral-700 shadow-sm shadow-neutral-700 `}>
                        {loadingTempPrompt}
                     </div>
                  </div>
                  }
                  <div className="flex space-x-4 p-2 opacity-50">
                     <LogoText className="h-9 w-9"/>
                     <div className=" overflow-hidden p-4 flex w-[90%] md:w-[70%] h-[20rem] relative shadow-md shadow-black dark:shadow-neutral-600">
                       <div className="flex items-baseline justify-start">
                        <p>Generating the image based on the given prompt</p>
                        &nbsp;
                        <PulseLoader color="#e92888"  size={8}/>
                       </div>
                        {positions.map((position, index) => (
                          <div key={index} style={position} className={`absolute h-20 w-20 rounded-full blur-2xl ${colors[index]} transition-all duration-1000 ease-in-out`}/>
                        ))}
                     </div>
                  </div>
               </div>
               }
               <div ref={endRef} />
            </div>
               {/* Right Barr */}
               <RightBar 
                model={model} 
                samples={samples} 
                setSamples={setSamples} 
                size={size}
                setSize={setSize}
                imageStyle={imageStyle}
                setImageStyle={setImageStyle}
               /> 
           
  
          </div>
           <div className=" w-[90%]  max-h-48 max-w-[90%] rounded-md shadow-sm shadow-neutral-700 p-2 flex bottom-0 mb-4 mt-1 mx-4">
            <textarea 
              className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto"
              placeholder="A strong, descriptive prompt that clearly defines elements, colors, and subjects will lead to better results"
              value={textInputValue}
              style={{
                 // writingMode: "horizontal-tb",
                 maxWidth : '90%',
                 direction: "ltr",
              }}
              onChange={(e) => setTextInputValue(e.target.value)}
              />
              <Button onClick={generateImageAndStoreToS3} disabled={loading || textInputValue === "" || textInputValue === " "} variant={'default'} className=" ml-2 rounded-lg h-full shadow-md text-white bg-gray-950 hover:bg-gray-800 dark:text-black dark:bg-slate-100 dark:hover:bg-slate-200 ">
                 Generate
              </Button>
           </div>
         </div>

      </main>
    </>
  );
};
