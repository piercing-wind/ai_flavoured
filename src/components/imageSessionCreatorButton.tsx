'use client';
import { createImageSession } from "@/actions/userPromptImage/imageSessionCreator";
import { ButtonProps, sizeClasses } from "./button";
import { useRouter } from "next/navigation";

export const ImageSessionButton = ({ text, className = "", size = 'default', disabled = false }:{text: string, className : string, size : any, disabled : boolean}) => {
    const router = useRouter();
      const handleClick = async () => {
         const session = await createImageSession();
         router.push(session);
      };

   return (
      <button disabled={disabled} onClick={handleClick} className={`${className} ${sizeClasses[size as keyof typeof sizeClasses]}`}>
         {text}
      </button>
   );
};