export const dynamic = "force-dynamic"
import { Metadata } from "next";
import Styles from "./image.module.css";
import { ImagePageHeader } from "@/components/uiClients/imagePageHeader";
import Image from "next/image";
import { images } from "@/app/(x)/image/displayImages";
import { ImageCarouselEffect } from "@/components/uiClients/imageCarouselEffect";
import { Divider } from "@/components/divider";
import { Footer } from "@/components/footer";
import { getUserSession } from "@/actions/userSession";
import { DALLE3, Login, StableDiffusionXL } from "@/components/uiClients/buttonForImagePage";
import { ChatGPTIconGlow } from "@/components/logo";
import { ServerUserProfile } from "@/components/header/links/serverUserProfile";

const website = process.env.WEBSITE_URL || 'https://aiflavoured.com';

export const metadata: Metadata = {
  metadataBase: new URL(`${website}/image`),
  title: "Generate AI Images Online with DALL-E 3 and SDXL | AI Image Generatorr",
  description:"Generate stunning AI images with our powerful and popular AI Image Generator using SDXL and DALL-E 3. Explore stable diffusion online and OpenAI's generative AI tools. Create now!",
  applicationName: "AI Image Generator",
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
    'AI Image',
    'image',
    'AI Image Generator',
    'gpt full form generative pretrained transformer',
    'stable diffusion online',
    'openai',
    'dall-e',
    'dalle 3',
    'stable diffusion',
    'stable diffusion ai',
    'generate ai images',
    'generative ai',
    'ai model',
    'ai image generator',
   'popular ai tools in content writing domain',
    'sdxl',
    'stable diffusion xl free',
    'popular ai image generator',
    'popular tools in content writing domain',
    'DALL·E 3',
    'OpenAI Artificial Intelligence company',
      'dall-e 3',
      'dall e ai',
      'dall e 3 ai',
      'dall 3',
      'dall',
      'dalle',
      'image generator'

  ],
  referrer: "origin",
  creator: "Sourabh",
  publisher: "AI Flavoured",
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/image" },
};

export default async function Page() {
   const userSession = await getUserSession();
  return (
    <div
      className={`w-full justify-center overflow-x-hidden overflow-y-auto ${Styles.hide_scrollbar}`}
    >
      <div className="w-full border-b flex items-center justify-between p-2">
         <Image
         unoptimized
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
      <div className="w-full p-2 flex flex-col items-center">
        <ImagePageHeader />
        <p className="text-lg mt-10 md:text-2xl font-semibold dark:text-white text-center">
          Generate AI Images from scratch from text with powerfull AI{" "}
          <b title="Stable Diffiuson Extra Large">SDXL</b> or{" "}
          <b title="Open AI DALL-E-3">DALL-E 3</b>
        </p>
      </div>

      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center lg:space-x-24 xl:space-x-36 lg:px-28 mt-8 md:mt-12 ">
               <div className="h-56 w-96 relative rounded-lg m-2 overflow-hidden shadow shadow-neutral-500">
                  <Image
                  src='/imageForImagePage/natureGigazine.jpg'
                     alt= 'stableDiffusionXL'
                     fill
                     className="transition-transform duration-500 hover:scale-105"
                     style={{
                        objectFit:'cover'
                     }}
                  />
                  <h1 className={`font-bold text-5xl absolute  m-8 ${Styles.neonDark}`}>Stable Diffusion XL</h1>
                  <StableDiffusionXL 
                     userId={userSession !== null ? userSession.id : false} 
                     className="absolute bottom-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:bg-gradient-to-br hover:via-sky-300 hover:to-pink-400"
                  />
               </div>
               <div className="h-56 w-96 relative rounded-lg m-2 overflow-hidden shadow-md shadow-neutral-500">
                  <Image
                  src={images[0]}
                     alt= 'stableDiffusionXL'
                     fill
                     className="transition-transform duration-500 hover:scale-105"
                     style={{
                        objectFit:'cover'
                     }}
                  />
                  <h1 className={`font-bold text-5xl absolute  m-8 ${Styles.neonDark}`}>DALL-E 3 </h1>
                  <ChatGPTIconGlow className={`${Styles.neonDark} absolute right-2 filter brightness-150 mt-5`} size={65}/>   
                  <DALLE3 
                     userId={userSession !== null ? userSession.id : false} 
                     className="absolute bottom-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:bg-gradient-to-br hover:via-sky-300 hover:to-pink-400"
                  />
               </div>
      </div>

      <div className="w-full flex flex-col items-center my-2">
      <Divider className="w-96 mt-10" />
        <h1 className="font-semibold text-2xl md:text-3xl my-7 md:my-10 text-center">Images With Stable Diffiusion</h1>
        <div
          className={`relative w-[90%] md:w-[80%] h-0 pb-[47.9%] dark:shadow-white rounded-md overflow-hidden`}
        >
          <Image
            src="https://di6ccwru5n10a.cloudfront.net/public/images/sdxl.jpg"
            alt="AI Image"
            fill
            style={{
              objectFit: "cover",
              boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      <Divider className="w-96 mt-10" />
      </div>
      <div className={`flex flex-col w-full items-center my-4`}>
         <h1 className="font-semibold text-2xl md:text-3xl mt-2 md:mt-5 md:mb-10">DALL-E 3 Generate Images</h1>
         <ImageCarouselEffect images={images} />
      </div>

   <Footer />
    </div>
  );
}
