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

export const PresentationSession = ({
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
  const [pptx, setPPTX] = useState("");
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

  const handleThemeChnage = (theme : boolean) => {
    setTheme(theme);
  };

  useEffect(() => {
    const htmlClassList = document.documentElement.classList;
    setTheme(htmlClassList.contains("light"));
  },[]);
  return (
    <>
    <main className="relative w-full flex-col flex h-full ">
      <div className="flex p-3 items-center justify-end border-b border-gray-400 shadow-md">
        <div className="mx-2">
          <ThemeSwitch  detectTheme={handleThemeChnage}/>
        </div>
        <div className=" flex items-center ml-4 rounded-md">
          <AiModelSelector model={model} checkUserSubscription={checkUserSubscription} updateModel={updateModel} />
       </div>
      </div>

      <div className="flex flex-grow justify-between">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="flex-1 xl:flex w-6/12" defaultSize={1}>
            <div className="w-full h-[calc(100vh-5rem)] overflow-auto ">
              <DocumentViewer docUrl={pptx} />
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
    </>
  );
};
