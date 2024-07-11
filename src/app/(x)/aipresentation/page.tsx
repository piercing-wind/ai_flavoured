export const dynamic = "force-dynamic"
import { DragAndDropForAiPresentation } from "@/components/dragAndDropForAiPresentation";
import React from "react";
import { getAiPresentationQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import Styles from "./presentation.module.css"
import { getUserSession } from "@/actions/userSession";
import { Metadata } from "next";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Login } from "@/components/uiClients/buttonForImagePage";
import { ServerUserProfile } from "@/components/header/links/serverUserProfile";

const website = process.env.WEBSITE_URL || 'https://aiflavoured.com';

export const metadata: Metadata = {
   metadataBase: new URL(`${website}/aipresentation`),
   title: 'AI Presentation Maker | PDF to PPTX | GPT-4 Document Summarizer',
   description: 'Make ai presentations with our AI-powered tools. Utilize GPT-4o and GPT-4 models to effortlessly convert PDFs to PPTX and PPT formats. Create stunning AI presentations with our AI PPT and AI PPTX makers. Experience the power of cutting-edge AI presentation technology for unparalleled creativity and efficiency.',
   applicationName: 'AI Presentation',
   authors: [{ name: 'Sourabh', url: 'https://www.linkedin.com/in/sourabh-sharma-8987451a2/' }],
   generator: 'AI Flavoured',
   keywords: ['AI', 'GPT-3','convert pdf to pptx','convert pdf to ppt', "ai presentation", "presentation ai","presentation", "ai ppt maker",'ai pptx maker', 'ai presentation maker','chatpdf', 'document summarizer', 'GPT-4', 'Documents', 'ChatGPT', 'ChatGPT-Software', 'cahtgpt', 'caht', 'cahtgot', 'chatgot', 'chatgpt 4o', 'AI Flavoured'],
   referrer: 'origin',
   creator: 'Sourabh',
   publisher: 'AI Flavoured',
   robots: {
      index: true,
      follow: true,
    },
   alternates: { canonical: '/aipresentation' },
 };
 
 

export default async function Page() {
   const userSession = await getUserSession();
   const presentationQuota = userSession !== null ? await getAiPresentationQuota(userSession?.id) : 0;
  return (
    <div className="flex flex-col items-center flex-grow w-full h-[100vh] overflow-y-auto space-y-12">
      <div className="w-full border-b flex items-center justify-between p-2">
         <Image
         className=""
         src="/logo/logo.png"
         alt="Af Logo"
         height={60}
         width={60}
         />
         <div className="self-center flex items-center justify-between">
           {userSession ? (
            <ServerUserProfile user={userSession} />

              ):(
               <Login callbackUrl="/image" className="py-1 h-8"/>
           )} 
         </div>
       </div>
      <div className="relative flex flex-wrap justify-center items-baseline w-[80%] my-6">
         <div className="aiflavoured text-5xl flex md:items-baseline font-bold text-nowrap relative">
          <img
            src="https://media.giphy.com/media/lsnt7oGW5eiJSVOoFr/giphy.gif"
            className="absolute inset-0 h-full w-full object-cover"
            alt="Giphy GIF"
          />
          Ai Flavoured
        </div>
         &nbsp; &nbsp;
        <p className="text-2xl font-medium text-center">
          Create professional AI presentations from any document in minutes with AI.
        </p>
      </div>
      <div className=" text-neutral-700">
        <DragAndDropForAiPresentation
          presentationQuota={presentationQuota}
          userSession={userSession}
          isSubscribed={userSession ? userSession.subscription : 'free'}
        />
      </div>
      <div className="w-[95%] md:w-[70%] lg:w-[60%] 2xl:w-full lg:flex lg:flex-wrap py-2 items-center justify-center">
         <div className={`h-[15rem] md:h[20rem] lg:h-[25rem] md:p-0 w-full 2xl:h-60 2xl:w-[30rem] relative ${Styles.glow_pink} rounded-lg overflow-hidden`}>
            <video src="https://di6ccwru5n10a.cloudfront.net/videos/presentationConnects.mp4" className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop controlsList="nodownload"/>
         </div>
          <div className={`hidden 2xl:flex xl:mx-12 border-r-2 h-full rotate-12 ${Styles.slash_glow_pink}`}/>
          <div className="2xl:mx-5 mt-5 2xl:mt-0  2xl:w-[30rem]">
            <h2 className={`font-bold text-4xl md:text-5xl ${Styles.whiteGlow}`}>
                AI Powered Presentation
            </h2>
            <h1 className="font-semibold text-3xl text-neutral-800 dark:text-white">
               Create Microsoft PowerPoint slides with worlds top AI Model.
            </h1>
          </div>
      </div>
      <Footer/>
    </div>
  );
}
