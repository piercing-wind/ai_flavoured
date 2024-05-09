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
import {ThemeSwitch} from "@/components/ThemeSwitch";
import { Button } from "@/components/button";
import { AiModelSelector } from "@/components/aiModelSelector";
import { useRouter } from "next/navigation";


export const MainBar = ({
  user,
  params,
  userFiles,
  chatName,
}: {

  user: any;
  params: { slug: string };
  userFiles: any;
  chatName: string;
}) => {
  const [pdf, setPdf] = useState("");
  const [theme, setTheme] = useState<boolean>(true);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
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

  const handleSelectChange = (selectedUrl: string) => {
    setPdf(selectedUrl);
  };
  const handleThemeChnage = (theme : boolean) => {
    setTheme(theme);
  };
  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
  },[]);
  return (
    <main className="w-full flex-col flex h-full ">
      <div className="flex items-center justify-between border-b border-gray-400 shadow-md z-30">
        <div className="p-4 rounded-r-sm  w-full flex items-center">
          <MdFolderZip className="text-2xl" /> &nbsp; <b>{chatName}</b> &nbsp;
          <FileList userFiles={userFiles} handleChange={handleSelectChange} />
        </div>
        <div className="">
          <Button className=" text-nowrap h-[2.09rem] " size="sm">
            Create Presentation
            </Button>
        </div>
        <div className="mx-2">
          <ThemeSwitch  detectTheme={handleThemeChnage}/>
        </div>
        <div className=" flex items-center mx-4 rounded-md">
          <AiModelSelector model={model} checkUserSubscription={checkUserSubscription} updateModel={updateModel} />
       </div>
      </div>

      <div className="flex flex-grow justify-between">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex-1 xl:flex w-6/12" defaultSize={1}>
            <div className="w-full h-[calc(100vh-5rem)] overflow-auto ">
              <DocumentViewer docUrl={pdf} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />
          <ResizablePanel className="flex-1 px-2 " defaultSize={1}>
            <div className="converstaion flex rounded-sm h-[calc(100vh-5rem)]">
              <Conversation isLightMode={theme} chatSession={params} user={user} aiModel={model} userFiles={userFiles} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};
