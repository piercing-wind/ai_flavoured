'use client';
import { UserSession } from "@/actions/userSession"
import { Button } from "../ui/button"
import {Checkout} from "@/components/checkout"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { Toaster } from "../ui/toaster";
import  {useToast} from "@/components/ui/use-toast";
import {useRouter} from 'next/navigation';

// types/razorpay.d.ts
interface RazorpayOptions {
   key: string;
   subscription_id: string;
   name: string;
   description: string;
   handler: (response: { razorpay_payment_id: string; razorpay_subscription_id: string; razorpay_signature: string }) => void;
   prefill: {
     name: string;
     email: string;
     contact?: string;
   };
   theme: {
     color: string;
   };
 }
 
 interface Razorpay {
   open(): void;
 }
 
 declare const Razorpay: {
   new (options: RazorpayOptions): Razorpay;
 };
 

export const PremiumMonthlyButton = ({user}:{user:UserSession}) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const {toast} = useToast();
 
   const handleClick = async () => {
      setLoading(true);
      try{
          if (!user) return <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"><h1 className="text-4xl font-bold">You are not logged in!</h1> <p>Please login here <Link href={'/login?callbackUrl=/checkout'}>Login</Link></p></div>
          const { email, id, subscription } = user;

          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() + 30);
          const expireByTimestamp = Math.floor(currentDate.getTime() / 1000);

          const response = await fetch('/api/razorpaysubscription', {
             method : 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                plan: process.env.NEXT_PUBLIC_MONTHLY_PREMIUM_PLAN_ID,
                id : id,
                email : email,
                expireBy : expireByTimestamp,
                totalCount : 360,
                addonFee : 3000,
             })
          })
          const res =await response.json();
          if(res.response === 'ok'){
            const options: RazorpayOptions = {
               key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
               subscription_id: res.subscription.id,
               name: 'Ai Flavoured',
               description: 'This plan will provide you with monthly premium access to Ai Flavoured',
               handler: function (response) {
                 router.push('/paymentsuccess');
               },
               prefill: {
                 name: user.name,
                 email: user.email,
               },
               theme: {
                 color: '#ff0786',
               },
             };

             const rzp1 = new Razorpay(options);
             rzp1.open();
          }
          
          setLoading(false);
      }catch(e){
         setLoading(false);
         toast({
            title : "Something went wrong!",
            description: `The Error Occured due to : ${(e as Error).message}}`,
            duration: 10000,
            variant: 'destructive'
         })
         
      }
    };
   return (
      <>
      <Toaster/>
       <Button onClick={()=>handleClick()} disabled={loading}  className='flex items-center justify-center text-2xl font-bold rounded-md my-2 h-14 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'>
       {loading ?  <PropagateLoader color="#ff0786" loading size={20} className="mb-4"/> : 'Get Started'}
      </Button>
   </>
   )
}

export const UnlimitedMonthlyButton = ({user}:{user:UserSession}) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const {toast} = useToast();
 
   const handleClick = async () => {
      setLoading(true);
      try{
          if (!user) return <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"><h1 className="text-4xl font-bold">You are not logged in!</h1> <p>Please login here <Link href={'/login?callbackUrl=/checkout'}>Login</Link></p></div>
          const { email, id, subscription } = user;

          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() + 30);
          const expireByTimestamp = Math.floor(currentDate.getTime() / 1000);

          const response = await fetch('/api/razorpaysubscription', {
             method : 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                plan: process.env.NEXT_PUBLIC_MONTHLY_UNMLIMITED_PLAN_ID,
                id : id,
                email : email,
                expireBy : expireByTimestamp,
                totalCount : 360,
                addonFee : 6000,
             })
          })
          const res =await response.json();
          if(res.response === 'ok'){
            const options: RazorpayOptions = {
               key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
               subscription_id: res.subscription.id,
               name: 'Ai Flavoured',
               description: 'This plan will provide you with monthly Unlimited access to Ai Flavoured',
               handler: function (response) {
                 router.push('/paymentsuccess');
               },
               prefill: {
                 name: user.name,
                 email: user.email,
               },
               theme: {
                 color: '#ff0786',
               },
             };

             const rzp1 = new Razorpay(options);
             rzp1.open();
          }
          
          setLoading(false);
      }catch(e){
         setLoading(false);
         toast({
            title : "Something went wrong!",
            description: `The Error Occured due to : ${(e as Error).message}}`,
            duration: 10000,
            variant: 'destructive'
         })
         
      }
    };
   return (
      <>
      <Toaster/>
      <Button onClick={()=>handleClick()} disabled={loading} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 h-14 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-neutral-800 to-neutral-600 hover:from-netural-600 hover:to-purple-700'>
      {loading ?  <PropagateLoader color="#ff0786" loading size={20} className="mb-4"/> : 'Get Started'}
      </Button>
      </>
   )
}

export const PremiumAnnualButton = ({user}:{user:UserSession}) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const {toast} = useToast();
 
   const handleClick = async () => {
      setLoading(true);
      try{
          if (!user) return <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"><h1 className="text-4xl font-bold">You are not logged in!</h1> <p>Please login here <Link href={'/login?callbackUrl=/checkout'}>Login</Link></p></div>
          const { email, id, subscription } = user;

          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() + 30);
          const expireByTimestamp = Math.floor(currentDate.getTime() / 1000);

          const response = await fetch('/api/razorpaysubscription', {
             method : 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                plan: process.env.NEXT_PUBLIC_1_YEAR_MONTHLY_PREMIUM_PLAN_ID,
                id : id,
                email : email,
                expireBy : expireByTimestamp,
                totalCount : 30,
                addonFee : 8000,
             })
          })
          const res =await response.json();
          if(res.response === 'ok'){
            const options: RazorpayOptions = {
               key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
               subscription_id: res.subscription.id,
               name: 'Ai Flavoured',
               description: 'This plan will provide you with Annually Premium access to Ai Flavoured',
               handler: function (response) {
                 router.push('/paymentsuccess');
               },
               prefill: {
                 name: user.name,
                 email: user.email,
               },
               theme: {
                 color: '#ff0786',
               },
             };

             const rzp1 = new Razorpay(options);
             rzp1.open();
          }
          
          setLoading(false);
      }catch(e){
         setLoading(false);
         toast({
            title : "Something went wrong!",
            description: `The Error Occured due to : ${(e as Error).message}}`,
            duration: 10000,
            variant: 'destructive'
         })
         
      }
    };
   return (
      <>
      <Toaster/>
      <Button onClick={()=>handleClick()} disabled={loading}  className='flex items-center justify-center text-2xl font-bold rounded-md my-2 h-14 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'>
      {loading ?  <PropagateLoader color="#ff0786" loading size={20} className="mb-4"/> : 'Get Started'}
      </Button>
   </>
   )
}

export const UnlimitedAnnualButton = ({user}:{user:UserSession}) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const {toast} = useToast();
 
   const handleClick = async () => {
      setLoading(true);
      try{
          if (!user) return <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"><h1 className="text-4xl font-bold">You are not logged in!</h1> <p>Please login here <Link href={'/login?callbackUrl=/checkout'}>Login</Link></p></div>
          const { email, id, subscription } = user;

          const currentDate = new Date();
          currentDate.setFullYear(currentDate.getFullYear() + 30);
          const expireByTimestamp = Math.floor(currentDate.getTime() / 1000);

          const response = await fetch('/api/razorpaysubscription', {
             method : 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                plan: process.env.NEXT_PUBLIC_UNLIMITED_ANNUAL_PLAN_ID,
                id : id,
                email : email,
                expireBy : expireByTimestamp,
                totalCount : 30,
                addonFee : 10000,
             })
          })
          const res =await response.json();
          if(res.response === 'ok'){
            const options: RazorpayOptions = {
               key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
               subscription_id: res.subscription.id,
               name: 'Ai Flavoured',
               description: 'This plan will provide you with Annually Unlimited access to Ai Flavoured',
               handler: function (response) {
                 router.push('/paymentsuccess');
               },
               prefill: {
                 name: user.name,
                 email: user.email,
               },
               theme: {
                 color: '#ff0786',
               },
             };

             const rzp1 = new Razorpay(options);
             rzp1.open();
          }
          
          setLoading(false);
      }catch(e){
         setLoading(false);
         toast({
            title : "Something went wrong!",
            description: `The Error Occured due to : ${(e as Error).message}}`,
            duration: 10000,
            variant: 'destructive'
         })
         
      }
    };
   return (
      <>
      <Toaster/>
      <Button onClick={()=>handleClick()} disabled={loading} className='flex items-center justify-center text-2xl font-bold rounded-md my-2 h-14 sm:my-5 ml-3 p-3 w-[80%] shadow-sm hover:scale-[1.01] text-white bg-gradient-to-r from-neutral-800 to-neutral-600 hover:from-netural-600 hover:to-purple-700'>
      {loading ?  <PropagateLoader color="#ff0786" loading size={20} className="mb-4"/> : 'Get Started'}
      </Button>
      </>
   )
}
