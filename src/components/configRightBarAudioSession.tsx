"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { Divider } from "./divider";
import { Tooltip } from "react-tooltip";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { GoInfo } from "react-icons/go";
import { Input } from "./ui/input";
import Styles from "@/app/(x)/chat/chat.module.css";
import {Howl, Howler} from 'howler';
import WaveSurfer from 'wavesurfer.js';
import { Switch } from "@/components/ui/switch"

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
import { PauseIcon, PlayIcon } from "./mediaIcons";

 
interface AspectRatio {
  [key: string]: {
    tip: string;
    width: number;
    height: number;
  };
}
interface RightBarProps {
   setResponseFormat: (format: string) => void;
   responseFormat: string;
   setVoiceModel: (model: string) => void;
   voiceModel: string;
   setSpeed: (speed: string) => void;
   speed: string;
   setHd : (hd: boolean) => void;
   hd : boolean;
 }
 export const audioFiles = [
    {
      name: 'Echo',
      value: 'echo',
      path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/echo.mp3'
    },
    {
      name: 'Fable',
      value: 'fable',
      path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/fable.mp3'
    },
  {
    name: 'Alloy',
    value: 'alloy',
    path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/alloy.mp3'
  },
  {
    name: 'Onyx',
    value: 'onyx',
    path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/onyx.mp3'
  },
  {
    name: 'Nova',
    value: 'nova',
    path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/nova.mp3'
  },
  {
    name: 'Shimmer',
    value: 'shimmer',
    path: 'https://di6ccwru5n10a.cloudfront.net/public/audio/shimmer.mp3'
  },
];
export const RightBar: React.FC<RightBarProps> = ({ setResponseFormat, responseFormat, setVoiceModel, voiceModel, setSpeed, speed , setHd, hd}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
     setIsCollapsed(!isCollapsed);
  };
   
  const wavesurferRefs = useRef<any[]>([])  
  const [isPlaying, setIsPlaying] = useState<boolean[]>(new Array(audioFiles.length).fill(false));

  const [currentWave, setCurrentWave] = useState<any>(null);
  const speeds = Array.from({length: 16}, (_, i) => (i + 1) * 0.25); 

  const handleAudio = (index : number) => {
   if (currentWave && currentWave !== wavesurferRefs.current[index]) {
     currentWave.pause();
   }
   if (!wavesurferRefs.current[index]) {
     wavesurferRefs.current[index] = WaveSurfer.create({
       height: 40,
       container: `#waveform${index}`,
       waveColor: '#ff0783',
       progressColor: '#383351',
     });
     wavesurferRefs.current[index].load(audioFiles[index].path);
     setCurrentWave(wavesurferRefs.current[index]);
   }

   wavesurferRefs.current[index].on('finish', () => {
      setIsPlaying(prevState => {
        prevState[index] = false;
        return [...prevState];
      });
    });

   if (wavesurferRefs.current[index].isPlaying()) {
      wavesurferRefs.current[index].pause();
      setIsPlaying(prevState => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    } else {
      wavesurferRefs.current[index].play();
      setIsPlaying(prevState => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }    
 };
 useEffect(() => {
   audioFiles.forEach((_, index) => {
     if (!wavesurferRefs.current[index]) {
       wavesurferRefs.current[index] = WaveSurfer.create({
         height: 40,
         container: `#preLoadwaveform1${index}`,
         waveColor: '#ff0783',
         progressColor: '#383351',
       });
       wavesurferRefs.current[index].load(audioFiles[index].path);
     }
   });
 }, [isCollapsed]);
 
  return (
    <div
      className={` relative h-full border dark:border-neutral-700 rounded-md p-2 transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden ${Styles.chatscroll} ${
        isCollapsed ? "w-10 overflow-hidden" : " w-[30rem]"
      }`}
    >
      <button onClick={toggleCollapse} className="top-1 left-1 text-2xl">
        {isCollapsed ? (
          <TbLayoutSidebarLeftCollapseFilled />
        ) : (
          <TbLayoutSidebarRightCollapseFilled />
        )}
      </button>
      <Divider className="w-full" />
      <div className={`${isCollapsed ? 'hidden ': ""} w-full flex space-x-2 items-baseline my-2`}>
         <div className="flex-grow-0">
         <Select defaultValue={responseFormat} onValueChange={(v=>setResponseFormat(v))}>
           <SelectTrigger className="h-8 dark:bg-inherit shadow-sm dark:shadow-neutral-700 focus:outline-none focus:ring-0 focus:border-none">
           Output Format . <SelectValue className="text-xs" placeholder={`${responseFormat}`} />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="mp3">Mp3</SelectItem>
             <SelectItem value="opus">Opus</SelectItem>
             <SelectItem value="aac">AAC</SelectItem>
             <SelectItem value="flac">FLAC</SelectItem>
             <SelectItem value="wav">WAV</SelectItem>
           </SelectContent>
         </Select>
      </div>
      <div className="flex-grow">
         <Select defaultValue={speed.toString()} onValueChange={(v)=>setSpeed(v.toString())}>
           <SelectTrigger className="h-8 dark:bg-inherit shadow-sm dark:shadow-neutral-700 focus:outline-none focus:ring-0 focus:border-none">
             Speed &nbsp;<SelectValue className="text-xs" placeholder={`${speed} x`} />
           </SelectTrigger>
           <SelectContent>
           {speeds.map((speed, index) => (
              <SelectItem key={index} value={speed.toString()}>{speed} x</SelectItem>
              ))}
           </SelectContent>
         </Select>
       </div>
      </div>
      <div className={`${isCollapsed && "hidden"} relative flex items-center space-x-3 my-4`}>
          <div className="relative">
           <GoInfo
             className="cursor-pointer mx-2 text-lg"
             data-tooltip-id="hd"
           />
           <Tooltip id="hd" className="z-10">
             <p className="text-sm w-72">
               Choose &#39;HD&#39; for high-definition audio, optimized for quality. <br /> <b>If this option is on deducts 2 credits per character.</b> <br />
               <br />
               Off HD for standard-definition audio, optimized for speed. <br/> <b>This option deducts 1 credit per character.</b>
             </p>
           </Tooltip>
         </div>
      <Switch
        id="hd"
        checked={hd}
        onCheckedChange={(v)=>{setHd(v)}}
      />
      <Label htmlFor="hd">HD Audio</Label>
      </div>
       <div className={`${isCollapsed ? 'hidden ': ""}w-full my-5`}>
         <h6 className="w-full mb-2 text-center opacity-90">The current voices are optimized for English.</h6>
          <RadioGroup defaultValue="echo" onValueChange={(v)=>{setVoiceModel(v)}}>
            {audioFiles.map((audio, index) => (   
            <div className="items-center space-x-1" key={index}>
             <span className=" w-14 flex items-center text-sm font-bold">{audio.name}</span> 
            <div className="w-full flex items-center space-x-2">
             <RadioGroupItem value={audio.value} id={audio.value}/>
                <button onClick={()=>handleAudio(index)}>{isPlaying[index] ? <PauseIcon size={20} color="#ff0783" />  : <PlayIcon size={20} color="#ff0783" /> }</button>
              <div  className="flex relative h-10 rounded-md items-center flex-grow ">
                <div id={`waveform${index}`} className="w-full left-0 absolute top-0 cursor-pointer"/>
                <div id={`preLoadwaveform1${index}`} className="w-full absolute left-0 top-0 cursor-pointer"/>
             </div>
            </div>
            </div>
            ))}
          </RadioGroup>
       </div>
    </div>
  );
};
