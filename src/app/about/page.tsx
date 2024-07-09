import { Footer } from "@/components/footer"
import { Header } from "@/components/header/header"
import CSS from "./about.module.css"
import Image from "next/image"
import { Images } from "./client"
import { Metadata } from "next"
export const metadata: Metadata = {
   title: "AI Flavoured - About Us",
   metadataBase: new URL(`${process.env.WEBSITE_URL}/about`),
   description: "AI Chat- Chatbot Discover AI Flavoured: your ultimate platform for creating engaging social content effortlessly. Whether you're a student or a professional, our AI-powered tools, including AI Image, ChatGPT, DALL-E, and Stable Diffusion XL, simplify the creation of standout presentations, images, audio, and more. Join us in making content creation accessible, efficient, and enjoyable for everyone.",
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
     "AI Image",
     "ChatGPT",
     "DALL-E",
     "Stable Diffusion XL",
     "AI Audio",
     "PDF summarization",
     "GPT",
     "chat",
     "AI presentation",
     "PPT AI",
     "PowerPoint AI",
     "AI presentation maker",
     "SDXL base",
     "SDXL",
     "dalle",
     "AI Chat - ChatBot Assistant"
   ],
   referrer: "origin",
   creator: "Sourabh",
   publisher: "AI Flavoured",
   robots: {
     index: true,
     follow: true,
   },
   alternates: { canonical: "/about" },
 };


const Page=()=>{
   return (
      <div className="w-full flex flex-col">
           <Header />
           <div className="w-[95%] md:w-[80%] m-auto flex flex-col items-center">
            <h1 className="text-4xl font-semibold my-8 xl:my-20">About</h1>
            <div className="w-full flex gap-20 flex-col xl:flex-row items-center justify-center md:space-x-4">
               <p className={`text-2xl sm:text-3xl indent-4 m-auto md:w-[60%] xl:pr-28 ${CSS.slide}`}> <span className="text-5xl font-extrabold">W</span>elcome to AI Flavoured, your go-to platform for creating captivating social content with ease. Whether you&#39;re a student or a professional, our AI-driven tools help you craft standout presentations, images, audio, and more. Our mission is to make content creation accessible, efficient, and enjoyable for everyone.</p>
               <div className={`relative h-[20rem] w-[20rem] sm:w-[25rem] sm:h-[25rem] rounded-xl overflow-hidden ${CSS.slide}`}
               style={{boxShadow:"0 0 10px gray"}}
               >
                  <Image
                    src='/about/aboutpage.png'
                    alt="People working at AI flavoured"
                    fill
                    style={{
                     objectFit: 'contain',
                    }}
                  />
               </div>
            </div>
            <Images/>
            <div className="w-full h-[50rem] flex items-center justify-center">
              <h1 className={`text-7xl font-bold my-10 text-center`}>AI Flavoured shows how much we believe AI can change things.</h1>
            </div>
                 <a href="/flavours" className="mb-20 text-2xl font-semibold border border-neutral-500 p-2 rounded-xl">Start Exploring</a>   
            </div> 
            <Footer/>
      </div>
   )
}
export default Page