'use client'
import Link from "next/link"
import { CloseButton } from "./closeButton"
import { useState } from "react";
import { RingLoader } from "react-spinners";

export const Checkout = ({link, text ,close}: {link:string,text:string , close:(v:boolean)=>void}) => {
   const [loading, setLoading] = useState(false);
   return (
      <div className="w-full h-screen overflow-hidden flex items-center justify-center backdrop-blur-sm z-50 fixed top-0 left-0">
         <div className="w-[95%] lg:w-[75%] 2xl:w-[50%] mx-auto h-[20rem] border rounded-md p-5 relative flex flex-col items-center justify-center"
         style={{boxShadow: '0 0 10px 2px rgba(0,0,0,0.1)'}}
         >
            <CloseButton close={close}  className="top-4 right-4 absolute cursor-pointer"/>

            <h1 className="text-lg font-semibold absolute top-5 left-5">{text}</h1>
            <Link href={link} onClick={()=>setLoading(true)} target="_blank" className={`mx-auto w-32 border p-2 rounded-md text-center bg-gradient-to-tr text-lg from-red-100 via-purple-100 to-pink-100 hover:from-red-300 hover:via-purple-300 hover:to-pink-300 hover:text-white ${loading && 'hidden'}`}
            >Proceed</Link>
            {loading && <div className="flex items-center"><p>Please Do not Refresh This Page we are Proceeding your Payment!</p><RingLoader  color="#ff0786"  loading  size={25}/></div>}
         </div>
      </div>
   )
}