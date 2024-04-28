"use client";
import { DocumentViewer } from "@/components/documentViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FileList } from "@/components/fileList";
import { Conversation } from "@/components/conversation";
import { useState } from "react";
import { MdFolderZip } from "react-icons/md";

export const MainBar = ({
  userId,
  params,
  filesName,
  chatName,
}: {
  userId: string;
  params: { slug: string };
  filesName: any;
  chatName: string;
}) => {
  const [pdf, setPdf] = useState("");

  const handleSelectChange = (selectedUrl: string) => {
    setPdf(selectedUrl);
  };

  return (
    <main className="w-full flex-col flex h-full ">
      <div className="flex items-center justify-between">
        <div className="p-4 rounded-r-sm  w-full flex items-center">
          <MdFolderZip className="text-2xl" /> &nbsp; <b>{chatName}</b> &nbsp;
          <FileList filesName={filesName} handleChange={handleSelectChange} />
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 items-center justify-center rounded-full flex backdrop-blur-3xl overflow-visible" style={{backgroundImage : 'linear-gradient(45deg, rgba(255, 7, 131, 0.5), rgba(147, 0, 192, 0.5))'}}>
            <img
              src="/logo3.svg"
              alt=""
              className=" w-10 h-10 filter contrast-150 saturate-150 rounded-full "
            />
          </div>
          <p className="flex items-center text-nowrap p-4">GPT-3.5</p>
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
          <ResizablePanel className="flex-1 xl:flex m-2" defaultSize={1}>
            <div className="converstaion flex rounded-sm h-full">
              <Conversation chatSession={params} user={userId} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};
