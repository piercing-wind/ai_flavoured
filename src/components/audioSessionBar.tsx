"use client";

import React, { RefObject, createRef, useEffect, useRef, useState } from "react";
import { LogoText } from "./logo";
import { ModeToggle } from "@/components/themeModeChange";
import { Button } from "./ui/button";
import Styles from "@/app/(x)/chat/chat.module.css";
import { HiDownload } from "react-icons/hi";
import { UserIcon } from "./userIcon";
import Share from "./share";
import { PulseLoader } from "react-spinners";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { GoInfo } from "react-icons/go";
import { AudioMime, textToAudio } from "@/openai_models/textToaudio";
import { AudioData, addAudioDataToDB } from "@/actions/userPromptAudio/userPromptAudio";
import { RightBar } from "./configRightBarAudioSession";
import Image from "next/image";
import WaveSurfer from 'wavesurfer.js';
import { PauseIcon, PlayIcon, ShareIcon } from "./mediaIcons";
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'
import { SiAudiomack } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import { updateAudioQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { Pricing } from "./pricing";
import { ServerUserProfile } from "./header/links/serverUserProfile";

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
  audioQuota,
}: {
  user: any;
  params: { slug: string };
  prevUserPromptAudio: DataType;
  chatName: string;
  audioQuota: number;
}) => {
  const [textInputValue, setTextInputValue] = useState("");
  const [share, setShare] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [audioPath, setAudioPath] = useState('');
  const [prevUserData, setPrevUserData] = useState<DataType>(prevUserPromptAudio);
  const { toast } = useToast();
  const shareRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hd, setHd] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [audioQuotaLeft, setAudioQuotaLeft] = useState<number>(audioQuota);
  const [responseFormat, setResponseFormat] = useState("mp3");
  const [voiceModel, setVoiceModel] = useState("echo");
  const [speed, setSpeed] = useState<string>('1');
  const [currentWave, setCurrentWave] = useState<any>(null);
  const wavesurferRefs = useRef<{ [id: string]: any }>({});
  const [isPlaying, setIsPlaying] = useState<{ [id: string]: boolean }>(
    prevUserData.reduce((acc, audio) => ({ ...acc, [audio.id]: false }), {})
  );
  const [audioDurations, setAudioDurations] = useState<{ [id: string]: number }>(
     prevUserData.reduce((acc, audio) => ({ ...acc, [audio.id]: 0 }), {})
  );
  const [currentTime, setCurrentTime] = useState<{ [id: string]: number }>(
     prevUserData.reduce((acc, audio) => ({ ...acc, [audio.id]: 0 }), {})
  );
  const endRef = useRef<HTMLDivElement>(null);

 
const handleShare = (id: string, cloudUrl : string,e:  React.MouseEvent ) => {
   e.stopPropagation();
   setAudioPath(cloudUrl);
   setShare(`${webUrl}/audioshare/${id}`);
};  
  
const generateAudioAndStoreToS3 = async () => {
   setTextInputValue('');
   setLoading(true);
   let QuotaToDetuct = hd ? textInputValue.length * 2 : textInputValue.length;
   if(QuotaToDetuct > audioQuotaLeft){
      toast({
         variant: "destructive",
         title: "Insufficient Audio Credits",
         description: "You don't have enough credits to generate this audio. Please upgrade your plan to continue.",
       });
       setError(true);
       setLoading(false);
       return;
   }
   setAudioQuotaLeft(audioQuotaLeft - QuotaToDetuct);
   try{
   const audio = await textToAudio(textInputValue, user.id, voiceModel, responseFormat as keyof AudioMime, hd, Number(speed));   
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
   setIsPlaying(prev => ({ ...prev, [audio.id]: false }));
   setAudioDurations(prev => ({ ...prev, [audio.id]: 0 }));
   setCurrentTime(prev => ({ ...prev, [audio.id]: 0 }));

   toast({
      title: "Audio Generated Successfully",
      description: "Your audio is ready! Feel free to download and share it with your friends. 🌟",
    });

   setPrevUserData(prev => [...prev, data]);
   setLoading(false);
   await updateAudioQuota(user.id, audioQuotaLeft - QuotaToDetuct);
   await saveToDatabase(data);
   } catch (e) {
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "Audio Generation Error",
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

const handleAudio = (id: string) => {
  if (currentWave && currentWave !== wavesurferRefs.current[id]) {
    currentWave.pause();
  }
  if (!wavesurferRefs.current[id]) {
    wavesurferRefs.current[id] = WaveSurfer.create({
      height: 50,
      container: `#waveform${id}`,
      waveColor: '#ff0783',
      progressColor: '#383351',
      plugins : [
         Hover.create({
            lineColor: '#ff0783',
            lineWidth: 2,
            labelBackground : '#555',
            labelColor : '#fff',
            labelSize : '12px',
         })
        ]
    });
    const audio = prevUserData.find((audio) => audio.id === id);
    if (audio) {
      wavesurferRefs.current[id].load(audio.audioUrl);
    }
    setCurrentWave(wavesurferRefs.current[id]);
  }
  //on finish
  wavesurferRefs.current[id].on('finish', () => {
      setIsPlaying((prevState) => ({ ...prevState, [id]: false }));
  });
  //get the currect time of playing audio
  wavesurferRefs.current[id].on('timeupdate', (currentTime : any) => {
   setCurrentTime(prevTimes => ({ ...prevTimes, [id]: currentTime }));
   });
    
  if (wavesurferRefs.current[id].isPlaying()) {
    wavesurferRefs.current[id].pause();
    setIsPlaying((prevState) => ({ ...prevState, [id]: false }));
  } else {
    wavesurferRefs.current[id].play();
    setIsPlaying((prevState) => ({ ...prevState, [id]: true }));
  }
};

useEffect(() => {
  prevUserData.forEach((audio) => {
    if (!wavesurferRefs.current[audio.id]) {
      wavesurferRefs.current[audio.id] = WaveSurfer.create({
        height: 70,
        container: `#preLoadwaveform1${audio.id}`,
        waveColor: '#ff0783',
        progressColor: '#383351',
        plugins : [
         Hover.create({
            lineColor: '#ff0783',
            lineWidth: 2,
            labelBackground : '#555',
            labelColor : '#fff',
            labelSize : '12px',
         })
        ]
      });
      wavesurferRefs.current[audio.id].load(audio.audioUrl);
      wavesurferRefs.current[audio.id].on('ready', () => {
        setAudioDurations((prevState) => ({
          ...prevState,
          [audio.id]: wavesurferRefs.current[audio.id].getDuration(),
        }));
      });
    }
  });
}, [prevUserData]);

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
   const end = endRef.current;
   if (end) {
       end.scrollIntoView({ behavior: "smooth" });
   }
}, [prevUserData, loading]);
 
  return (
    <>
    <Toaster />
    {error &&
    <Pricing setPricing={setError} />
    }
      <main className="relative w-full flex-col flex h-full flex-grow overflow-x-hidden">
        <div className="relative flex flex-wrap p-3 items-center justify-between shadow-md">
          <div className="rounded-r-sm flex items-center text-nowrap">
            AI Audio Generation &nbsp; &nbsp; <SiAudiomack className="text-xl" />
          </div>
          <div>
            <p className="text-sm"> { hd ?  textInputValue.length * 2 : textInputValue.length} / {audioQuotaLeft} Credits</p>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <ServerUserProfile user={user} />

            <div className="mx-2">
              <ModeToggle/>
            </div>
        </div>
      </div>
      
        <div className=" h-full relative flex flex-col w-full justify-center items-center overflow-hidden ">
          <div className="flex w-full h-full justify-center relative overflow-hidden">
           
          <div className={`w-full p-2  overflow-y-auto ${Styles.chatscroll}`}>

           {share !== "" && (
              <Share ref={shareRef} shareUrl={share} setShare={setShare} cloudUrl={audioPath} />
            )}
            {prevUserData.map((audio) => (
              <div className="w-full " key={audio.id}>
                 <div className="flex space-x-4 p-2">
                    <UserIcon userImage={user?.image}/>
                    <div className={`p-2 max-h-16 overflow-y-auto max-w-[70%] brea rounded-md break-words dark:border-neutral-700 shadow-sm shadow-neutral-700  ${Styles.chatscroll}`}>
                       {audio.prompt}
                    </div>
                 </div>
                 <div className="flex space-x-4 p-2 relative">
                    <LogoText className="h-9 w-9"/>
                    <div className=" overflow-hidden h-[70px] flex w-[90%] md:w-[75%] relative">
                     <button className="mx-2" onClick={()=>handleAudio(audio.id)}>{isPlaying[audio.id] ? <PauseIcon size={32} color="#ff0783" />  : <PlayIcon size={32} color="#ff0783" /> }</button>
                     <div className="relative w-full">
                      <div id={`waveform${audio.id}`} className="w-full left-0 top-0 absolute cursor-pointer"/>
                        <div id={`preLoadwaveform1${audio.id}`} className="w-full left-0 top-0 absolute cursor-pointer"/>
                          <div className="absolute right-2 bottom-1"> 
                            {Math.floor(currentTime[audio.id] / 60)}:
                            {('0' + Math.floor(currentTime[audio.id] % 60)).slice(-2)}
                            {Math.floor((currentTime[audio.id] % 1) * 10)}
                             &nbsp; / &nbsp;
                            {Math.floor(audioDurations[audio.id] / 60)}:
                            {('0' + Math.floor(audioDurations[audio.id] % 60)).slice(-2)}
                            {Math.floor((audioDurations[audio.id] % 1) * 10)}
                          </div>
                      </div>
                    </div>
                      <div className="flex space-x-5 px-5 items-center">
                        <HiDownload className="text-3xl cursor-pointer" style={{color : "#ff0783"}} onClick={()=>handleDownload(audio.audioUrl, audio.fileName)}/>
                        <span className="cursor-pointer" onClick={(e)=>handleShare(audio.id , audio.audioUrl,e)}>
                           <ShareIcon size={30} color="#ff0783"/>
                        </span>
                      </div>
                 </div>
              </div>
            ))}
   
            {/* loader */}
            {loading &&
               <div className="w-full ">
                  <div className="flex space-x-4 p-2">
                     <UserIcon userImage={user?.image}/>
                     <div className={`p-2 max-h-16 overflow-y-auto max-w-[70%] brea rounded-md break-words dark:border-neutral-700 shadow-sm shadow-neutral-700  ${Styles.chatscroll}`}>
                        {textInputValue}
                     </div>
                  </div>
                  <div className="flex space-x-4 p-2 opacity-90 dark:opacity-50 relative">
                     <LogoText className="h-9 w-9"/>
                     <div className=" overflow-hidden p-4 flex w-[90%] md:w-[70%] h-[9rem] relative shadow-md shadow-black dark:shadow-neutral-600">
                       <div className="flex items-baseline justify-start ">
                        <p className="text-white">Generating the Audio for your text</p>
                        &nbsp;
                        <PulseLoader color="#e92888"  size={8}/>
                       </div>
                           <Image 
                           src="/loadingSoundWave.gif"
                           alt="wave"
                           width={100}
                           height={100}
                           style={{
                              width:"100%",
                              height:'100%',
                              objectFit :"cover",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: -1,
                           }}
                           />
                     </div>
                  </div>
               </div>
               }
               <div ref={endRef} />
            </div>
               
            <RightBar setResponseFormat={setResponseFormat} responseFormat={responseFormat} setVoiceModel={setVoiceModel} voiceModel={voiceModel} setSpeed={setSpeed} speed={speed} setHd={setHd} hd={hd}/>
          </div>
           <div className="relative max-h-48 w-[90%] max-w-[90%] rounded-md shadow-sm shadow-neutral-700 p-2 flex bottom-0 mb-4 mt-1 mx-4">
               <div className="absolute w-auto flex items-center -top-5 left-2 space-x-3 backdrop-blur-lg rounded-md px-1 ">
               <GoInfo className="text-xs" data-tooltip-id ="maxLen" data-tooltip-content ="The maximum length is 4096 characters."/>
                 <p className="text-xs">{4096 - textInputValue.length}</p>
                 <Tooltip id="maxLen" className="z-10"/>
               </div>
            <textarea 
              className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto"
              placeholder="Provide grammatically Correct Text content here to generate Audio..."
              value={textInputValue}
              style={{
                 // writingMode: "horizontal-tb",
                 maxWidth :'90%',
                 direction: "ltr",
              }}
              maxLength={4096}
              onChange={(e) => {
               const value = e.target.value;
               setTextInputValue(value);
            }}
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
