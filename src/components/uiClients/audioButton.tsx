'use client'
import Styles from "@/app/(x)/audio/audio.module.css"
import { CiMicrophoneOn } from "react-icons/ci"
import { useRouter } from "next/navigation";
import { createChatSession } from "@/actions/chat/chatSession"
import { useState } from "react";
import { RingLoader } from "react-spinners";

export const AudioSessionButton =({userId}: {userId: string | boolean})=>{
   const router = useRouter();
   const [loader, setLoader] = useState(false)
   const handleClick = async ()=>{
      setLoader(true)
      if(typeof userId === 'string'){
         const  session = await createChatSession( userId, 'AI Audio Gen', 'audio');
         router.push(`/audio/${session}`)
      }else{
         router.push(`/login?callbackUrl=/audio`)
      }
   }
   return (
      <button onClick={()=>handleClick()} disabled={loader} className={`${Styles.btn_gradient_border} font-semibold text-xl px-4 py-3 rounded-full text-white my-4 text-nowrap flex flex-nowrap items-baseline`} >
          Generate AI Voices &nbsp;{loader ? <RingLoader color="#ff0786" size={25} /> : <CiMicrophoneOn />}
      </button>
   )
}