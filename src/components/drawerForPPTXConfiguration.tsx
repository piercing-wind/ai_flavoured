import Styles from "@/app/chat/chat.module.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoAddSharp, IoCheckmarkSharp, IoChevronDown } from "react-icons/io5";
import { PiListBullets, PiTextAlignCenterThin } from "react-icons/pi";
import { Divider } from "./divider";
import { IoMdClose } from "react-icons/io";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const DrawerForPPTXConfiguration = ({
  setOpenPPTXConfigOff,
  generatePPTX, 
  openPptxConfig,
  user
}:{
  setOpenPPTXConfigOff : ()=>void, 
  openPptxConfig : boolean, 
  generatePPTX :(slides : number, wordsAmount : string, audience : string, imageSearch : string, aiModel : string ) => void,
  user : any
}) => {
  const [slides, setSlides] = useState(15);
  const [wordsAmount, setWordsAmount] = useState<string>('Regular');
  const [audience, setAudience] = useState<string>('General');
  const [imageSearch, setImageSearch] = useState<string>('Google Search');
  const [aiModel, setAiModel] = useState<string>('gpt-4o');
  const audienceData = ['General', 'Students', 'Professionals', 'Experts', 'Bussiness', 'Teacher', 'Employee', 'Colleague']
  const router = useRouter();
  const handleClose = () => {
    setOpenPPTXConfigOff();
  };
  console.log(user)
  const handleSlides = (slide: number) => {
    if(user.subscription === 'free' && slide > 15){
      router.push(`/pricing`);
      return;
    }
    setSlides(slide);
  };
  const handleWordAmount = (word: string) => {
      setWordsAmount(word);
    };
    
  const handleAudience = (audiences: string) => {
      setAudience(audiences);
  };
  const handleImageSearch = (imageSearchs: string) => {
    if(user.subscription === 'free' && imageSearchs !== 'Google Search'){
      router.push(`/pricing`);
      return;
    }
      setImageSearch(imageSearchs);
  };
  const handleGenerate=async ()=>{
    await generatePPTX(slides, wordsAmount, audience, imageSearch , aiModel);
  console.log('Generate PPTX');
  }
  return (
    <div
      className={`absolute backdrop-blur-xl text-gray-800 dark:text-gray-200 w-full h-80 flex flex-col items-center top-[4.6rem] z-20 transition-transform duration-500 ease-out transform ${
        openPptxConfig ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        className="absolute top-1 right-0 m-5 rounded-full"
        onClick={handleClose}
      >
        <IoMdClose />
      </button>
      <div className="absolute top-0 right-10 my-4 mx-6 ">
          <button title="GPT-4o Omni" className={`relative w-32 px-2 py-2 h-8 flex items-center justify-between ${Styles.neonButton}`}>
            <svg
              width="2500"
              height="2500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              className="h-6 w-6 dark:text-pink-500"
              viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"
            >
              <text x="-9999" y="-9999">
                ChatGPT
              </text>
              <path
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                fill="currentColor"
              />
            </svg>
      GPT - 4o
          </button>
      </div> 

      <div className="absolute w-3/4 flex flex-col bottom-0">
      <div className="bg-slate-100 dark:bg-neutral-950 p-4 rounded-md">
      <div className="flex space-x-4 items-center m-2">
        <div className="h-10 w-16 border-dashed border border-gray-500 rounded flex items-center justify-center"><IoAddSharp /></div>
        <div>
         <p><b>Generate New AI Presentation</b></p>
         <p className="text-sm">Create PPTX presentations powered by the world&apos;s fastest and smartest AI, GPT-4o &#40; Omni &#41;.</p>
        </div>
      </div>
        <Divider className='my-1 w-full '/>
        <div className=" flex justify-center rounded p-2 px-10 ">
        {/* for slides */}
        <div className="slidesDropdown">
        <p className="mx-4 text-center">
        Slides / Pages
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-600 w-32 px-2 rounded-md h-8">
              {slides} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-3xl bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={() => handleSlides(7)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>7</p>
              {slides === 7 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSlides(10)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>10</p>
              {slides === 10 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSlides(15)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>15</p>
                  {slides === 15 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSlides(20)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p className="shiny-text">20</p>
              {slides === 20 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSlides(25)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
            <p className="shiny-text">25</p>
            {slides === 25 && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {/* for word amounts */}
        <div className="wordAmountsropDown">
        <p className="mx-4 text-center">
        Wording
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-600 w-32 px-2 rounded-md h-8">
              {wordsAmount} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-3xl bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={() => handleWordAmount('Bullets')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Bullets</p> <PiListBullets/>
              {wordsAmount === 'Bullets' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleWordAmount('Concise')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Concise</p> <PiTextAlignCenterThin />
                  {wordsAmount === 'Concise' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleWordAmount('Regular')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Regular</p> <CiTextAlignLeft />
                  {wordsAmount === 'Regular' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleWordAmount('Detailed')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-28 px-2 h-8">
              <p>Detailed</p> <CgDetailsMore />
             {wordsAmount === 'Detailed' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {/* Audience drop down */}
        <div className="audienceDropDown">
        <p className="mx-4 text-center">
        Audience
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-600 w-32 px-2 rounded-md h-8">
              {audience} <IoChevronDown />
           </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`h-52 overflow-auto backdrop-blur-3xl bg-neutral-100 dark:bg-neutral-900 rounded ${Styles.chatscroll}`}>
            {audienceData.map((audienceList, index) => (
            <DropdownMenuItem key={index} onClick={() => handleAudience(audienceList)}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-400 w-36 px-2 h-8">
              <p>{audienceList}</p> 
                  <span>
                {audienceList === audience && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
                </span>
            </div>                 
            </DropdownMenuItem>
            ))}
         
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      {/* Image Dropdown */}
      <div className="imagedropdown">
        <p className="mx-4 text-center">
        Images Search
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>   
           <div className=" flex items-center justify-between m-2 border border-gray-600 w-36 px-2 rounded-md h-8">
              {imageSearch} <IoChevronDown />
           </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-3xl bg-neutral-100 dark:bg-neutral-900 rounded">
            <DropdownMenuItem onClick={() => handleImageSearch('Google Search')}>
            <div className=" flex items-center justify-between border-b border-gray-400 w-40 px-2 h-8">
              <p>Google Search</p> 
              <span>
                {imageSearch === 'Simple Search' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
                </span>
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleImageSearch('AI Search')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-300 w-40 px-2 h-8 text-nowrap">
              <p className=" font-semibold shiny-text">AI Search </p> 
              &nbsp;
              <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border text-sm justify-end">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            {imageSearch === 'AI Search' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
        
            </div>                 
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleImageSearch('AI Generated')}>
            <div className=" flex items-center justify-between m-2 border-b border-gray-300 w-40 px-2 h-8 text-nowrap">
            <p className=" font-semibold shiny-text">AI Generated</p> 
              &nbsp;
              <div className="bg-gradient-to-br from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border text-sm justify-end">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            {imageSearch === 'AI Generated' && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
            </div>                 
            </DropdownMenuItem>
         
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

      </div>          
      </div>  
      <div className="w-28 my-2 flex justify-end self-end">
      <Button onClick={()=>handleGenerate()} variant='outline' className=" border-pink-300 bg-red-100 dark:text-black hover:bg-neutral-200 text-base h-8 w-28 px-4" >
      Create PPTX
      </Button>
      </div>  
      </div>       
    </div>
  );
};
