"use client";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { usePathname } from 'next/navigation'

export default function NotFound() {
   const pathname = usePathname()
   const [goBackUrl] = useState("/" + pathname.split("/")[1] || "/");
   const [url, setUrl] = useState("/heartbroken-dog-meme.png");
   
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
         <h1 className="text-xl py-4 px-2">Wrong Path : aiflavoured.com{pathname}</h1>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center border px-1 sm:px-5 rounded-xl w-[95%] sm:w-[80%]">
        <div className="text-3xl lg:text-5xl font-bold w-[98%] sm:w-[75%] lg:w-[50%]">
          <h1 className="py-2">
            <span
              className="p-1 bg-transparent"
              style={{
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                color: "pink",
              }}
            >
              404!
            </span>
          </h1>
          <h1>
            <span
              className="p-1 bg-transparent"
              style={{
                textShadow:
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                color: "#ff9dcbe4",
              }}
            >
              This page was not found, but you can stay and pet our dog.
            </span>
          </h1>
          {/* <div className="flex"> */}
         <a href={goBackUrl}>
             <p className="text-sm mt-10 text-pink-600 flex items-center">
               Go Back &nbsp; <IoMdArrowBack />
             </p>
         </a>
        </div>

        <div className="relative h-[20rem] lg:h-[28rem] w-[28rem] p-4 m-auto cursor-pointer rounded-lg overflow-hidden">
          <Image
            src={url}
            alt={"404"}
            fill
            style={{ objectFit: "contain" }}
            onClick={() => {setUrl('/heartbroken-dog-meme.png')}}
          />
          <div className=" absolute right-[2%] top-[20%] transform -translate-y-1/2 w-20 h-20 rounded-full p-5 bg-red-200 backdrop-blur-lg flex items-center justify-center text-center whitespace-nowrap"
         onClick={() => {setUrl('/dancingDog.webp')}}
          >
            <span
              className="p-1 bg-transparent text-lg font-bold cursor-pointer"
              style={{
                textShadow:
                  "-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black",
                color: "#ff9dcbe4",
              }}
            >
              Pet him
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
