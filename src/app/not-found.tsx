import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { Header } from "@/components/header/header";


export default async function NotFound() {
  return (
    <div className="h-[100vh] flex flex-col overflow-hidden bg-transparent">
      <Header/>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center border px-1 sm:px-5 rounded-xl w-[95%] sm:w-[80%] m-auto">
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
              This page doesn&#39;t exist on our website, You are at wrong place!.
            </span>
          </h1>
          {/* <div className="flex"> */}
         <a href={"/"}>
             <p className="text-sm mt-10 text-pink-600 flex items-center">
               Go Back &nbsp; <IoMdArrowBack />
             </p>
         </a>
        </div>

        <div className="relative h-[20rem] lg:h-[28rem] w-[28rem] p-4 m-auto cursor-pointer rounded-lg overflow-hidden">
          <Image
            src={'/monkeyThrowingLaptop.webp'}
            alt={"404"}
            fill
            sizes="full"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
