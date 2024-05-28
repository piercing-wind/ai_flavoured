"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoCheckmarkSharp, IoChevronDown } from "react-icons/io5";


import { useEffect, useState } from "react";

export const FileList = ({
  userFiles,
  handleChange,
}: {
  userFiles: any;
  handleChange: (url: string) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState(
    userFiles[0] ? userFiles[0]?.fileName : "No Files here!"
  );
  const handleClick = (url: string, fileName: string) => {
    handleChange(url);
    setSelectedFile(fileName);
  };
  useEffect(() => {
    if (userFiles[0]) {
      handleClick(userFiles[0].url, userFiles[0].fileName);
    }
  }, []);

  return (
    <div className="p-2">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          
          <div className=" flex justify-between  items-center shadow-sm rounded-md w-52 p-2 h-8 text-overoverflow-hidden overflow-ellipsis border border-slate-300 ">
            <div className="overflow-hidden overflow-ellipsis">
              {selectedFile}
            </div>
            <span className="rounded-full h-6 flex items-center justify-center p-[0.5rem]" style={{backgroundImage : 'linear-gradient(45deg, rgba(255, 7, 131, 0.5), rgba(147, 0, 192, 0.5))'}}>
            {userFiles.length}
            </span>
            <Button aria-label="Zoom" className="p-0">
              &nbsp;
              <IoChevronDown />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent >
          {userFiles.map((file: any, index: number) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleClick(file.url, file.fileName)}
            >
        <div className="bg-transparent">
              <div className="overflow-hidden overflow-ellipsis flex justify-between w-48">
                <span className="w-42 overflow-hidden overflow-ellipsis" title={file.fileName}>
                  {file.fileName}
                </span>
                <span>

                {file.fileName === selectedFile && <IoCheckmarkSharp  className="text-xl text-green-700"/>}
                </span>
              </div>
        </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <select onChange={handleChange}></select> */}
    </div>
  );
};
