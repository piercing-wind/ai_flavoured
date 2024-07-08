'use client'
import React from 'react';
import { CloseButton } from "./closeButton"

import { MonthPricing,AnnualPricing } from './pricingDetails';
import { Button } from './ui/button';

export const Pricing = ({setPricing}: {setPricing : (v: boolean)=> void}) => {
   const [month, setMonth] = React.useState<boolean>(true)


      return (
            <div className="fixed top-0 left-0 backdrop-blur-md w-full h-full overflow-y-scroll z-50 p-5">
              <div className=" backdrop-blur-sm flex flex-col items-center justify-center mb-8">
                  {/* Close button */}
                  <CloseButton close={setPricing} className="absolute top-4 right-4 text-2xl font-extrabold cursor-pointer"/>
                  <div className="w-[15rem] mx-auto flex flex-row items-center justify-center my-10 rounded-md p-2 h-14" 
                  style={{boxShadow : '0 0 10px 0 gray'}}
                  >
                        <Button
                        className={`font-semibold text-xl rounded-md cursor-pointer w-full text-center ${month ? 'bg-opacity-50 bg-slate-100 brightness-125' : ""} `}
                        onClick={()=>setMonth(true)}
                        >Montly</Button> 
                        &nbsp; / &nbsp; 
                        <Button
                        className={`font-semibold text-xl rounded-md cursor-pointer w-full text-center ${month ?  "" : 'bg-opacity-50 bg-slate-100 brightness-1250'} `}
                        onClick={()=>{setMonth(false)}}
                        >Annually</Button>
                  </div>

                     {month ? <MonthPricing /> : <AnnualPricing/>}


              </div> 
            </div>
      )
}