import {Header} from '@/components/header/header';
import {WelcomeContent} from "@/components/particlesAndFrontMainContent/welcomeContent"
import Styles from '@/app/frontpage.module.css'
import { DashedArrow } from '@/components/svgIcons';
import { ChatWithDocumentImage, DisplayPowerpointImages } from '@/components/uiClients/frontEndImagesDisplay';
import AParticles from '@/components/uiClients/particles';
import { ImageDisplayLoop } from '@/components/uiClients/imagedisplayloop';
import CSS from './frontpage.module.css';
import { ChatGPTIconGlow, StableDiffusionIcon } from '@/components/logo';
import Image from 'next/image';
import { Divider } from '@/components/divider';
import { BlubIcon, ProfessionalIcon, ResearchIcon, StudentIcon } from '@/components/socialIcons';
import { Footer } from '@/components/footer';
import Link from 'next/link';


const Page = () => {
   const dalleImages = ['https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/6529cc8a4611e9ca1e6b6dbe_fantastic_world_dall_e_3.webp','https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/AnimeGirlSInging.webp','https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/riversMountains.jpg','https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/dalle3.jpg']
   const sdxl = ['https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/Create-realistic-AI-art-models-using-Stable-Diffusion-and-Absolute-Reality.webp',
               'https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/list-of-stable-diffusion-models-in-sd2-version-1.webp',
               'https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/prompthero-prompt-e57966a9ee7.webp',
               'https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/stablediffusion-1-5-v0-9jz8otm1in4a1.webp',
               'https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/sdxl1.png'
               ]

  return (<>   
      <Header/>
      <WelcomeContent />
    <div className="w-full mb-20 space-y-8 sm:space-y-14 xl:space-y-36 md:mt-24 xl:mt-40 flex flex-col items-center justify-center">
         <div className='w-[95%] sm:w-[80%] md:flex lg:flex-nowrap relative items-center justify-between sm:p-2'>
                <div className='hidden md:flex absolute md:scale-75 -top-[55%]  xl:scale-125 left-[40%] lg:-top-[45%] xl:-top-[55%] rotate-[19deg] z-[1]'>
                   <DashedArrow h={'100%'} w={'100%'}   />
                </div>
            <div className='w-full dark:bg-transparent bg-warm-white md:w-[50%] lg:w-[50%] xl:w-[40%] space-y-10 border p-4 rounded-xl relative overflow-hidden'>
               {/* <div className="top-5 left-5 w-28 h-28 absolute bg-pink-500 blur-xl dark:hidden"/> */}
              <Link href='/aipresentation' className='w-full'>
               <h1 className={`${Styles.whiteGlow} text-4xl lg:text-6xl `}>Generate AI Presentation</h1>
                </Link>
               <p className='text-xl lg:text-2xl ml-4'>Create stunning PowerPoint slides in minutes with our AI-powered tools. Transform any document into a professional presentation effortlessly.</p>                  
            </div>
            <DisplayPowerpointImages/>
         </div>
      <Divider className='w-[80%] opacity-100 md: lg:hidden'/>

      <div className='w-full h-full  max-w-[100rem] max-h-[52rem] relative'>
          <div className='-z-10 absolute h-[52rem] w-full '><AParticles/></div> 
          <ChatWithDocumentImage/>
      </div>

      <Divider className='w-[80%] opacity-100 md: lg:hidden'/>

      <div className='w-full lg:h-[19rem] px-5 xl:px-20 space-y-16 lg:space-y-0 flex lg:flex-row items-center flex-col justify-center lg:justify-between'>
         <ImageDisplayLoop images={dalleImages}/>
         <div className='w-[22rem] sm:w-[30rem] lg:w-[55%] h-full space-y-2 relative ml-5'> 
            <div className={`${CSS.whiteGlow} text-3xl sm:text-5xl `}>
                  <Link href='/image'>
                     <h1 className='pb-5 xl:py-5'>Generate AI Images with</h1>
                      <p className='flex justify-between items-center'><span className=''>DALL-E 3 </span> <ChatGPTIconGlow size={50}/></p>
                  </Link>
            </div>
            <p className='text-xl sm:text-2xl pt-5'>DALL·E 3 comprehends much more nuance and details, enabling you to effortlessly transform your ideas into highly accurate images.</p>
         </div>
      </div>
      <Divider className='w-[80%] opacity-100 md: lg:hidden'/>
      <div className='w-full lg:h-[19rem] px-5 xl:px-20 space-y-16 lg:space-y-0 flex lg:flex-row items-center flex-col justify-center lg:justify-between'>
         <div className='w-[22rem] sm:w-[30rem] lg:w-[55%] h-full space-y-2 relative ml-5 sm:mr-5'> 
            <div className={`${CSS.whiteGlow} text-3xl sm:text-5xl `}>
               <Link href='/image'>
                <h1 className='pb-5 xl:py-5'>Generate AI Images with</h1>
                <p className='flex justify-between items-center'><span className=''>Stable Diffusion XL</span> <StableDiffusionIcon size={50}/></p>
               </Link>
            </div>
            <p className='text-xl sm:text-2xl pt-5'>Unleashing Humanity&#39;s Potential Through Generative AI for everyone, everywhere.</p>
         </div>
         <ImageDisplayLoop images={sdxl}/>
      </div>
      
      <Divider className='w-[80%] opacity-100 md: lg:hidden'/>

      <div className='w-full lg:h-[19rem] px-5 xl:px-20 space-y-16 lg:space-y-0 flex lg:flex-row items-center flex-col justify-center lg:justify-between'>
         <div className='relative max-h-[14rem] sm:max-h-[18rem] max-w-[22rem] sm:max-w-[29rem] rounded-xl overflow-hidden w-full' style={{ height: '18rem' , width : '29rem' }}>
            <Image
                unoptimized  
                src='https://di6ccwru5n10a.cloudfront.net/public/frontPageimages/audio.png'
                alt="audio"
                fill
                style={{ objectFit: 'cover', borderRadius: '2rem'}} // match the rounded-xl class (which is 1rem by default)
              />
         </div>

         <div className='w-[22rem] sm:w-[30rem] lg:w-[55%] h-full space-y-2 relative ml-5'> 
            <div className={`${CSS.whiteGlow} text-3xl sm:text-5xl `}>
               <Link href='/audio'>
                <h1 className='pb-5 xl:py-5'>Generate AI Audio</h1>
                </Link>
            </div>
            <p className='text-xl sm:text-2xl pt-5'>Powerful and Feature-Rich, Online Text-to-Voice Studio</p>
            <ol  className='text-xl ml-4 list-disc'>
               <li>Narrate a written blog post</li>
               <li>Convert text to audio</li>
               <li>Generate voiceovers for videos</li>
               <li>And much more</li>
            </ol>
         </div>
      </div>
      <Divider className='w-[80%] opacity-100 md: lg:hidden'/>

      <div className='w-full px-4'>
          <div className={`${CSS.whiteGlow} w-full pb-5 text-center text-3xl sm:text-5xl flex items-center justify-center `}>
               <h1>Best Creative Tools AI for Everyone</h1>
          </div>
          <div className='w-full flex flex-wrap xl:flex-nowrap items-center justify-center'>
            <div className='w-[24rem] flex flex-col items-center justify-center p-4'>
              <h1 className='text-4xl font-bold mt-4 py-5'>Students</h1>
              <div className={`relative text-xl w-full h-[16rem] flex items-end justify-center p-4 rounded-t-full bg-gradient-to-b from-aiflavoured via-purple-300 dark:from-black dark:via-purple-800 ${CSS.textGlow}`}>
                <p className='w-[16rem]'>Use our AI to quickly learn concepts, prepare for exams, complete homework, and create custom presentations with speaker notes.</p>
              <StudentIcon size={50} className='absolute top-4' />
              </div>
            </div>
            <div className='w-[24rem] flex flex-col items-center justify-center p-4'>
              <h1 className='text-4xl font-bold mt-4 py-5'>Creators</h1>
              <div className={`relative text-xl w-full h-[16rem] flex items-end justify-center p-4 rounded-t-full bg-gradient-to-b from-aiflavoured via-purple-300 dark:from-black dark:via-purple-800 ${CSS.textGlow}`}>
                <p className='w-[16rem]'>Social media creators can use our AI to generate images and audio. Generate Logos, and Engaging social contents and much more.</p>
                <BlubIcon size={50} className={'absolute top-4'}/>
              </div>
            </div>
            <div className='w-[24rem] flex flex-col items-center justify-center p-4'>
              <h1 className='text-4xl font-bold mt-4 py-5'>Researchers</h1>
              <div className={`text-xl w-full h-[16rem] flex items-end justify-center p-4 rounded-t-full bg-gradient-to-b from-aiflavoured via-purple-300 dark:from-black dark:via-purple-800 ${CSS.textGlow}`}>
                <p className='w-[16rem] mb-5'>Upload any report or document and receive an immediate summary. Extract only the information you need in seconds.</p>
               <ResearchIcon size={50} className='absolute top-4'/>
              </div>
            </div>
            <div className='w-[24rem] flex flex-col items-center justify-center p-4'>
              <h1 className='text-4xl font-bold mt-4 py-5'>Professionals</h1>
              <div className={`relative text-xl w-full h-[16rem] flex items-end justify-center p-4 rounded-t-full bg-gradient-to-b from-aiflavoured via-purple-300 dark:from-black dark:via-purple-800 ${CSS.textGlow}`}>
                <p className='w-[16rem] mb-5'>Instantly generate insightfull reports, craft compelling presentations, and extract key insights to enhance decision-making.</p>
               <ProfessionalIcon size={50} className='absolute top-4' />
              </div>
            </div>
          </div>  
      </div>
      <Divider className='w-[80%] opacity-100 mb lg:hidden'/>
    </div>
    <Footer/> 
    </> );
}
export default Page;