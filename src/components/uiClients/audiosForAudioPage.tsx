'use client';
import { useState } from 'react';
import { audioFiles } from "@/components/configRightBarAudioSession";
import { PauseIcon, PlayIcon2 } from "@/components/mediaIcons";

export const AudiosForAudioPage = () => {
  const [playing, setPlaying] = useState<Array<boolean>>(audioFiles.map(() => false));

  const toggleAudio = (index: number) => {
    const audioEl = document.getElementById(`audio-element-${index}`) as HTMLAudioElement;
    if (playing[index]) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
    setPlaying(playing.map((p, i) => i === index ? !p : p));
  }

  return (
    <div className="w-full flex flex-wrap items-center justify-center my-5 space-x-6">
      {audioFiles.map((file, index) => (
         <div key={index} className='text-center'>
          <div  className="w-24 h-24 border border-pink-400 shadow-lg hover:shadow-pink-500 rounded-full flex items-center justify-center m-2">
            <button onClick={() => toggleAudio(index)}>
              {playing[index] ? <PauseIcon size={50} color="#ff0786"/> : <PlayIcon2 size={50} color="#ff0786" />}
            </button>
            <audio id={`audio-element-${index}`}>
              <source src={file.path} type="audio/mpeg" />
            </audio>      
          </div>
          <p>{file.name}</p>
         </div>
      ))}
    </div> 
  )
}