import { Button } from "./ui/button";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from 'next/navigation';

// Inside your component


export const BuySubscription = ({closeSubscriptionreq}: {closeSubscriptionreq : () => void}) => {
      const router = useRouter(); 
return (
    <div className="absolute left-0 backdrop-blur-sm w-full h-full flex items-center justify-center top-0 z-20 " onClick={()=>{closeSubscriptionreq()}}>

      <div className="subscribe-background-image text-opacity-80 w-1/3 sm:w-1/2 relative border rounded-lg text-black p-4 text-left" onClick={(e) => e.stopPropagation()}>
           <div onClick={()=>closeSubscriptionreq()} className="absolute top-4 right-4 text-lg cursor-pointer"><MdOutlineClose /></div>
           <p className="font-bold my-2 text-lg">
            Download your Powerpoint file in .PPTX format. <br/> Created by You and AI Flavoured.
            </p>
           <p>You are currently on the Free Plan.</p>
           <p>To download this file, please upgrade to our Premium Plan. Thank you for your support!</p>

           <Button onClick={() => {router.push('/pricing')}} size="sm" variant={'default'} className='my-4 border bg-slate-950 border-black shadow-xl hover:bg-neutral-900 font-semibold w-36 text-md'> <p className="subscribe-text-gradient">Subscribe</p></Button>
      </div>
    </div>
  );
};
