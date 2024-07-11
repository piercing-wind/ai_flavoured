import { Divider } from "@/components/divider";
import { Header } from "@/components/header/header";
import { CheckIcon } from "@/components/socialIcons";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { getCurrentRate, timezoneCurrencies } from "@/lib/timezoneAndCurrency";
import {prices as price} from  "@/components/globalVariables";
import { Metadata } from "next";
import CSS from "./pricing.module.css";
import { SeeMore } from "@/components/pricingPageSeeMore";

const website = process.env.WEBSITE_URL || 'https://aiflavoured.com';

export const metadata: Metadata = {
   title: "Ai Flavoured | Pricing Best AI Tools",
    metadataBase: new URL(`${website}/pricing`),
    description:"Best Value AI Services Pricing for AI Image Generation,AI Presentations,AI Audio Creation, and AI PDF Summarization,Free Ai Images, Free Ai Audio, Free and Premium Plans available.",
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
    ],
    referrer: "origin",
    creator: "Sourabh",
    publisher: "AI Flavoured",
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: "/pricing" },
  };


const Page = () => {
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const currency = timezoneCurrencies[ timeZone as keyof typeof timezoneCurrencies];
   let currencyRateValue = getCurrentRate['INR']; // default value
      if (currency && currency.currencyCode) {
        const currencyCode = currency.currencyCode as keyof typeof getCurrentRate;
        currencyRateValue = getCurrentRate[currencyCode] || getCurrentRate['INR'];
      }
   const symbol = currency && currency.currencySymbol ?  currency.currencySymbol : "₹";
   
   const subscription = {
      flavour : '/flavours',
      monthlyPremium : '/checkout?plan=1-month-premium',
      monthlyUnlimited : '/checkout?plan=1-month-unlimited',
      annualPremium : '/checkout?plan=annual-premium',
      annualUnlimited : '/checkout?plan=annual-unlimited', 
   }

  return (
  <div className="bg-white text-black">
   <Header/>
   <div className="flex flex-grow w-full h-[49rem] items-center justify-center text-center relative">
       <h1 className="text-7xl font-extrabold absolute top-[40%] text-white z-10">Affordable <span className=" brightness-75">and Sensible Pricing for Everyone</span></h1>
      <Image
        src={'/pricing/earth-3866609.jpg'}
        alt="Picture of the bg design"
        fill
        className=""
        style={{
         objectFit: 'cover',
         filter: 'brightness(0.4)',
        }} 
      />
   </div>
         <h1 className="text-5xl font-bold w-full text-center py-10 mb-5">1 Month Subscription</h1>
      <div className="w-full flex  flex-wrap gap-8 justify-center 2xl:px-[3%]">
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] flex flex-col items-center w-full bg-neutral-200 rounded-xl">
               <h1 className="text-2xl font-medium brightness-75 pl-10 pt-8 w-full">Free</h1>
               <div className="w-full flex items-baseline justify-center my-10">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>0 </span>
                  <p className="text-xl"> / For beignners</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center brightness-50 opacity-75 my-5">For newcomers eager to get a taste of AI, including its essential features.</p>
         </div>
         <div className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] "
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         >
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} /> 2 files Upload AI Summarization</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />15 GPT-3.5 Questions</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />5  GPT-4/ 4o Questions</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Limited Premium Features</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />2 AI Images /day</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Limited Access</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-4">
               <Link href={subscription.flavour}  className='flex items-center justify-center text-2xl font-bold my-2 sm:my-5 p-3 rounded-md brightness-90 w-[80%] shadow-lg border border-neutral-100 bg-background hover:bg-neutral-200 hover:text-accent-foreground text-black text-opacity-70 hover:scale-[1.01]'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] flex flex-col items-center w-full bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 rounded-xl">
               <h1 className={`text-2xl font-bold pl-10 pt-8 w-full brightness-125 ${CSS.animate_charcter} bg-transparent`}>Premium</h1>
               <div className="w-full flex items-baseline justify-center my-10 text-neutral-900">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>{(price["1-month-premium"]*currencyRateValue).toFixed(1)}</span>
                  <p className="text-xl"> / Per Month</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center brightness-50 opacity-75 my-5">For professionals who desire enhanced accessibility and plan to utilize it weekly.</p>
         </div>
         <div className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] "
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         >
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Large Volume Usage</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />15 AI Presentation</li>
               <li className="flex gap-x-4 items-center " ><CheckIcon size={20} />Full Access to PDF Summarization</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to AI Images</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to AI Audio</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to 2 Image Models</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-4">
               <Link href={subscription.monthlyPremium} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] text-white flex flex-col items-center w-full bg-gradient-to-bl from-neutral-900 via-slate-900 to-neutral-700 rounded-xl">
               <h1 className={`text-2xl brightness-125 font-extrabold p-8 w-full ${CSS.bgUnlimitedText}`}>Unlimited</h1>
               <div className="w-full flex items-baseline justify-center my-10 text-white">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>{(price["1-month-unlimited"]*currencyRateValue).toFixed(1)}</span>
                  <p className="text-xl"> / Per Month</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center opacity-100 mb-10 mt-2">For those ready for an AI-driven future who need unlimited access. Ideal for learners, researchers, or content creators.</p>
         </div>
         <div 
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] ">
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited Usage</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited AI Presentation</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited PDF Summarization</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited AI Images</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited to AI Audio</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited Features</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-4 sm:py-10">
               <Link href={subscription.monthlyUnlimited} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-neutral-800 to-neutral-600 hover:from-netural-600 hover:to-purple-700'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>

     </div>  
     <h1 className="text-5xl font-bold w-full text-center py-10 my-5">Annual Subscription</h1>
      <div className="w-full flex  flex-wrap gap-8 justify-center 2xl:px-[3%]">
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] flex flex-col items-center w-full bg-neutral-200 rounded-xl">
               <h1 className="text-2xl font-medium brightness-75 pl-10 pt-8 w-full">Free</h1>
               <div className="w-full flex items-baseline justify-center my-10">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>0 </span>
                  <p className="text-xl"> / For beignners</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center brightness-50 opacity-75 my-2">For newcomers eager to get a taste of AI, including its essential features.</p>
         </div>
         <div 
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] ">
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} /> 2 files Upload AI Summarization</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />15 GPT-3.5 Questions</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />5  GPT-4/ 4o Questions</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Limited Premium Features</li>
               <li className="flex gap-x-4 items-center opacity-40" ><CheckIcon size={20} />2 AI Images /day</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Limited Access</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-4 ">
               <Link href={subscription.flavour}  className='flex items-center justify-center text-2xl font-bold my-2 sm:my-5 p-3 rounded-md brightness-90 w-[80%] shadow-lg border border-neutral-100 bg-background hover:bg-neutral-200 hover:text-accent-foreground text-black text-opacity-70 hover:scale-[1.01]'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] flex flex-col items-center w-full bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 rounded-xl">
               <div className="w-full flex items-center justify-between pt-8 px-10">
               <h1 className={`text-2xl font-bold w-full brightness-125 ${CSS.animate_charcter} bg-transparent`}>Premium Annual</h1>
                  <h1 className="w-24 text-nowrap rounded-2xl bg-white text-aiflavoured text-center">-15% Off</h1>
               </div>
               <div className="w-full flex items-baseline justify-center my-10 text-neutral-900">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>{(price["annual-premium"]*currencyRateValue).toFixed(1)}</span>
                  <p className="text-xl"> / Per Month</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center brightness-50 opacity-75 my-2">For professionals who desire enhanced accessibility and plan to utilize it weekly.</p>
         </div>
         <div 
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] ">
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Large Volume Usage</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />15 AI Presentation</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to PDF Summarization</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to AI Images</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to AI Audio</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Full Access to 2 Image Models</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-4">
               <Link href={subscription.annualPremium} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>
       <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[49rem] p-3 relative">
         <div className="h-[22rem] text-white flex flex-col items-center w-full bg-gradient-to-bl from-neutral-900 via-slate-900 to-neutral-700 rounded-xl">
               <h1 className={`text-2xl brightness-125 font-extrabold p-8 w-full ${CSS.bgUnlimitedText}`}>Unlimited Annual</h1>
               <div className="w-full flex items-baseline justify-center my-10 text-white">
                  <span className="font-bold text-7xl"><span className="text-5xl">{symbol}</span>{(price["annual-unlimited"]*currencyRateValue).toFixed(1)}</span>
                  <p className="text-xl"> / Per Month</p>
               </div>
                  <Divider className="opacity-100 w-[50%]"/>
               <p className="text-lg mx-8 text-center opacity-100 mb-10 mt-2">For those ready for an AI-driven future who need unlimited access. Ideal for learners, researchers, or content creators.</p>
         </div>
         <div 
         style={{boxShadow : '-1px -1px 7px #baa9b6' }}
         className="w-[82%] h-[26rem] p-5 absolute left-[10%] bg-white rounded-xl bottom-[1%] sm:bottom-[2%] ">
            <ul className="gap-4 flex flex-col text-lg opacity-90">
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited Usage</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited AI Presentation</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited PDF Summarization</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited AI Images</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited to AI Audio</li>
               <li className="flex gap-x-4 items-center" ><CheckIcon size={20} />Unlimited Features</li>
            </ul>
            <div className="w-full flex items-center justify-center pt-3 sm:py-10">
               <Link href={subscription.annualUnlimited} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-neutral-800 to-neutral-600 hover:from-netural-600 hover:to-purple-700'>
                  Get Started
               </Link>
            </div>
         </div>
       </div>
        
        <div className="w-full flex flex-col items-center justify-center">
            <SeeMore />
         <h1 className="text-center w-full text-lg">If you have Any Questions, Feel free to reach us out!</h1>
         </div> 
     </div>
     <Footer fixedBgWhite/>  
  </div>
  
  );
};

export default Page;
