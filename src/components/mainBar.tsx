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
import { LogoText } from "./logo";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/button";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";
import { MultipleFilesPPTXwarn } from "@/components/multipleFilesPPTXwarn";
import { DrawerForPPTXConfiguration } from "./drawerForPPTXConfiguration";
import { generatePresentaionAndStore } from "@/aiflavoured/presentation/generatePresentaionAndStore";
import { presentationSchema } from "@/schemas";
import * as z from "zod"


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

export const MainBar = ({
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
  const [pdf, setPdf] = useState("");
  const [theme, setTheme] = useState<boolean>(true);
  const [openFileManager, setFileManager] = useState<boolean>(false);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
  const [openPPTXConfig, setOpenPPTXConfig] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
 
  const router = useRouter();
 

  useEffect(() => {
    
  //todo create a quota database to by bass this condition
    if (user.subscription === "free" && model !== 'gpt-3.5-turbo-0125') {
      router.push(`/pricing`);
    }
  }, [model]);


  const handleSelectChange = (selectedUrl: string) => {
    setPdf(selectedUrl);
  };
  const handleThemeChnage = (theme: boolean) => {
    setTheme(theme);
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
    console.log(data);
    const presentationUrl = await generatePresentaionAndStore(data);  
    if(presentationUrl){
      // router.push(presentationUrl);
    }
  }
  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
  }, []);
  return (
    <>
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
                  isLightMode={theme}
                  chatSession={params}
                  user={user}
                  aiModel={model}
                  userFiles={userFiles}
                  api = "chat"
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
};
