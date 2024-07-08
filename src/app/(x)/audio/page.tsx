export const dynamic = "force-dynamic"
import Image from "next/image";
import Styles from "./audio.module.css"
import { getUserSession } from "@/actions/userSession";
import { Login } from "@/components/uiClients/buttonForImagePage";
import { AudiosForAudioPage } from "@/components/uiClients/audiosForAudioPage";
import { Footer } from "@/components/footer";
import { AudioSessionButton } from "@/components/uiClients/audioButton";
import { Metadata } from "next";
import { ServerUserProfile } from "@/components/header/links/serverUserProfile";

export const metadata: Metadata = {
   metadataBase: new URL(`${process.env.WEBSITE_URL}/audio`),
   title: "AI Voice Generator: Realistic Text to Speech and AI Voiceover. | AI Flavoured",
   description:"AI Flavoured Create the most realistic speech with our AI audio platform.reate the perfect AI voiceover. Go instantly from text to voice with ease.",
   applicationName: "AI Voice Generator",
   authors: [
     {
       name: "Sourabh",
       url: "https://www.linkedin.com/in/sourabh-sharma-8987451a2/",
     },
   ],
   generator: "AI Flavoured",
   keywords: [
     "AI",
     "AI Flavoured",
     'AI Voice Generator',
     'audio',
     'ai audio',
     'ai',
     'ai voice',
     'voice generator',
     'voice ai generator',
     'ai generator',
     'ai voice generator free',
     'text to speech',
     'text to speech ai',
     'ai voice generator online',
     'ai voice generator software',
     'ai voice generator text to speech',
     'ai voice text to speech',
     'ai cover',
     'ai voice cover',
     'best ai voice generator',
     'mp3 voice generator',
     'mp3'
 
   ],
   referrer: "origin",
   creator: "Sourabh",
   publisher: "AI Flavoured",
   robots: {
     index: true,
     follow: true,
   },
   alternates: { canonical: "/image" },
   manifest: "/manifest.json",
 };
 



export default async function Page(){
   const userSession = await getUserSession();
   
   return (
      <div
      className={`w-full justify-center overflow-x-hidden overflow-y-auto space-y-24 ${Styles.hide_scrollbar}`}
    >
      <div className="w-full border-b flex items-center justify-between p-2">
         <Image
         className=""
         src="/logo/logo.png"
         alt="Af Logo"
         height={60}
         width={60}
         />
            
          {userSession ? (
          <ServerUserProfile user={userSession} />
            ):(
             <Login callbackUrl="/image" className="py-1 h-8"/>
         )} 
      </div>
         <div className="w-full text-center items-center mt-5 sm:mt-10 space-y-10 sm:space-y-16">
               <h1 className="font-normal text-2xl mx-2">AI Voice Generator: The Most Realistic Text-to-Speech AI</h1>
               <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-4 mx-2 lg:mx-20 xl:mx-40 lg:px-10">Create AI Voices that Sound Exactly identical to Humans</h2>
               <div className="text-center w-full text-2xl">
                  <p>AI model that converts text to natural sounding spoken text.</p>
                  <p>Most Fluent and Conversational AI Voices.</p>
               </div>
         </div>   
            
         <div className="w-full flex items-center justify-center">
         <AudioSessionButton userId={userSession ? userSession?.id : false} />
         </div> 

         <AudiosForAudioPage />
         <div className="ml-5 md:ml-20  my-10">
           <h1 className="text-2xl font-semibold my-5">A New Way to Generate Text to Speech (TTS)</h1>  
           <ul className="ml-5 space-y-5 text-lg">
               <li>Narrate a written blog post</li>
               <li>Produce spoken audio in multiple languages</li>
               <li>Download Audio files you own them.</li>
            </ul>  
         </div>      
          <Footer/>     
   </div>
   )
}