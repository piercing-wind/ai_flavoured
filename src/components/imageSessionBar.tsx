"use client";
import { DocumentViewer } from "@/components/documentViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileList } from "@/components/fileList";
import { Conversation } from "@/components/conversation";
import { useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { LogoText } from "./logo";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";
import { MultipleFilesPPTXwarn } from "@/components/multipleFilesPPTXwarn";
import { DrawerForPPTXConfiguration } from "./drawerForPPTXConfiguration";
import { generatePresentaionAndStore } from "@/aiflavoured/presentation/generatePresentaionAndStore";
import { presentationSchema } from "@/schemas";
import * as z from "zod"
import { Button } from "./ui/button";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb"
import Styles from "@/app/x/chat/chat.module.css";
import Image from "next/image";
import image from "../../output/image.png"
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { HiOutlineThumbDown } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiDownload } from "react-icons/hi";
import { IoShareSocialOutline } from "react-icons/io5";

import { UserIcon } from "./userIcon";
import Share from "./share";
import Head from "next/head";



export interface FileObject {
   id: String;
   userId: string;
   session: string;
   fileKey: string;   
   fileName: string;
   url: string;
   fileType: string;
   prompt: string;
   generator : string;
   createdAt: Date;
   updatedAt: Date;
}


type UploaData = {
  awsS3: {
    url: string;
    data: {
        fileKey: string;
        fileName: string;
        userId: string;
        url: string;
        session: string;
        fileType: string;
    };
};
}|{
  failure: string;
}

export const ImageSessionBar = ({
  user,
  params,
  userPromptImages,
  chatName,
}: {
  user: any;
  params: { slug: string };
  userPromptImages: FileObject[];
  chatName: string;
}) => {
  const [theme, setTheme] = useState<boolean>(true); // for backgorund colors
  const [openFileManager, setFileManager] = useState<boolean>(false);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
  const [textInputValue, setTextInputValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [like, setLike] = useState<null | boolean>(null);
  const [share, setShare] = useState('');
  const [webUrl, setWebUrl] = useState('');
  const [imagePath, setImagePath] = useState('');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const router = useRouter();
 
  const handleShare = async () => {
   const imageUrl = 'https://aiflavoured.s3.ap-south-1.amazonaws.com/40ced2db-02ed-450a-9d38-960fd758ba86/1718344026827A_courtroom+with+judges+and+lawyers+during+a+hearing.png';
   setImagePath(imageUrl);
   const encodedImageUrl = encodeURIComponent(imageUrl);
   setShare(`${webUrl}/share/${encodedImageUrl}`);
  };
//   console.log(share);
  useEffect(() => {
    
  //todo create a quota database to by bass this condition
    if (user.subscription === "free" && model !== 'gpt-3.5-turbo-0125') {
      router.push(`/pricing`);
    }
  }, [model]);


  const imageRef = useRef<HTMLImageElement>(null);


  useEffect(() => {
   if (isOpen && imageRef.current) {
      const imageElement = imageRef.current as HTMLImageElement; // Cast imageRef.current to HTMLImageElement
      const requestFullscreen = imageElement['requestFullscreen'] ;

      if (requestFullscreen) {
         requestFullscreen.call(imageElement);
      }
   }
}, [isOpen]);

 
  const handleThemeChnage = (theme: boolean) => {
    setTheme(theme);
  };
  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
    if (typeof window !== 'undefined') {
      const { protocol, host } = window.location;
      setWebUrl(`${protocol}//${host}`);
    }
  
  }, []);
  return (
    <>
      <Head>
        <meta property="og:image" content={imagePath} />
        <meta property="og:image:alt" content="Ai FLavoured" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
    {isOpen && (
      <div 
      className="z-50 backdrop-blur-md"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} onClick={() => setIsOpen(false)}>
        <img  src="/image.png" alt="a cat" style={{maxWidth: '100%', maxHeight: '100%'}}  onContextMenu={(e) => e.preventDefault()}/>
      </div>
    )}
    {share !== "" && (
      <Share imagePath={share} />
    )}
      <main className="relative w-full flex-col flex h-full flex-grow">
        <div className="relative flex flex-wrap p-3 items-center justify-between shadow-md">
          <div className="rounded-r-sm flex items-center text-nowrap">
             <b>{model}</b> &nbsp;
          </div>
          <div className="flex flex-wrap items-center justify-center">

            <div className="mx-2">
              <ThemeSwitch detectTheme={handleThemeChnage} />
            </div>
            <div className=" flex items-center ml-4 rounded-md">
              <AiModelSelector
                model={model}
                setModel={setModel}
                />
            </div>
        </div>
      </div>
      
        <div className=" h-full relative flex flex-col w-full justify-center items-center overflow-hidden ">
          <div className="flex w-full h-full justify-center relative overflow-hidden">
            <div className={`w-full p-2  overflow-y-auto ${Styles.chatscroll}`}>
               <div className="flex space-x-4 p-2">
                  <UserIcon userImage={user?.image}/>
                  <div className=" p-2 flex items-center justify-center rounded-md dark:border-neutral-700 shadow-sm shadow-neutral-700">
                  A beautiful cat
                  </div>
               </div>
               <div className=" flex space-x-4 p-2">
                <LogoText className="h-9 w-9"/>
                <div className=" w-[90%] md:w-[70%] relative shadow-md dark:shadow-neutral-600">
                  <img 
                  ref={imageRef}
                  src="/image.png" 
                  alt ="a cat"
                  className=""
                  style={{width: "100%", height: "100%"}}
                  onClick={() => setIsOpen(true)}
                  onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className=" absolute flex text-xl my-2">
                     <span>{like === null ? <IoIosHeartEmpty className=' cursor-pointer' onClick={()=>setLike(true)}/> : (like && <IoIosHeart className="text-red-700 cursor-pointer" onClick={()=>setLike(null)} /> )}</span>
                     <span>{like === null ? <HiOutlineThumbDown  className=' cursor-pointer' onClick={()=>setLike(false)}/> : (!like && <HiThumbDown className='cursor-pointer' onClick={()=>setLike(null)}/>)}</span>
                     <span><HiDownload className="cursor-pointer"/></span>
                     <span><IoShareSocialOutline className="text-pink-600 cursor-pointer" onClick={handleShare}/></span>
                  </div>
                 </div>
               </div>
            </div>
            <div className={` relative h-full border dark:border-neutral-700 rounded-md p-2 transition-all duration-500 ease-in-out ${isCollapsed ? 'w-10 overflow-hidden' : 'w-64'}`}>
              <button onClick={toggleCollapse} className="top-1 left-1 text-2xl">
               {isCollapsed ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarRightCollapseFilled />}
              </button>
              <div className={`${isCollapsed ? "hidden" : ""}`}>
               This is collapsible div
              </div>
           </div>
          </div>
           <div className=" w-[90%] rounded-md shadow-sm shadow-neutral-700 p-2 flex bottom-0 mb-4 mt-1 mx-4">
            <textarea 
              className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto"
              placeholder="Enter your text here to generate images..."
              value={textInputValue}
              style={{
                 // writingMode: "horizontal-tb",
                 direction: "ltr",
              }}
              onChange={(e) => setTextInputValue(e.target.value)}
              />
              <Button variant={'default'} className=" ml-2 rounded-lg h-full shadow-md text-white bg-gray-950 hover:bg-gray-800 dark:text-black dark:bg-slate-100 dark:hover:bg-slate-200 ">
                 Generate
              </Button>
           </div>
         </div>

      </main>
    </>
  );
};
