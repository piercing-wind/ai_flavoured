import { Divider } from "./divider"
import { LinkdinIcon, RedditIcon, TwitterIcon } from "./socialIcons";
import Link from "next/link";
import CSS from "@/app/frontpage.module.css"

export const Footer = ({fixedBgWhite = false}:{fixedBgWhite?:boolean}) => {
   return (
      <div className="mt-4 w-full flex flex-col items-center justify-center">
      <Divider className="w-96 mt-1 opacity-100" />
          <div className=" w-full flex items-start justify-start text-nowrap flex-wrap">
               <div className="relative p-5 h-auto flex flex-col items-center justify-between ">
                  <Link href="/" className="font-bold glow whitespace-nowrap text-5xl m-4">Ai Flavoured</Link>
                  <p className="text-xs opacity-75 w-full text-left pl-10">Follow us</p>
                  <div className="flex space-x-4">
                        <LinkdinIcon  classNameForBg="bg-aiflavoured dark:bg-none" color={fixedBgWhite ? "#ff0786" : "#ffffff"}/>
                        <TwitterIcon classNameForBg="bg-aiflavoured dark:bg-none" color={fixedBgWhite ? "#ff0786" : "#ffffff"}/>
                        <RedditIcon classNameForBg="bg-aiflavoured dark:bg-none" size={32} color={fixedBgWhite ? "#ff0786" : "#ffffff"}/>
                  </div>
               </div>
             <div className="p-8 md:ml-12">
                <h5 className="text-base font-semibold opacity-80">Ai Flavours</h5>
                <ul className="font-medium space-y-2 md:space-y-3 py-2 text-sm">
                   <li><a href="/aipresentation">AI Presentation</a></li>
                   <li><a href="/chat">Document Summary</a></li>
                   <li><a href="/image" >AI Image</a></li>
                   <li><a href="/image">Stable Diffusion</a></li>
                   <li><a href="/image">DALL-E 3</a></li>
                   <li><a href="/audio">AI Voices</a></li>
                </ul>
             </div>
             <div className="p-8 md:ml-12">
                <h5 className="text-base font-semibold opacity-80">Company</h5>
                <ul className="font-medium space-y-2 md:space-y-3 py-2 text-sm">
                   <li><a href="/about">About</a></li>
                   <li><a href="/security">Security</a></li>
                   <li><a href="/pricing" >FAQ</a></li>
                   <li><a href="/login">Login</a></li>
                   <li><a href="/pricing">Pricing</a></li>
                </ul>
             </div>

             <div className="p-8 md:ml-12">
                <h5 className="text-base font-semibold opacity-80">Others</h5>
                <ul className="font-medium space-y-2 md:space-y-3 py-2 text-sm">
                   <li className=""><a href="mailto:team@aiflavoure.com">Contact Us</a></li>
                   <li><a href="/support">Report Bug / Support</a></li>
               </ul>
             </div>

             <div className="flex flex-grow items-center justify-center p-8">
               <Link href={'/flavours'} className={CSS.button_getStarted}>
                  Get Started
               </Link>
             </div>
          </div>
          <p className="flex my-2 text-xs whitespace-nowrap text-nowrap opacity-85 items-baseline">
            AI Flavoured © 2024  
          </p>
    </div>
   )
}