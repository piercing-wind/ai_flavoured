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
import Styles from "@/app/x/chat/chat.module.css";
import {Howl, Howler} from 'howler';
import WaveSurfer from 'wavesurfer.js';

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
   setSpeed: (speed: number) => void;
   speed: number;
 }
export const RightBar: React.FC<RightBarProps> = ({ setResponseFormat, responseFormat, setVoiceModel, voiceModel, setSpeed, speed }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
     setIsCollapsed(!isCollapsed);
  };
  const audioFiles = [{
  name : 'Alloy',
  value : 'alloy',
  path: '/audio/audio.mp3'
},{
   name : 'Omnix',
   value : 'omnix',
   path : "/audio/audio1.mp3"
}]
   
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
       height: 50,
       container: `#waveform${index}`,
       waveColor: '#ff0783',
       progressColor: '#383351',
     });
     wavesurferRefs.current[index].load(audioFiles[index].path);
     setCurrentWave(wavesurferRefs.current[index]);
   }
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
         height: 50,
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
         <Select>
           <SelectTrigger className="h-8 dark:bg-inherit shadow-sm dark:shadow-neutral-700 focus:outline-none focus:ring-0 focus:border-none">
             <SelectValue className="text-xs" placeholder={`Output Format .${responseFormat}`} />
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
         <Select>
           <SelectTrigger className="h-8 dark:bg-inherit shadow-sm dark:shadow-neutral-700 focus:outline-none focus:ring-0 focus:border-none">
             <SelectValue className="text-xs" placeholder={`Speed \u00A0 \u00A0 \u00A0\ ${" "} ${" "} ${speed} x`} />
           </SelectTrigger>
           <SelectContent>
           {speeds.map((speed, index) => (
              <SelectItem key={index} value={speed.toString()}>{speed} x</SelectItem>
              ))}
           </SelectContent>
         </Select>
       </div>
      </div>
      
       <div className={`${isCollapsed ? 'hidden ': ""}w-full my-5`}>
         <h6 className="w-full mb-2 text-center opacity-90">The current voices are optimized for English.</h6>
          <RadioGroup defaultValue="alloy" onValueChange={(v)=>{}}>
            {audioFiles.map((audio, index) => (   
            <div className="flex items-center my-2 space-x-1" key={index}>
             <RadioGroupItem value={audio.value} id={audio.value}/>
             <span className="h-10 w-14 flex items-center justify-center">{audio.name}</span> 
                <button onClick={()=>handleAudio(index)}>{isPlaying[index] ? <PauseIcon size={20} color="#ff0783" />  : <PlayIcon size={20} color="#ff0783" /> }</button>
              <div  className="flex h-10 relative rounded-md items-center flex-grow ">
                <div id={`waveform${index}`} className="w-full left-0 top-0 absolute cursor-pointer"/>
                <div id={`preLoadwaveform1${index}`} className="w-full left-0 top-0 absolute cursor-pointer"/>
             </div>
            </div>
            ))}
          </RadioGroup>
       </div>
    </div>
  );
};
