"use client";

import React, { RefObject, createRef, useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { LogoText } from "./logo";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Styles from "@/app/x/chat/chat.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosHeart } from "react-icons/io";
import { HiOutlineThumbDown } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import { BiShareAlt } from "react-icons/bi";

import { UserIcon } from "./userIcon";
import Share from "./share";
import { PulseLoader } from "react-spinners";
import { Label } from "@/components/ui/label"
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { GoInfo } from "react-icons/go";
import { FaHatWizard } from "react-icons/fa6";

import { AudioMime, textToAudio } from "@/openai_models/textToaudio";
import { AudioData, addAudioDataToDB } from "@/actions/userPromptAudio/userPromptAudio";
import { RightBar } from "./configRightBarAudioSession";
import Image from "next/image";

type DataType = {
   id: string;
   userId: string;
   session: string;
   prompt: string;
   audioUrl: string;
   fileName: string;
   fileKey: string;
   fileType: string
 }[];


export const AudioSessionBar = ({
  user,
  params,
  prevUserPromptAudio,
  chatName,
}: {
  user: any;
  params: { slug: string };
  prevUserPromptAudio: DataType;
  chatName: string;
}) => {
  const [theme, setTheme] = useState<boolean>(true); // for backgorund colors

  const [model, setModel] = useState("stable_diffusion");
  const [textInputValue, setTextInputValue] = useState("");
  const [share, setShare] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [prevUserData, setPrevUserData] = useState<DataType>(prevUserPromptAudio);
  const { toast } = useToast();
  const shareRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);


  const [responseFormat, setResponseFormat] = useState("mp3");
  const [voiceModel, setVoiceModel] = useState("onyx");
  const [speed, setSpeed] = useState<number>(1);

  const router = useRouter();
 
  const handleShare = (id: string, cloudUrl : string,e:  React.MouseEvent ) => {
     e.stopPropagation();

     setImagePath(cloudUrl);
     setShare(`${webUrl}/share/${id}`);
     console.log(share);
  };  
  
const generateAudioAndStoreToS3 = async () => {
   setTextInputValue('');
   setLoading(true);
   try{
 
   const audio = await textToAudio(textInputValue, user.id, voiceModel, responseFormat as keyof AudioMime);   

   const data : AudioData = {
     id: audio.id,
     userId: user.id, 
     session: params.slug,
     prompt: textInputValue,
     audioUrl: audio.url,
     fileKey: audio.fileKey,
     fileName: audio.fileName,
     fileType: audio.fileType
   }

   toast({
      title: "Audio Generated Successfully",
      description: "Your audio is ready! Feel free to download and share it with your friends. 🌟",
    });

   setPrevUserData(prev => [...prev, data]);
   setLoading(false);
   await saveToDatabase(data);
   } catch (e) {
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "Audi Generation Error",
         description: `We couldn't generate your Audio :${error.message}`,
       });
      setLoading(false);
      return;
   }
 };
 const saveToDatabase = async (data: AudioData) => {
   try{
      await addAudioDataToDB(data);
   }catch(e){
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "Audio Save Error",
         description: `Error saving audio to database: ${error.message}`,
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
      description: "Your audio is downloaded! Feel free to share it with your friends. 🌟",
    });
 }
 const handleThemeChnage = (theme: boolean) => {
   setTheme(theme);
 };
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
const endRef = useRef<HTMLDivElement>(null);
useEffect(() => {
   const end = endRef.current;
   if (end) {
       end.scrollIntoView({ behavior: "smooth" });
   }
}, [prevUserData, loading]);
 
  return (
    <>
    <Toaster />
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
               Audio
            </div>
        </div>
      </div>
      
        <div className=" h-full relative flex flex-col w-full justify-center items-center overflow-hidden ">
          <div className="flex w-full h-full justify-center relative overflow-hidden">
           
          <div className={`w-full p-2  overflow-y-auto ${Styles.chatscroll}`}>

           {share !== "" && (
              <Share ref={shareRef} shareUrl={share} setShare={setShare} cloudUrl={imagePath} />
            )}

   
            {/* loader */}
            {loading &&
               <div className="w-full ">
                  <div className="flex space-x-4 p-2">
                     <UserIcon userImage={user?.image}/>
                     <div className=" p-2 flex items-center justify-center rounded-md dark:border-neutral-700 shadow-sm shadow-neutral-700">
                     </div>
                  </div>
                  <div className="flex space-x-4 p-2 opacity-50">
                     <LogoText className="h-9 w-9"/>
                     <div className=" overflow-hidden p-4 flex w-[90%] md:w-[70%] h-[20rem] relative shadow-md shadow-black dark:shadow-neutral-600">
                       <div className="flex items-baseline justify-start">
                        <p>Generating the image based on the given prompt</p>
                        &nbsp;
                        <PulseLoader color="#e92888"  size={8}/>
                       </div>
                          <div className="absolute top-0 left-0">
                            <Image
                             src={"/wave.webp"}
                             fill
                             alt="waves"
                            />
                         </div> 
                     </div>
                  </div>
               </div>
               }
               <div ref={endRef} />
            </div>
               
            <RightBar setResponseFormat={setResponseFormat} responseFormat={responseFormat} setVoiceModel={setVoiceModel} voiceModel={voiceModel} setSpeed={setSpeed} speed={speed}/>
          </div>
           <div className=" w-[90%] rounded-md shadow-sm shadow-neutral-700 p-2 flex bottom-0 mb-4 mt-1 mx-4">
            <textarea 
              className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto"
              placeholder="Provide grammatically Correct Text content here to generate Audio..."
              value={textInputValue}
              style={{
                 // writingMode: "horizontal-tb",
                 direction: "ltr",
              }}
              onChange={(e) => setTextInputValue(e.target.value)}
              />
              <Button onClick={generateAudioAndStoreToS3} disabled={loading || textInputValue === "" || textInputValue === " "} variant={'default'} className=" ml-2 rounded-lg h-full shadow-md text-white bg-gray-950 hover:bg-gray-800 dark:text-black dark:bg-slate-100 dark:hover:bg-slate-200 ">
                 Generate
              </Button>
           </div>
         </div>

      </main>
    </>
  );
};
