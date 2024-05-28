"use client";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
export default function NotFound() {
  return (
    <div className=" flex items-center justify-center h-screen bg-transparent">
      <div className="flex items-center justify-center border mx-4  rounded-xl">
        <div className="text-5xl font-bold w-1/2">
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

          <p className="text-sm mt-10 text-pink-600 flex items-center">
            Go Back &nbsp; <IoMdArrowBack />
          </p>
        </div>

        <div className="relative">
          <Image
            src={"/heartbroken-dog-meme.png"}
            alt={"404"}
            width={400}
            height={300}
          />
          <div className=" absolute right-28 top-28 transform -translate-y-1/2 w-20 h-20 rounded-full p-5 bg-red-200 backdrop-blur-lg flex items-center justify-center text-center whitespace-nowrap">
            <span
              className="p-1 bg-transparent text-lg font-bold"
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
