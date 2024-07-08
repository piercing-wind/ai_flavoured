'use client'
import {useState} from 'react'
import { CgClose } from "react-icons/cg";
import { Button } from '@/components/ui/button';
import { PurchaseButton } from './closeButton';

export const FileSelectorWarning = ({file,selectAgain, uploadFirstTwo,setPricing, setFileLengthError}:{file: number,selectAgain : () => void, uploadFirstTwo : () => void,setPricing:(v:boolean)=> void,setFileLengthError : (value: boolean) => void}) => {

      return (
        <div className="absolute backdrop-blur-sm bg-transparent w-full h-full flex items-center justify-center z-50 top-0">
          <div className=" w-1/3 sm:w-2/3 relative border rounded-lg bg bg-slate-100 text-black p-4 text-left"> {/* Add relative positioning to this div */}
            <button
              className="absolute top-0 right-0 m-2" // Position the button at the top right corner of the div
              onClick={() => {setFileLengthError(false);uploadFirstTwo();}} // When the button is clicked, set isOpen to false
            >
              <CgClose />
            </button>
            
            <h1 className='text-xl font-semibold'>You&lsquo;ve selected {file} files. Only 2 files are supported on free plan.</h1>
            <p className='my-3 opacity-85'>Only the first 2 files can be uploaded. How would you like to procced?</p>
            <div className=' space-x-3'>
            <Button onClick={() => {setFileLengthError(false);selectAgain();}} size="sm" variant={'default'} className='border border-pink-600 shadow-xl hover:bg-pink-100 font-semibold w-32'>Select Again</Button>
            <Button onClick={() => {setFileLengthError(false);uploadFirstTwo();} } size="sm" variant={'default'} className='border bg-slate-950 text-white border-black shadow-xl hover:bg-slate-800 font-semibold w-32'>Upload first 2</Button>
            <button onClick={()=>{setPricing(true); setFileLengthError(false); selectAgain();}}>
            <PurchaseButton className='text-md ml-3 p-4  text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'>
              Upgrade to premium
            </PurchaseButton>
            </button>
            </div>
            <p></p>
          </div>
        </div>
      )
    }