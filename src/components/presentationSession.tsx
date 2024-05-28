"use client";
import React from 'react'
import { DocumentViewer } from "@/components/documentViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileList } from "@/components/fileList";
import { Conversation } from "@/components/conversation";
import { useEffect, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { LogoText } from "./logo";
import {ThemeSwitch} from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";  
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BuySubscription } from "./buySubscription";


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
  chatId: string;
  fileType: string;
  createdAt: Date;
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
  const checkUserSubscription = async () => {
    if (user.subscription === "free") {
      router.push(`/pricing`);
      return;
    }
    setModel("gpt-4-turbo");
  };
  const updateModel = () => {
    setModel("gpt-3.5-turbo-0125");
  }

  useEffect(() => {
  const pdfFile = userFiles.find(item => item.fileType === 'application/pdf');
  if(pdfFile){
    setPPTXAsPDFUrl(pdfFile.url);
  }  
  const pptxFile = userFiles.find(item => item.fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  if(pptxFile){
    const fileName = capitalizeFirstWord(pptxFile.fileName.replace(/_/g, ' '));
    setFileName(fileName);
    setPPTXUrl(pptxFile.url);
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
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
  },[]);
  return (
    <>
    <main className="relative w-full flex-col flex h-full">
     {subscriptionRequired && <BuySubscription closeSubscriptionreq={closeSubscriptionreq}/>}
      <div className="flex p-3 items-center justify-between border-b border-gray-400 shadow-md">
        <Button onClick={() => {handleDownload()} } size="sm" variant={'default'} className=' h-8 bg-slate-950 text-white shadow-xl  hover:bg-slate-800 dark:hover:bg-pink-600 dark:bg-pink-500 font-semibold'>Download &nbsp; <IoCloudDownloadOutline /></Button>      
        <div title={fileName} className="text-gradient w-96 overflow-ellipsis flex items-center justify-center text-xl font-bold">{fileName}</div>        
         <div className="flex items-center justify-end">
        <div className="mx-2">
          <ThemeSwitch  detectTheme={handleThemeChnage}/>
        </div>
        <div className=" flex items-center ml-4 rounded-md">
          <AiModelSelector model={model} checkUserSubscription={checkUserSubscription} updateModel={updateModel} />
       </div>
        </div>
      </div>

      <div className="justify-between w-[99.9%]">
        <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={75}>
                  <div className="w-full h-[calc(100vh-5rem)] overflow-y-auto ">
                    <DocumentViewer docUrl={pptxAsPDF} />
                  </div>
                </ResizablePanel>
        
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25}>
                  <div className="converstaion flex rounded-sm h-[calc(100vh-5rem)]">
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