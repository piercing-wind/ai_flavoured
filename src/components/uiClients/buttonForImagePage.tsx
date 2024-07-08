"use client";
import { createSession } from "@/actions/userPromptImage/imageSessionCreator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createChatSession } from "@/actions/chat/chatSession";
import { useState } from "react";
import { RingLoader } from "react-spinners";
export const Login = ({
  callbackUrl,
  className,
}: {
  callbackUrl: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`/login?callbackUrl=${callbackUrl}`)}
      variant={"glow"}
      className={className}
    >
      Login
    </Button>
  );
};

export const StableDiffusionXL =  ({
      userId,
      className,
    }: {
       userId: string | boolean;
      className?: string;
    }) => {
   const [loader, setLoader] = useState(false)
   const router = useRouter();
   const handleCLick = async () => { 
      setLoader(true) 
      if(typeof userId === 'string'){
         const session = await createChatSession( userId, 'Stable Diffusion XL Image Gen', 'image/sdxl');
         router.push(`/image/sdxl/${session}`)

         return;
      }else{
         router.push(`/login?callbackUrl=/image`)
      }
   } 
  return <Button 
      onClick={()=>handleCLick()} 
      disabled={loader}
      className={className}>
         Create Now {loader &&  <RingLoader color="#ff0786" size={25} />}
         </Button>
};

export const DALLE3 =  ({
   userId,
   className,
 }: {
    userId: string | boolean;
   className?: string;
 }) => {
   const [loader, setLoader] = useState(false)

const router = useRouter();
const handleCLick = async () => {  
   setLoader(true)
   if(typeof userId === 'string'){
      const session = await createChatSession( userId, 'Stable Diffusion XL Image Gen', 'image/dall-e');
      router.push(`/image/dall-e/${session}`)

      return;
   }else{
      router.push(`/login?callbackUrl=/image`)
   }
} 
return <Button 
   onClick={()=>handleCLick()} 
   disabled={loader}
   className={className}>
      Create Now {loader &&  <RingLoader color="#ff0786" size={25} />}
      </Button>
};
