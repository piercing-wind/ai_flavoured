'use client';
import { FetchAudioData, getAuidoUrl } from "@/actions/userPromptAudio/userPromptAudio";
import { PauseIcon, PlayIcon } from "@/components/mediaIcons";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'

export default function SharePage({ params }: { params: { id: string } }) {
 const wavesurferRef = useRef<WaveSurfer | null>(null);
 const [audio, setAudio] = useState<FetchAudioData | null>(null);
 const [isPlaying, setIsPlaying] = useState(false);
 const [currentTime, setCurrentTime] = useState(0); 
 const [audioDurations, setAudioDurations] = useState(0);

 useEffect(() => {
   const fetchAudio = async () => {
     const audioData = await getAuidoUrl(params.id);
     setAudio(audioData);
   };

   fetchAudio();
 }, [params.id]);

 useEffect(() => {
   if (audio) {
     wavesurferRef.current = WaveSurfer.create({
       height: 100,
       container: '#waveform',
       waveColor: '#ff0783',
       progressColor: 'purple',
       plugins: [Hover.create({})]
     });

     wavesurferRef.current.load(audio.audioUrl);

     wavesurferRef.current.on('ready', function () {
       setAudioDurations(wavesurferRef.current?.getDuration() || 0);
     });
     wavesurferRef.current.on('finish', function () {
         setIsPlaying(false);
     });

     wavesurferRef.current.on('audioprocess', function () {
       setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
     });
   }

   return () => {
     wavesurferRef.current?.destroy();
   };
 }, [audio]);

 const handlePlayPause = () => {
   if (wavesurferRef.current) {
     wavesurferRef.current.playPause();
     setIsPlaying(!isPlaying);
   }
 };

 return (
   <>
   <div className="w-full h-[100vh] overflow-hidden flex items-center justify-center p-10">

     <div className="flex w-full items-center justify-center relative">
       <button className="mx-2 flex items-center" onClick={handlePlayPause}>{isPlaying ? <PauseIcon size={32} color="#ff0783" />  : <PlayIcon size={32} color="#ff0783" /> }</button>
       <div className="relative w-full flex items-center justify-center ">
         <div id={`waveform`} className="w-full left-0 top-0 cursor-pointer"/>
         <div id={`preLoadwaveform1`} className="w-full left-0 top-0 absolute cursor-pointer"/>
         <div className="absolute right-2 bottom-1"> 
           {Math.floor(currentTime / 60)}:
           {('0' + Math.floor(currentTime % 60)).slice(-2)}
           {Math.floor((currentTime % 1) * 10)}
            &nbsp; / &nbsp;
           {Math.floor(audioDurations / 60)}:
           {('0' + Math.floor(audioDurations % 60)).slice(-2)}
           {Math.floor((audioDurations % 1) * 10)}
         </div>
       </div>
     </div>
   </div>
   </>
 );
}