"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import CSS from "./about.module.css";

export const Images = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(CSS.slide);
        } else {
          entry.target.classList.remove(CSS.slide);
        }
      });
    });

    if (divRef.current) observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center gap-10 rounded-xl my-20 xl:mt-64 relative"
      ref={divRef}
    >
      <div className="mx-auto rotate-6 w-auto ">
        <h1 className="-rotate-6 text-2xl mx-auto mb-20 font-bold">
          AI Presenation
        </h1>
        <Image
          unoptimized
          src="/about/aipresentation.png"
          alt="AI flavoured presentation"
          height={200}
          width={400}
          style={{ borderRadius: "1rem", boxShadow: "0 0 10px gray" }}
          className={`${CSS.slide} brightness-90 opacity-80  top-[2%] left-[2%] -z-10 -rotate-6`}
        />
      </div>
      <div className="mx-auto -rotate-6 w-auto">
        <h1 className="rotate-6 text-2xl mx-auto mb-20 font-bold">AI Voices</h1>
        <Image
          src="/about/aivoice.webp"
          alt="AI flavoured presentation"
          height={200}
          width={300}
          style={{ borderRadius: "1rem", boxShadow: "0 0 10px gray" }}
          className={`${CSS.slide} brightness-90 opacity-80  bottom-[2%] right-[2%] -z-10 rotate-6`}
        />
      </div>
      <div className="mx-auto rotate-6 w-auto">
        <h1 className="-rotate-6 text-2xl mx-auto mb-20 font-bold">
          AI Images
        </h1>

        <Image
          src="/about/cat.webp"
          alt="AI flavoured presentation"
          height={200}
          width={300}
          style={{ borderRadius: "1rem", boxShadow: "0 0 10px gray" }}
          className={`${CSS.slide} brightness-90 opacity-80  top-[2%] right-[2%] -z-10 rotate-6`}
        />
      </div>
      <div className="mx-auto -rotate-6 w-auto">
        <h1 className="rotate-6 text-2xl mx-auto mb-20 font-bold">
          AI Summarizations
        </h1>
        <Image
          src="/about/summarizer.webp"
          alt="AI flavoured presentation"
          height={500}
          width={300}
          style={{ borderRadius: "1rem", boxShadow: "0 0 10px gray" }}
          className={`${CSS.slide} brightness-90 opacity-80  bottom-[2%] right-[2%] -z-10 rotate-6`}
        />
      </div>
    </div>
  );
};
