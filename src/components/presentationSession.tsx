"use client";
import React, { useRef } from 'react'
import { DocumentViewer } from "@/components/documentViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Conversation } from "@/components/conversation";
import { useEffect, useState } from "react";
import {ThemeSwitch} from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";  
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BuySubscription } from "./buySubscription";
import { ThemeChange } from './themeChange';
import { MdClose } from "react-icons/md";
import { getPresentationData } from '@/actions/presentationData/presentationData';
import { themeChange } from '@/aiflavoured/presentation/themes/themeChange';
import { PresentationData } from '@/aiflavoured/presentation/themes/presentation';
import { PresentationImage } from '@/aiflavoured/presentation/generatePresentaionAndStore';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Progress } from "@/components/ui/progress"
import { displayThemes, displayThemes1,displayThemes2,displayThemes3 } from "@/aiflavoured/presentation/displayThemes";



function capitalizeFirstWord(str : string) {
  const words = str.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}

interface FileObject {
  id: number;
  userId: string;
  fileKey: string;
  fileName: string;
  url: string;
  session: string;
  fileType: string;
  createdAt: Date;
  generator: string;
  theme: string | null;
}

export const PresentationSession = React.memo(({
  user,
  params,
  userFiles,
  chatName,
}: {

  user: any;
  params: { slug: string };
  userFiles: FileObject[];
  chatName: string;
}) => {
  const [pptxAsPDF, setPPTXAsPDFUrl] = useState("");
  const [theme, setTheme] = useState<boolean>(true);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
  const [fileName, setFileName] = useState("");
  const [pptxUrl, setPPTXUrl] = useState("");
  const [subscriptionRequired, setSubscriptionRequired] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState<number>(1)
  const [startProgress, setStartProgress] = useState<boolean>(false)
  const { toast } = useToast();
  
console.log(fileName);
  const [themes, setThemes] = useState(displayThemes);
  const [currentpptxTheme, setCurrentTheme] = useState<string>('/displayThemes/ppPartyTheme.svg');
  const [apply, setApply] = useState<boolean>(false);
  const [themeFunction, setThemeFunction] = useState('ppPartyThemePresentation');
  const [variant , setVariant] = useState('green')

  const  changepptxTheme =async ()=>{
     setStartProgress(true);
     const prevTheme = userFiles.filter((item)=> item.theme === themeFunction)
     if (prevTheme.length > 0) {
        const pdfFile = prevTheme.find((item) => item.fileType === 'application/pdf' && item.generator === 'aiflavoured');
        if (pdfFile) {
           setPPTXAsPDFUrl(pdfFile.url);
        }
        const pptxFile = prevTheme.find((item) => item.fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && item.generator === 'aiflavoured');
        if (pptxFile) {
           const fileName = capitalizeFirstWord(pptxFile.fileName.replace(/_/g, ' '));
           setFileName(fileName);
           setPPTXUrl(pptxFile.url);
        }
        toast({
         title: "Theme Changed Successfully",
         description: "Your presentation is ready to download with updated theme 😀",
         }) 
        setStartProgress(false);
        setApply(false);
        return;
     }
     const [res] = await getPresentationData(params.slug);
     const pptx : PresentationData = {author : res.author, title : res.title, pptxData : res.pptxData,imageSearch: res.imageSearch, waterMark : res.waterMark, variant: res.variant}; 
     const photosWithLink : PresentationImage = res.presentationImage 
   
     try{
     const changeTheme = await themeChange(pptx, photosWithLink, themeFunction, variant, params.slug, user.id);
     if(changeTheme){
      setPPTXAsPDFUrl(changeTheme.pdfUrl);
      setPPTXUrl(changeTheme.pptxUrl);
      toast({
         title: "Theme Changed Successfully",
         description: "Your presentation is ready to download with updated theme 😀",
      })   
      }
      setStartProgress(false);
      setApply(false);
      }catch(e){
        if(e instanceof Error){
           toast({
              variant: "destructive",
              title: "Unable to Change the theme please try again!",
              description: e.message,
            })  
         }
      }
   } 

  //validation with quota
  const checkUserSubscription = async () => {
    if (user.subscription === "free") {
      router.push(`/pricing`);
      return;
    }
    setModel("gpt-4-turbo");
  };

  useEffect(() => {
  const pdfFiles = userFiles.filter((item) => item.fileType === 'application/pdf' && item.generator === 'aiflavoured')
  if (pdfFiles.length > 0) {
   const pptxAsPDF = pdfFiles.reduce((latestFile, currentFile) => {
     return new Date(latestFile.createdAt) > new Date(currentFile.createdAt) ? latestFile : currentFile;
   });
   if (pptxAsPDF) {
     setPPTXAsPDFUrl(pptxAsPDF.url);
   }
  }

 const pptFiles = userFiles.filter((item) => item.fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && item.generator === 'aiflavoured');
 if (pptFiles.length > 0) {
    const pptxFile = pptFiles.reduce((latestFile, currentFile) => {
      return new Date(latestFile.createdAt) > new Date(currentFile.createdAt) ? latestFile : currentFile;
    });
    if (pptxFile) {
      const fileName = capitalizeFirstWord(pptxFile.fileName.replace(/_/g, ' '));
      setFileName(fileName);
      setPPTXUrl(pptxFile.url);
    }
  }
 
  },[])

  const handleThemeChnage = (theme : boolean) => {
    setTheme(theme);
  };

  const closeSubscriptionreq = () => {
    setSubscriptionRequired(false);
  }

  const handleDownload = () => {
    if (user.subscription === "free") {
      setSubscriptionRequired(true);
      return;
    }else{
    const link = document.createElement('a');
    link.href = pptxUrl;
    link.download = fileName ; // Optional: Set the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  }

  useEffect(() => {
   if(themeFunction === 'facetThemePresentation' || themeFunction === 'darkThemeMoonPresentation' || themeFunction === 'ppPartyThemePresentation'){  
      setThemes(displayThemes1);
   }else if(themeFunction === 'minimalistSalePitchThemePresentation'){
      setThemes(displayThemes2); 
   }else{
      setThemes(displayThemes3);
   }
  },[themeFunction])


  useEffect(() => {
   let interval: NodeJS.Timeout | undefined;
   if (startProgress) {
     interval = setInterval(() => {
       setProgress((prevProgress) => (prevProgress < 95 ? prevProgress + 1 : prevProgress));
     }, 80);
   }
   return () => {
     if (interval) {
       clearInterval(interval);
     }
   };
 }, [startProgress]);

  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
  },[]);
  const applyRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
       function handleClickOutside(event : MouseEvent) {
           if (applyRef.current && !applyRef.current.contains(event.target as Node)) {
               setApply(false);
           }
       }

       // Bind the event listener
       document.addEventListener("mousedown", handleClickOutside);
       return () => {
           // Unbind the event listener on clean up
           document.removeEventListener("mousedown", handleClickOutside);
       };
   }, []);
  return (
    <>
      <Toaster />
    <main className="w-full flex-col flex h-full">
     {subscriptionRequired && <BuySubscription closeSubscriptionreq={closeSubscriptionreq}/>}
      <div className="flex p-3 items-center justify-between shadow-md dark:shadow-md dark:shadow-neutral-700">
         <div className='flex flex-wrap items-center justify-start space-x-4'>
          <Button onClick={() => {handleDownload()} } size="sm" variant={'default'} className=' h-8 bg-slate-950 text-white shadow-xl  hover:bg-slate-800 dark:hover:bg-pink-600 dark:bg-pink-500 font-semibold'>Download &nbsp; <IoCloudDownloadOutline /></Button> 
          <ThemeChange displayThemes={themes} setCurrentTheme={setCurrentTheme} setApply={setApply} setThemeFunction={setThemeFunction} setVariant={setVariant}/> 
         {apply &&
          <div ref={applyRef} className="absolute z-50 flex top-14 backdrop-blur-sm rounded-md items-end">
               <MdClose className='absolute top-2 right-2 cursor-pointer' onClick={()=>setApply(false)}/>
               <div className="flex items-center justify-center m-2 h-16 w-28 border border-gray-500 rounded focus:outline-none cursor-pointer "
                style={{
                   backgroundImage: `url(${currentpptxTheme})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                  }}
                  >   
              </div>
              <Button onClick={changepptxTheme} variant={'default'} size='sm' className='shadow-md m-2 bg-pink-500 hover:bg-pink-600 h-6 backdrop-blur-xl font-semibold'>
                 Apply
              </Button>
            </div>
            }
           <div title={fileName} className="text-gradient w-96 overflow-ellipsis flex items-center justify-center text-xl font-bold">{fileName}</div>        
         </div>
         <div className="flex flex-wrap items-center justify-end">
          <div className="mx-2">
            <ThemeSwitch  detectTheme={handleThemeChnage}/>
          </div>
          <div className=" flex items-center ml-4 rounded-md">
            <AiModelSelector model={model} subscription={user.subscription} setModel={setModel} />
         </div>
        </div>
      </div>

      <div className="justify-between w-[99.9%]">
        <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={75}>
                  <div className="w-full">
                     {startProgress &&
                     <div className='absolute backdrop-blur-md h-[115%] w-full flex items-center justify-center'>
                        <div className='p-4 flex flex-col items-center justify-center bg-pink-100 text-neutral-900 rounded-md shadow-lg'>
                           <p className='m-4'>Please Wait we are changing the theme 🥸</p>
                           <Progress value={progress} className='h-2'  />
                        </div>
                     </div>
                     }
                    <DocumentViewer docUrl={pptxAsPDF} />
                  </div>
                </ResizablePanel>
        
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25}>
                  <div className="converstaion flex rounded-sm h-[calc(100vh-3.5rem)]">
                    <Conversation isLightMode={theme} chatSession={params} user={user} aiModel={model} userFiles={userFiles} api={'presentationchat'} />                  
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
      </div>
    </main>
    </>
  );
});

PresentationSession.displayName = "PresentationSession";