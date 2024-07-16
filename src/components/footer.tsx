import { Divider } from "./divider"
import { Instagram, Instagram2, LinkdinIcon, RedditIcon, TwitterIcon } from "./socialIcons";
import Link from "next/link";
import CSS from "@/app/frontpage.module.css"

export const Footer = ({fixedBgWhite = false}:{fixedBgWhite?:boolean}) => {
   return (
      <div className="mt-4 w-full flex flex-col items-center justify-center">
      <Divider className="w-96 mt-1 opacity-100" />
          <div className=" w-full flex items-start justify-start text-nowrap flex-wrap">
               <div className="relative p-5 h-auto flex flex-col items-center justify-between ">
                  <Link href="/" className="font-bold glow whitespace-nowrap text-5xl mt-4">Ai Flavoured</Link>
                  <div className="">
                  <p className="text-xs opacity-80">Hussainpura west 64</p>
                  <p className="text-xs opacity-80">#143001, India</p>
                  <p className="text-xs opacity-80 mt-2">contact@aiflavoured.com</p>
                  <p className="text-xs opacity-80 text-left mt-2">Follow us :</p>
                  </div>
                  <div className="flex space-x-4">
                        <Link href="https://www.linkedin.com/company/ai-flavoured" target="_blank"><LinkdinIcon  classNameForBg="bg-aiflavoured dark:bg-none" color={fixedBgWhite ? "#ff0786" : "#ffffff"}/></Link>
                        <Link href="https://x.com/aiflavoured" target="_blank"> <TwitterIcon classNameForBg="bg-aiflavoured dark:bg-none" color={fixedBgWhite ? "#ff0786" : "#ffffff"}/></Link>
                        <Link href="https://www.instagram.com/ai.flavoured/" target="_blank"><Instagram2  size={25} /></Link>
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
                   <li className=""><a href="/privacy-policy">Privacy Policy</a></li>
                   <li className=""><a href="/contact-us">Contact Us</a></li>
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