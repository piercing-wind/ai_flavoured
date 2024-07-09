export const dynamic = "force-dynamic";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import Image from "next/image";
import CSS from "./flavours.module.css";
import Link from "next/link";
import { ChatGPTIconGlow, StableDiffusionIcon } from "@/components/logo";
import { getUserSession } from "@/actions/userSession";


export const metadata = {
   title: "Ai Flavoured | AI Image Generation,AI Presentations,AI Audio Creation, and AI PDF Summarization AI Chat with doc",
    metadataBase: new URL(`${process.env.WEBSITE_URL}`),
    description:"Experience the best in AI with our comprehensive solutions. with chatgpt-4,chatgpt-4o, Generate stunning images with DALL-E and SDXL, create professional presentations from any document, transform text into high-quality audio, and quickly summarize PDFs. Enhance your productivity with our advanced AI tools.",
    applicationName: "AI Flavoured", 
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
       'chatGPT',
       'DALL-E',
       'Stable Diffusion XL',
       'AI Audio',
       'pdf summarization',
       'gpt',
       'chat',
       'ai presentation',
       'ppt ai',
       'powerpoint ai',
       'ai presentation maker',
       'ai',
       'sdxl base',
       'sdxl',
       'dalle',
       'chat with doc',
       'ai chat',
       "chatgpt-4o",
       "chatgpt-4",
       "chatgpt-3",
       "gpt"
    ],
    referrer: "origin",
    creator: "Sourabh",
    publisher: "AI Flavoured",
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: "/" },
    manifest: "/manifest.json",
  };

const Page = async () => {
 const userSession = await getUserSession();
  return (<>
  <Header/>
    <div className="mx-20 gap-5 space-y-20">
      <h1 className="text-4xl font bold pt-10">Explore AI&#39;s</h1>
      <div className="w-full flex flex-wrap gap-8 justify-center items-center">
         <div className={`h-[12rem] w-[20rem] ${CSS.custom_shadow} rounded-xl overflow-hidden  relative`}>
            <h1 className={`absolute top-4 left-4 ${CSS.neonDark} text-4xl font-bold`}>AI Presentation</h1>
            <video src="https://di6ccwru5n10a.cloudfront.net/public/flavoursPage/3130284-uhd_3840_2160_30fps.mp4" className="inset-0 w-full h-full object-cover" autoPlay muted loop controlsList="nodownload"/>
            <Link href={userSession !== null ? '/aipresentation' : '/login?callbackUrl=/aipresentation'} 
               className="absolute bottom-2 rounded-lg py-1 px-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:from-transparent  hover:to-aiflavoured">
               Create Now
            </Link>
         </div>
         <div className={`h-[12rem] w-[20rem] ${CSS.custom_shadow} rounded-xl overflow-hidden  relative`}>
            <h1 className={`absolute top-4 left-4 ${CSS.neonDark} text-4xl font-bold backdrop-blur-sm rounded-lg`}>Chat with Doc</h1>
            <p className="absolute top-16 left-4 text-lg backdrop-blur-sm text-white font-bold">Best summarization ai</p>
            <Image
               src={'https://di6ccwru5n10a.cloudfront.net/public/flavoursPage/chatwithdoc.png'}
               alt="chat with doc"
               fill
               className="-z-10"
               style={{
                  objectFit: 'fill',

               }}
            />
            <Link href={userSession !== null ? '/chat' : '/login?callbackUrl=/chat'} 
               className="absolute bottom-2 rounded-lg py-1 px-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:from-transparent  hover:to-aiflavoured">
               Create Now
            </Link>
         </div>
         <div className={`h-[12rem] w-[20rem] ${CSS.custom_shadow} p-5 bg-black rounded-xl overflow-hidden  relative`}>
            <h1 className={` text-white pb-3 text-3xl font-bold backdrop-blur-sm rounded-lg`}>AI Image With</h1>
            <div className={`${CSS.neonDark} flex text-4xl space-x-8 font-bold backdrop-blur-sm rounded-lg`}><h1 >DALL-E 3 </h1><ChatGPTIconGlow size={50}/></div>
            <p className="bottom-2 left-2 absolute">Text to Image(TTI)</p>
       
            <Link href={ userSession !== null ? '/image' : '/login?callbackUrl=/image'} 
               className="absolute bottom-2 rounded-lg py-1 px-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:from-transparent  hover:to-aiflavoured">
               Create Now
            </Link>
         </div>
         <div className={`h-[12rem] w-[20rem] ${CSS.custom_shadow} pt-2 p-5 bg-black rounded-xl overflow-hidden  relative`}>
            <h1 className={` text-white pb-3 text-3xl font-bold backdrop-blur-sm rounded-lg`}>AI Image With</h1>
            <div className={`${CSS.neonDark} flex text-4xl space-x-8 font-bold backdrop-blur-sm rounded-lg`}><h1 >Stable Diffusion XL </h1><StableDiffusionIcon size={50}/></div>
              <p className="bottom-2 left-2 absolute">Text to Image(TTI)</p>
            <Link href={ userSession !== null ? '/image' : '/login?callbackUrl=/image'} 
               className="absolute bottom-2 rounded-lg py-1 px-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:from-transparent  hover:to-aiflavoured">
               Create Now
            </Link>
         </div>
         <div className={`h-[12rem] w-[20rem] ${CSS.custom_shadow} pt-2 p-5 bg-black rounded-xl overflow-hidden  relative`}>
            <h1 className={` ${CSS.neonDark} pb-3 text-3xl font-bold backdrop-blur-sm rounded-lg`}>Make AI Audio</h1>
              <Image
               src={'https://di6ccwru5n10a.cloudfront.net/public/flavoursPage/audio.png'}
               alt="chat with doc"
               height={40}
               width={500}
               className="absolute top-[40%]"
               
               style={{
                  objectFit: 'contain',

               }}
              /> 
              <p className="bottom-2 left-2 absolute">Text to Speech(TTS)</p>
            <Link href={userSession !== null ? '/audio' : '/login?callbackUrl=/audio'} 
               className="absolute bottom-2 rounded-lg py-1 px-2 right-2 text-white transition-all duration-500 text-xl hover:scale-[1.05] font-bold bg-gradient-to-br from-purple-400 hover:from-transparent  hover:to-aiflavoured">
               Create Now
            </Link>
         </div>

      </div>

    <Footer/>
    </div>
  </>);
};
export default Page;
