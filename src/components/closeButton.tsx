'use client'
import { MdOutlineClose } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { Button } from "./ui/button";
export const CloseButton = ({ close, className = "" }: { close: (v: boolean) => void; className?: string })=> { 
      return (
            <div className={`${className}`} onClick={() => close(false)}>
                  <MdOutlineClose />
            </div>
      )
} 

export const PurchaseButton = ({children, className = "" }: {children : string, className?: string })=> {
      return (
         <Button 
         onClick={() => {console.log("Purchasing")}}
         variant={'outline'} 
         className={`flex items-center justify-center font-bold ${className}`}>
            {children} <FaAngleRight className="mx-5"/>
         </Button>
      )
}