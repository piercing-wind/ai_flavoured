'use client'
import {useState} from 'react'
import { CgClose } from "react-icons/cg";
import { Button } from '@/components/ui/button';

export const FileSelectorWarning = ({file, resetFileLength}:{file: number,resetFileLength: () => void}) => {
      const [isOpen, setIsOpen] = useState(true); // State to track whether the div is open

      if (!isOpen) { // If the div is not open, don't render anything
        return null;
      }
    
      return (
        
        <div className="absolute backdrop-blur-sm bg-transparent w-full h-full flex items-center justify-center z-50 top-0">
          <div className=" w-1/3 h-1/4 relative border rounded-lg bg bg-slate-100 text-black p-4 text-left"> {/* Add relative positioning to this div */}
            <button
              className="absolute top-0 right-0 m-2" // Position the button at the top right corner of the div
              onClick={() => {setIsOpen(false);resetFileLength();}} // When the button is clicked, set isOpen to false
            >
              <CgClose />
            </button>
            
            <h1 className='text-xl font-semibold'>You&lsquo;ve selected {file} files. Only 2 files are supported on free plan.</h1>
            <p className='my-3 opacity-85'>Only the first 2 files can be uploaded. How would you like to procced?</p>
            <div className=' space-x-3'>
            <Button onClick={() => {setIsOpen(false); resetFileLength();}} size="sm" variant={'default'} className='border border-pink-600 shadow-xl hover:bg-pink-100 font-semibold w-32'>Select Again</Button>
            <Button size="sm" variant={'default'} className='border bg-slate-950 text-white border-black shadow-xl hover:bg-slate-800 font-semibold w-32'>Upload first 2</Button>
            </div>
            <p></p>
          </div>
        </div>
      )
    }