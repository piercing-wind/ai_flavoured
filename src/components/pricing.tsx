import React from 'react';
import { CloseButton, PurchaseButton } from "./closeButton"
import {timezoneCurrencies, getCurrentRate} from "@/lib/timezoneAndCurrency"
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const Pricing = ({setPricing}: {setPricing : (v: boolean)=> void}) => {
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const currency = timezoneCurrencies[ timeZone as keyof typeof timezoneCurrencies];
   const currencyRateValue = getCurrentRate[currency.currencyCode as keyof typeof getCurrentRate || "USD"] ? getCurrentRate[ currency.currencyCode as keyof typeof getCurrentRate || "USD"] : 1;
   const symbol = !currencyRateValue ? "$" : currency?.currencySymbol || "$";
   console.log(currency)
   console.log(!currencyRateValue)
   const basePrice = {
      premium: {
         monthly: 9.34, 
         annually: 7.9,  // 15% off
      },
      unlimited: {
         monthly: 37.3,
         annually: 31.7,  // 15% off
      },
      }
      return (
            <div className="fixed top-0 left-0 backdrop-blur-md w-full h-full overflow-y-scroll z-50 p-5">
              <div className=" backdrop-blur-sm flex flex-col items-center justify-center mb-8">
                  {/* Close button */}
                  <CloseButton close={setPricing} className="absolute top-4 right-4 text-2xl font-extrabold cursor-pointer"/>
                  <div className="h-10 bg-purple-800 m-5 flex p-2 items-center justify-center rounded-md">
                        <p>Montly</p> / <p>Annually</p>
                  </div>
                  <div className="w-3/4 flex flex-wrap top-full space-x-5">
                        {/* Free */}
                        <div className="flex-1 rounded-md  bg-red-100 px-4 py-8 sm:leading-normal lg:leading-loose ">
                           <div className=" text-left my-4 leading-normal h-28">
                             <h1 className="font-bold text-4xl">Free</h1>
                            <p>For newcomers eager to experience a glimpse of AI.</p>
                           </div>
                           <div className="text-left mt-8 text-2xl flex items-baseline font-bold">
                              <span>{symbol}</span>
                              <span className="text-5xl">0</span>
                              <span style={{fontSize : "20px", verticalAlign :"bottom"}}>/mo</span>
                           </div>
                           <div className="text-left px-8">
                            <ul className="list-disc items-center">
                              <li>
                                 <h1 className="font-bold text-xl">Basic Usage</h1>
                                    <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓  10 questions with Aiflavoured/day</li>
                                       <li className="flex items-center">✓ 5 Questions with GPT - 4o /day</li>
                                       <li className="flex items-center">✓ 2 Questions with GPT - 4 /day</li>
                                    </ul>
                              </li>
                              <li>
                                 <h1 className="font-bold text-xl">1 AI Presentation (.pptx)</h1>
                              </li>
                              <li>
                                 <h1 className="font-bold text-xl">Limited Features</h1>
                                     <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ 2 files uploads in Chat/Speak WithDoc /day</li>
                                       <li className="flex items-center">✓ 2 Free Image Extraction /day</li>
                                       <li className="flex items-center">✓ 1 Voice Extraction</li>
                                       <li className="flex items-center leading-normal my-1">✓ Support For Scanned PDF only in English</li>
                                    </ul>
                              </li>
                              <li>
                                 <h1 className="font-bold text-xl">Limited Access</h1>
                           
                              </li>
                            </ul>
                           </div>   

                        </div>
                        {/* Premium */}
                        <div className="flex-1 rounded-md  bg-purple-100 px-4 py-8 sm:leading-normal lg:leading-loose ">
                           <div className=" text-left my-4 h-28 leading-normal">
                             <h1 className="font-bold text-4xl premium-text-gradient">Premium</h1>
                            <p>For professionals who desire enhanced accessibility and plan to utilize it weekly.</p>
                           </div>
                           <div className="text-left text-2xl my-6 flex items-baseline font-bold">
                              <span>{symbol}</span>
                              <span className="text-5xl">{(basePrice.premium.monthly * currencyRateValue).toFixed(2)}</span>
                              <span style={{fontSize : "20px", verticalAlign :"bottom"}}>/mo</span>
                           </div>
                           <PurchaseButton children="Purchase" className='text-2xl my-5 ml-3 p-7 w-11/12 border text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'/>
                           <div className="text-left px-8">
                            <ul className="list-disc items-center my-2">
                              <h4 className="font-semibold font-sans italic">Everything basic includes plus :</h4>
                              <li>
                                 <h1 className="font-bold text-xl">Large Usage</h1>
                                    <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ 5000 questions with Aiflavoured /day</li>
                                       <li className="flex items-center">✓ 300 Questions with GPT - 4o /day</li>
                                       <li className="flex items-center">✓ 200 Questions with GPT - 4 /day</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl">Unlimited Access to Speak / Chat WithDoc.</h1>
                                     <ul className="">
                                       <li className="flex items-center">✓ Up to 2000 pages per PDF</li>
                                       <li className="flex items-center ">✓ OCR Support for Scanned PDF</li>
                                       <li className="flex items-center ">✓ 3 Models availabe to switch for chat</li>
                                       <li className="flex items-center leading-normal">✓ Support For Scanned PDF only in English</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl">Complete Access to AI Presentation</h1>
                                 <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Multiple file type support in reference upload (Word, PDF, pttx)</li>
                                       <li title="Microsoft Powerpoint" className="flex items-center leading-normal my-1 ">✓ Export presentation in .pptx (MS) format</li>
                                       <li className="flex items-center">✓ 20 Presetation Projects</li>
                                       <li className="flex items-center">✓ Watermark removal</li>
                                       <li className="flex items-center">✓ Multiple themes + Theme switching</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl">Full Access to AI Image Generation</h1> 
                                 <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ 30 AI Images Generation (Text to Image)</li>
                                       <li className="flex items-center leading-normal my-1 ">✓ 50 Icon creations</li> 
                                       <li className="flex items-center ">✓ 20 HD Quality Images &nbsp;<BsFillInfoCircleFill  data-tooltip-id="imageInfo" data-tooltip-content="For HD 1024×1024 , 1024×1792, 1792×1024  sizes are supported"/></li>
                                       <Tooltip id="imageInfo" style={{ backdropFilter: "blur(15px)"}} />                                     
                                       <li className="flex items-center leading-normal my-1 ">✓ 300 photos upload for Image Analysis </li>
                                       <li className="flex items-center">✓ Image to Text Support</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl">Full Access to AI Text to Speech Generation</h1> 
                                 <ul className="">
                                       <li className="flex items-center justify-center leading-normal my-1 relative">✓ 67000 English Characters For a Month &nbsp;<BsFillInfoCircleFill data-tooltip-id="wordCharctersTip" data-tooltip-content="67,000 characters is roughly equivalent to 14,000 words in English." className="absolute top-1 -right-2"/></li>
                                       <Tooltip id="wordCharctersTip" style={{ backdropFilter: "blur(15px)"}} />
                                       <li className="flex items-center leading-normal my-1 ">✓ Mp3 file format Export </li>
                                       <li className="flex items-center leading-normal my-1 ">✓ Multiple Language support </li>
                                       <li className="flex items-center">✓ 6 Types of Voice Narrator</li>
                                    </ul>
                              </li>
                            </ul>
                           </div>   

                        </div>
                        {/* Unlimited */}
                        <div className="flex-1 rounded-md  bg-purple-100 px-4 py-8 sm:leading-normal lg:leading-loose ">
                           <div className=" text-left my-4 h-28 leading-normal">
                             <h1 className="font-bold text-4xl unlimited-title-text-gradient">Unlimited</h1>
                            <p>For those ready for an AI-driven future who need unlimited access. Ideal for learners, researchers, or content creators.</p>
                           </div>
                           <div className="text-left text-2xl my-6 flex items-baseline font-bold">
                              <span>{symbol}</span>
                              <span className="text-5xl">{(basePrice.unlimited.monthly * currencyRateValue).toFixed(2)}</span>
                              <span style={{fontSize : "20px", verticalAlign :"bottom"}}>/mo</span>
                           </div>
                           <PurchaseButton children="Purchase" className='text-2xl my-5 ml-3 p-7 w-11/12 border text-white bg-gradient-to-r from-pink-400 to-purple-800 hover:from-pink-300 hover:to-purple-700'/>
                           <div className="text-left px-8">
                            <ul className="list-disc items-center my-2 ">
                              <h4 className="font-semibold font-sans italic">Everything premium includes without any limitations :</h4>
                              <li>
                                 <h1 className="font-bold text-xl unlimited-text-gradient">Unlimited Usage</h1>
                                    <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Unlimited questions with Aiflavoured /day</li>
                                       <li className="flex items-center">✓ Unlimited Questions with GPT - 4o /day</li>
                                       <li className="flex items-center">✓ Unlimited Questions with GPT - 4 /day</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl unlimited-text-gradient">Unlimited Access to Speak / Chat WithDoc.</h1>
                                     <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Unlimited file uploads upto 5000 pages support</li>
                                       <li className="flex items-center leading-normal my-1 -b-2 pb-1 font-semibold relative" >✓ Instant Presentation from the span uploaded document<BsFillInfoCircleFill  className="absolute top-1 -right-2" data-tooltip-id="instantPresentationInfo" data-tooltip-content="You can Create Presentation from the document you are currently chatting with at any time!" /></li>                                    
                                       <Tooltip id="instantPresentationInfo" style={{ backdropFilter: "blur(15px)"}} />
                                       <li className="flex items-center leading-normal">✓ Unlimited Queries, with worlds best AI Models</li>                       
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl unlimited-text-gradient">Unlimited Access to AI Presentation</h1>
                                 <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Unlimited Presentation Project Creation</li>
                                       <li title="Microsoft Powerpoint" className="flex items-center leading-normal my-1 ">✓ Unlimited Export presentation in .pptx (MS) format</li>  
                                       <li className="flex items-center">✓ Unlimited Theme switching</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl unlimited-text-gradient">Unlimited Access to AI Image Generation</h1> 
                                 <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Unlimited AI Images Generation (Text to Image)</li>
                                       <li className="flex items-center leading-normal my-1 ">✓ Unlimited photos upload for Image Analysis </li>
                                       <li className="flex items-center leading-normal my-1 ">✓ Unlimited Icons Creations </li>                                       
                                       <li className="flex items-center ">✓ 100 HD Quality Images &nbsp;<BsFillInfoCircleFill  data-tooltip-id="imageInfo" data-tooltip-content="For HD 1024×1024 , 1024×1792, 1792×1024  sizes are supported"/></li>
                                       <Tooltip id="imageInfo" style={{ backdropFilter: "blur(15px)"}} />
                                       <li className="flex items-center leading-normal my-1">✓ Multiple image format export with high speed</li>
                                    </ul>
                              </li>
                              <li className="my-2">
                                 <h1 className="font-bold text-xl unlimited-text-gradient">Unlimited to AI Text to Speech Generation</h1> 
                                 <ul className="">
                                       <li className="flex items-center leading-normal my-1">✓ Unlimited Voice Generations</li>
                                       <li className="flex items-center leading-normal my-1">✓ Multiple Language support </li>
                                       <li className="flex items-center leading-normal my-1 ">✓ Multiple Audio format Export </li>
                                    </ul>
                              </li>
                            </ul>
                           </div>   

                        </div>
                  </div>

              </div> 
            </div>
      )
}