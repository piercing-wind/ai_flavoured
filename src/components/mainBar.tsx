"use client";
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
import { ModeToggle } from "@/components/themeModeChange";
import { Button } from "@/components/button";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";
import { MultipleFilesPPTXwarn } from "@/components/multipleFilesPPTXwarn";
import { DrawerForPPTXConfiguration } from "./drawerForPPTXConfiguration";
import { generatePresentaionAndStore } from "@/aiflavoured/presentation/generatePresentaionAndStore";
import { presentationSchema } from "../schemas";
import * as z from "zod"
import { updateAiPresentationQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { Pricing } from "./pricing";
import { Quota } from "@/app/(x)/chat/[slug]/page";
import { ServerUserProfile } from "./header/links/serverUserProfile";

export interface FileObject {
  id: number;
  userId: string;
  fileKey: string;
  fileName: string;
  url: string;
  session: string;
  fileType: string;
  createdAt: Date;
  generator : string;
}


export const MainBar = ({
  user,
  params,
  userFiles,
  chatName,
  quota
}: {
  user: any;
  params: { slug: string };
  userFiles: FileObject[];
  chatName: string;
  quota: Quota;
}) => {
  const [remainingQuota, setRemainingQuota] = useState<number>(quota.aipresentation);
  const [pricing, setPricing] = useState<boolean>(false);
  const {toast} = useToast();
  const [pdf, setPdf] = useState("");
  const [openFileManager, setFileManager] = useState<boolean>(false);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
  const [openPPTXConfig, setOpenPPTXConfig] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
 
  const router = useRouter();
 

  useEffect(() => {
   if (user.subscription === "free" && model !== 'gpt-3.5-turbo-0125') {
      setPricing(true);
      setModel('gpt-3.5-turbo-0125');
      toast({
         variant: "destructive",
         title: "You need to upgrade to Premium to use this model",
         description: "Please upgrade to Premium to use this model",
      })
   }
  }, [model, user.subscription, toast]);


  const handleSelectChange = (selectedUrl: string) => {
    setPdf(selectedUrl);
  };
  const setWarningOn = () => {
    if(userFiles.length === 1){
      setOpenPPTXConfig(true);
      setSelectedFiles(userFiles);
      return;
    }
    setFileManager(true);
  };
  const setOpenPPTXConfigOff = () => {
    setOpenPPTXConfig(false);
  }
  const setWarningOff = () => {
    setFileManager(false);
    setOpenPPTXConfig(true);
  };

  const getSelectedFiles = async (selectedFiles: FileObject[], ) => {
    setSelectedFiles(selectedFiles);
  };
  
  const generatePPTX = async (
    slides : number, 
    wordsAmount : string, 
    audience : string, 
    imageSearch : string, 
    ppmodel: string,
    variant : string,
    themeFunction : string,
    textInputValue :  string
  ) => {
   try{
    const waterMark = user.subscription === "free" ? true : false;
    const data : z.infer<typeof presentationSchema> = {
      selectedFiles,
      user, 
      slides, 
      wordsAmount, 
      audience, 
      imageSearch, 
      ppmodel,
      waterMark,
      variant: variant,
      textInputValue: textInputValue,
      themeFunction: themeFunction

    }
    if(remainingQuota <= 0){setPricing(true); throw new Error("Presentation Can't be created")}
    if(slides > 15 && user.subscription === 'free' ) {setPricing(true); throw new Error("Slides can't be more than 15 on free plan.");}
    if(imageSearch !== "Google Search" && user.subscription === 'free') {setPricing(true); throw new Error("Only Google Search is available in free plan");}

    const presentationUrl = await generatePresentaionAndStore(data);  
    if(presentationUrl){
      const newQuota = remainingQuota - 1;
      setRemainingQuota(newQuota);
      await updateAiPresentationQuota(user.id, newQuota);
      router.push(presentationUrl);
    } 
   }catch(e){ 
      const error = e as Error;
      toast({
         variant: "destructive",
         title: "You have reached your Quota limit :(",
         description: `${error.message}, Upgrade your plan to create more presentations`,
      }) 
   }
  }

  return (
    <>
    <Toaster />
    {pricing && <Pricing setPricing={setPricing} />}
      <main className="relative w-full flex-col flex h-full ">
        {openFileManager && (
          <MultipleFilesPPTXwarn
            file={userFiles}
            setWarnClose={setWarningOff}
            getSelectedFiles={getSelectedFiles}
          />
        )}
        <div className="relative flex flex-wrap p-3 items-center justify-between border-b border-gray-400 shadow-md">
          <div className="rounded-r-sm flex items-center text-nowrap">
            <MdFolderZip className="text-2xl" /> &nbsp; <b>{chatName}</b> &nbsp;
            <FileList userFiles={userFiles} handleChange={handleSelectChange} />
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <div className="">
              <Button
                onClick={() => {
                  setWarningOn();
                }}
                className=" text-nowrap h-[2rem] "
                size="sm"
                >
                Create Presentation
              </Button>
            </div>
            <ServerUserProfile user={user} />
            <div className="mx-2">
              <ModeToggle />
            </div>
            <div className=" flex items-center ml-4 rounded-md">
              <AiModelSelector
                model={model}
                setModel={setModel}
                subscription={user.subscription}
                />
            </div>
        </div>
       <div className="absolute w-full top-full">
       { openPPTXConfig && <DrawerForPPTXConfiguration 
                            user={user} 
                            setOpenPPTXConfigOff={setOpenPPTXConfigOff} 
                            openPptxConfig={openPPTXConfig} 
                            generatePPTX={generatePPTX}
                            
                            />}
        </div> 
        </div>
        <div className="flex flex-grow justify-between">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="flex-1 xl:flex w-6/12" defaultSize={1}>
              <div className="w-full">
                <DocumentViewer docUrl={pdf} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            <ResizablePanel className="flex-1 px-2 " defaultSize={1}>
              <div className="converstaion flex rounded-sm h-[calc(100vh-4.5rem)]">
                <Conversation
                  chatSession={params}
                  user={user}
                  aiModel={model}
                  userFiles={userFiles}
                  api = "chat"
                  chatModelQuota={quota}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
};
