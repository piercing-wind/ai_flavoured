'use client'

import { useState } from "react";
import { Pricing } from "./pricing";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSpring, animated, useTransition } from 'react-spring';

export const SeeMore =()=>{
   const [pricing, setPricing] = useState<boolean>(false);
   const [faq, setFaq] = useState<{[key: string]: boolean}>({cancelSubscription: false, singlePackage: false});
   
   const transitionsCancel = useTransition(faq.cancelSubscription, {
     from: { opacity: 0 },
     enter: { opacity: 1 },
     leave: { opacity: 0 },
   });

   const transitionsSinglePackage = useTransition(faq.singlePackage, {
     from: { opacity: 0 },
     enter: { opacity: 1 },
     leave: { opacity: 0 },
   });

   return (
      <>
      {pricing && <Pricing setPricing={setPricing}/>}
      <Button variant={'default'} className="p-2 text-xl font-semibold" onClick={()=>setPricing(!pricing)}>See Details</Button>
       <div className="px-2 my-10 flex flex-col gap-4">
          <h1 className="w-full text-left font-semibold">FAQ</h1>
          <div onClick={()=>setFaq({...faq, cancelSubscription: !faq.cancelSubscription})} className="flex items-center cursor-pointer">
            <p>Can I cancel my subscription?</p>
            {faq.cancelSubscription ? <ChevronDown /> : <ChevronRight />}
          </div>
          {transitionsCancel((style, item) => item && <animated.p className={'text-wrap w-[80%]'} style={style}>Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.</animated.p>)}

          <div onClick={()=>setFaq({...faq, singlePackage: !faq.singlePackage})} className="flex items-center cursor-pointer">
            <p>Do you offer a single package for services like AI image, voice AI presentation, or GPT question answer?</p>
            {faq.singlePackage ? <ChevronDown /> : <ChevronRight />}
          </div>
         {transitionsSinglePackage((style, item) => item && <animated.p style={style}>Yes, we offer a single package for that. Please contact us for more details.</animated.p>)}
      </div>
      </>
   )
}