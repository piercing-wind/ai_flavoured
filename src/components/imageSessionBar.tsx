"use client";

import React, { RefObject, createRef, useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { LogoText } from "./logo";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Styles from "@/app/x/chat/chat.module.css";
import UpscaleButton from "@/components/social.module.css"
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { HiOutlineThumbDown } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import { BiShareAlt } from "react-icons/bi";

import { UserIcon } from "./userIcon";
import Share from "./share";
import Head from "next/head";
import { Data, uploadImageToS3 } from "@/actions/userPromptImage/uploadImageToS3";
import { imageGenerator } from "@/actions/huggingface/huggingFace";
import {  insertUserPromptImage, updateLike } from "@/actions/userPromptImage/userPromptImage";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { textToimage } from "@/actions/stabilityai/textToImage";
import { GoInfo } from "react-icons/go";
import { FaHatWizard } from "react-icons/fa6";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover"
import { Input } from "./ui/input";
import {
   Tooltip as ShadCNTooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
 } from "@/components/ui/tooltip"
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
import { upscaleImage } from "@/actions/stabilityai/upscaleImage";
import { RightBar } from "./configRightBarImageSession";

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

export const ImageSessionBar = ({
  user,
  params,
  prevUserPromptImages,
  chatName,
}: {
  user: any;
  params: { slug: string };
  prevUserPromptImages: DataType;
  chatName: string;
}) => {
  const [theme, setTheme] = useState<boolean>(true); // for backgorund colors

  const [model, setModel] = useState("stable_diffusion");
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
  const [showUpscale, setShowUpscale] = useState<string | null>(null);
  const [upscaleWidth, setUpscaleWidth] = useState<number>(2048);
  const [upscaleHeight, setUpscaleHeight] = useState<number>(2048);
  const [errorUpscale, setErrorUpscale] = useState<boolean>(false);
  const [userSelectedPixelHorW, setUserSelectedPixelHorW] = useState<string>('width');

  const [cfg_scale, setCfgScale] = useState<number>(7); //[ 0 .. 35 ]
  const [weight, setWeight] = useState<number>(0.5); //[ 0 .. 1 ]
  const [steps, setSteps] = useState<number>(10); //[ 10 .. 50 ]
  const [seed, setSeed] = useState<number>(0); //[ 0 .. 4294967295 ]
  const [samples, setSamples] = useState<number>(2); //[ 1 .. 10 ]
  const [sampler, setSampler] = useState<string>("K_DPMPP_2M");
  const [clipGuidancePreset, setClipGuidancePreset] = useState<string>("NONE");
  const [stylePreset, setStylePreset] = useState<string>("photographic");

  useEffect(() => {
  if(upscaleWidth  * upscaleHeight < 262144 || upscaleWidth * upscaleHeight > 4194304){
     console.log("wrrong")
     setErrorUpscale(true)
  }else{
  setErrorUpscale(false)
  }
  
  },[upscaleWidth, upscaleHeight])


  const [selectedRatio , setSelectedRatio] = useState<{tip : string , width: number, height : number}>({tip : '1024 X 1024', width : 1024, height: 1024});
  //loader animation
  const [loading, setLoading] = useState(false);
  const [upscaling, setUpscaling] = useState(false);
  const [positions, setPositions] = useState(Array(10).fill({top: '0%', left: '0%'}));

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(positions.map(() => ({top: `${Math.random()*100}%`, left: `${Math.random()*100}%`})));
    }, 1000); // Change positions every 1 second

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const colors = ['bg-pink-600', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-indigo-500', 'bg-orange-500'];

  const router = useRouter();
 
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

const hanldeUpscaleImage = async (fileName : string, url: string) => {
   setLoading(true);
   setUpscaling(true)
   try{
      let value : number;
      if(userSelectedPixelHorW === 'width'){
         value = upscaleWidth;
      }else{
         value = upscaleHeight;
      }  

   const upscaledImage = await upscaleImage(fileName, url, value, upscaleHeight, upscaleWidth, user.id, true);
   toast({
      title: "Image Upscaled Successfully",
      description: "Your image is upscaled! Feel free to download and share it with your friends. 🌟",
    });
   
   const data : Database = {
      id: uuidv4(),
      userId: user.id, 
      session: params.slug,
      images: upscaledImage,
    }

    upscaledImage.forEach(image => {
      setLike(prevLikes => ({ ...prevLikes, [image.id]: null }));
    });
    setPrevUserData(prev => [...prev, data]);
    setLoading(false);
    setUpscaling(false)
    await saveToDatabase(data, upscaledImage);
   }catch(e){
      const error = e as Error;
      setLoading(false)
      setUpscaling(false)
      toast({
         variant: "destructive",
         title: "Upscale Error",
         description: `Error upscaling image: ${error.message}`,
       });
   }
}
const generateImageAndStoreToS3 = async () => {
   setLoadingTempPrompt(textInputValue);
   setTextInputValue('');
   setLoading(true);
   try{
    const text2imgData = {
      prompt : textInputValue, 
      weight: weight,
      height: selectedRatio.height, 
      width: selectedRatio.width,
      userId: user.id,
      steps : steps,
      seed : seed,
      samples : samples,
      sampler : sampler,
      cfg_scale : cfg_scale,
      clip_guidance_preset :  clipGuidancePreset,
      style_preset : stylePreset,
   };  
   const images = await textToimage(text2imgData)   

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
   link.download = fileName ; // Optional: Set the name of the downloaded file
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
       // This is a click inside the share button, ignore it
       console.log(share)
       return;
     }
     if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
       // This is a click outside the share component, close it
       console.log("outside")
       setShare("");
     }
   }
 
   // Bind the event listener
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     // Unbind the event listener on clean up
     document.removeEventListener("mousedown", handleClickOutside);
   };
 }, [shareRef, shareButtonRef]);

const [clickedImageId, setClickedImageId] = useState<string | null>(null);
const imageRefs = useRef<Record<string, React.RefObject<HTMLImageElement>>>({});

//   console.log(imageRefs)
//   console.log(clickedImageIndex)
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

 
  const handleThemeChnage = (theme: boolean) => {
    setTheme(theme);
  };
const endRef = useRef<HTMLDivElement>(null);
useEffect(() => {
   const end = endRef.current;
   if (end) {
       end.scrollIntoView({ behavior: "smooth" });
   }
}, [prevUserData, loading]); 

  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
    if (typeof window !== 'undefined') {
      const { protocol, host } = window.location;
      setWebUrl(`${protocol}//${host}`);
    }
  }, []);
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
const temp ='https://ddjqb6h6sx7rcybkocmcuf3slu.srv.us/share/f95634ab-a391-43ad-83dc-03d5a28a5495'
  return (
    <>
    <Toaster />
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
             <b>{model === "stable_diffusion" ? <p className="flex space-x-2">Stable Diffusion &nbsp; &nbsp; <FaHatWizard /></p> : "DALLE-3"} </b> &nbsp;
          </div>
          <div className="flex flex-wrap items-center justify-center">

            <div className="mx-2">
              <ThemeSwitch detectTheme={handleThemeChnage} />
            </div>
            <div className=" flex items-center ml-4 rounded-md">
            <Select onValueChange={(v)=>{setModel(v)}}>
              <SelectTrigger className="w-[180px] h-7 ring-0 focus:outline-none focus:ring-0 focus:border-none dark:bg-inherit" >
                <SelectValue placeholder={'Stable Diffusion'} />
              </SelectTrigger>
              <SelectContent className="dark:bg-inherit backdrop-blur-sm">
                <SelectItem value="stable_diffusion">Stable Diffusion</SelectItem>
                <SelectItem value="dalle-3">DALLE-3</SelectItem>
              </SelectContent>
            </Select>
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
                     <div className=" p-2 flex items-center justify-center rounded-md dark:border-neutral-700 shadow-sm shadow-neutral-700">
                        {promptAndImage.prompt}
                     </div>
                  </div>
                  }
                  
                  <div className=" flex space-x-4 p-2 mb-10">
                     <span>
                        <LogoText className="h-9 w-9"/>
                     </span>
                     <div className=" w-[90%] md:max-w-[70%] flex  p-2 dark:bg-neutral-800 rounded-md space-x-1 relative shadow-md dark:shadow-neutral-600">
                       {promptAndImage.images.map((image, index) =>(
                        <div className={`flex relative ${image.upscaled && "w-full"} `}
                        key={index}
                        onMouseEnter={() => {setShowUpscale(image.id)}}
                        onMouseLeave={() =>{ setShowUpscale(null); setUpscaleWidth(2048); setUpscaleWidth(2048)}}
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
                           {showUpscale === image.id && image.upscaled !== true &&
                           <div className="absolute top-2 left-4">
                              <Popover>
                                <PopoverTrigger>
                                 <button className={ ` text-center ${UpscaleButton.upscaleButton} transition duration-500 ease-in-out ${showUpscale ? ' opacity-100' : ' opacity-0'}`} > Upscale</button>
                                </PopoverTrigger>
                                <PopoverContent>
                                <div className="grid gap-4">
                                 <div className="space-y-2">
                                   <h4 className="font-medium leading-none">Dimensions</h4>
                                   <p className="text-sm text-muted-foreground">
                                     Set the dimensions for the Upscaling Image.
                                   </p>
                                   <div className='flex items-center justify-between '>
                                   <TooltipProvider >
                                      <ShadCNTooltip>
                                        <TooltipTrigger><GoInfo className="cursor-pointer" /></TooltipTrigger>
                                        <TooltipContent>
                                        <div className=" opacity-75 max-w-[20rem] break-words">
                                          <p>Upscaling Create a higher resolution version of an image.</p>
                                          <p className="my-2">This operation outputs an image with a maximum pixel count of 4,194,304. This is equivalent to dimensions such as 2048x2048 and 4096x1024.</p>
                                          <p>By default, the input image will be upscaled by a factor of 2. For additional control over the output dimensions, One of the width or height parameter may be specified.</p>
                                        </div>
                                        </TooltipContent>
                                      </ShadCNTooltip>
                                    </TooltipProvider>
                                   <p className=" opacity-80 text-sm"> <span className={`${errorUpscale && 'text-red-600'}`}>{(upscaleWidth * upscaleHeight).toLocaleString()}</span>/ 4,194,304 px</p>
                                   </div>
                                 </div>
                                 <div className="grid gap-2">
                                 <RadioGroup defaultValue={userSelectedPixelHorW} onValueChange={(v)=>setUserSelectedPixelHorW(v)}>
                                   <div className="flex space-x-4 items-center w-full">
                                     <RadioGroupItem value="width" id="width" className="w-6" />
                                     <Label htmlFor="width">Width</Label>
                                     <Input
                                       id="width"
                                       type='number'
                                       defaultValue={upscaleWidth}
                                       className="col-span-2 h-8"
                                       onChange={(e) => {
                                          const value = parseInt(e.target.value);
                                          if (value * upscaleHeight <= 4194304 && value * upscaleHeight >= 262144) {
                                            setUpscaleWidth(value);
                                          }
                                        }}
                                     />
                                   </div>
                                   <div className="flex space-x-4 items-center">
                                   <RadioGroupItem value="height" id="width" className="w-6" />
                                     <Label htmlFor="height">Height</Label>
                                     <Input
                                       id="height"
                                       type='number'
                                       defaultValue={upscaleHeight}
                                       className="col-span-2 h-8"
                                       onChange={(e) => {
                                         const value = parseInt(e.target.value);
                                         if (value * upscaleWidth <= 4194304 && value * upscaleWidth >= 262144) {
                                           setUpscaleHeight(value);
                                         }
                                       }}
                                     />
                                   </div>
                                   </RadioGroup>
                                 <div className="grid grid-cols-3 my-4 w-full relative">
                                    <Button onClick={()=>hanldeUpscaleImage(image.fileName, image.url)} disabled={loading} variant={"outline"} className="absolute right-2 h-6 hover:scale-105">Upscale</Button>
                                 </div>
                                 </div>
                               </div>
                                </PopoverContent>
                              </Popover>
                           </div>
                           }
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
                     <div className=" p-2 flex items-center justify-center rounded-md dark:border-neutral-700 shadow-sm shadow-neutral-700">
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
               
            <RightBar 
              setSelectedRatio={setSelectedRatio} 
              cfg_scale={cfg_scale} 
              setCfgScale={setCfgScale} 
              weight={weight} 
              setWeight={setWeight} 
              steps={steps} 
              setSteps={setSteps} 
              seed={seed} 
              setSeed={setSeed} 
              samples={samples} 
              setSamples={setSamples} 
              sampler={sampler} 
              setSampler={setSampler} 
              clipGuidancePreset={clipGuidancePreset} 
              setClipGuidancePreset={setClipGuidancePreset} 
              stylePreset={stylePreset} 
              setStylePreset={setStylePreset} 
            />
          </div>
           <div className=" w-[90%] rounded-md shadow-sm shadow-neutral-700 p-2 flex bottom-0 mb-4 mt-1 mx-4">
            <textarea 
              className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto"
              placeholder="A strong, descriptive prompt that clearly defines elements, colors, and subjects will lead to better results"
              value={textInputValue}
              style={{
                 // writingMode: "horizontal-tb",
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
