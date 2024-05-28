'use client'
import {useState} from 'react'
import { CgClose } from "react-icons/cg";
import { Button } from '@/components/ui/button';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { FileObject } from './mainBar';

export const MultipleFilesPPTXwarn = ({
  file,
  setWarnClose,
  getSelectedFiles,
  }:{
  file: FileObject[],
  setWarnClose : () => void, 
  setWarnOpen? : () => void,
  getSelectedFiles : (selectedFiles: FileObject[]) => void,
}) => {
      const [isOpen, setIsOpen] = useState(true); 
      const [userFiles, setUserFiles] = useState<FileObject[]>(file);

      if (!isOpen) { // If the div is not open, don't render anything
        return null;
      }
      const filesLength = file.length;
      // const fileType = file[0].fileType;


      const handleDeleteFile = (index : number) => {
        const newUploadedFiles = [...userFiles];
        newUploadedFiles.splice(index, 1);
        setUserFiles(newUploadedFiles);
        // If there are no more files, close the file manager
        if (newUploadedFiles.length === 0) {
          setIsOpen(false);
          setWarnClose();
        }
      };
    
      return (
        
        <div className="absolute backdrop-blur-sm w-full h-full flex items-center justify-center top-0 z-20">
          <div className=" w-1/3  sm:w-2/3 relative border rounded-lg bg bg-slate-100 text-black p-4 text-left"> {/* Add relative positioning to this div */}
            <button
              className="absolute top-0 right-0 m-2" // Position the button at the top right corner of the div
              onClick={() => {setIsOpen(false);setWarnClose();}} 
            >
              <CgClose />
            </button>
            
            <h1 className='text-xl font-semibold'>There are {filesLength} Documents files.</h1>
            <p className='my-3 opacity-85'>Would you like to generate AI Powerpoint Presentation for {filesLength} Documents togather? Or separately for each? </p>
           <div className='flex flex-col items-center justify-center w-full '>
            <p><b>Files</b></p>
            {userFiles.map((file, index) => (
              <div
                  key={index}
                  className=" flex w-full md:w-1/2 items-center justify-between border border-pink-200 p-2 my-2 rounded-md "
                >
                  <HiOutlineDocumentText className=" text-4xl mx-2" />
                  <div className="flex w-full items-center">
                    <p
                      className=" "
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.fileName}
                    </p>
                  </div>
                  <button
                    className=" float-right"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <IoMdClose className=" text-2xl" />
                  </button>
                </div>
              ))}
              </div>
            {userFiles.length === 1 ? <div className=' space-x-3 mt-6'>
            <Button onClick={() => {setIsOpen(false);setWarnClose();getSelectedFiles(userFiles)}} size="sm" variant={'default'} className='border border-pink-600 shadow-xl hover:bg-pink-100 font-semibold w-36'>Create PPTX</Button>
            </div> : 
            <div className=' space-x-3 mt-6'>
            <Button onClick={() => {setIsOpen(false);setWarnClose();getSelectedFiles(userFiles)}} size="sm" variant={'default'} className='border border-pink-600 shadow-xl hover:bg-pink-100 font-semibold w-36'>Generate Togather</Button>
            <Button onClick={() => {setIsOpen(false);setWarnClose();getSelectedFiles([userFiles[0]])}} size="sm" variant={'default'} className='border bg-slate-950 text-white border-black shadow-xl hover:bg-slate-800 font-semibold w-36'>Generate First One</Button>
            </div>
            }
            <p></p>
          </div>
        </div>
      )
    }