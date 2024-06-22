'use client';
import { createSession } from "@/actions/userPromptImage/imageSessionCreator";
import { ButtonProps, sizeClasses } from "./button";
import { useRouter } from "next/navigation";

export const CreateSessionButton = ({ 
   text, 
   className = "", 
   size = 'default', 
   disabled = false,
   name,
   sessionType
   }:{
      text: string, 
      className : string, 
      size : any, 
      disabled : boolean,
      name : string,
      sessionType : string
   }) => {
    const router = useRouter();
      const handleClick = async () => {
         const session = await createSession(name, sessionType);
         router.push(session);
      };

   return (
      <button disabled={disabled} onClick={handleClick} className={`${className} ${sizeClasses[size as keyof typeof sizeClasses]}`}>
         {text}
      </button>
   );
};

