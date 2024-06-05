'use client'
import ClipLoader from "react-spinners/ClipLoader";

export const Redirecting = () => {

      return (
        
        <div className="absolute backdrop-blur-sm bg-transparent w-full h-full flex items-center justify-center z-30 top-0">
          <div className="relative border border-slate-400 rounded-lg bg p-4 items-center flex"> {/* Add relative positioning to this div */}
            Redirecting to AI ... &nbsp; &nbsp; <ClipLoader color="#e26c92" loading size={20} />
          </div>
        </div>
      )
    }