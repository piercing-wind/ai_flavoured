import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import Styles from "@/app/(x)/chat/chat.module.css";
import { Divider } from "./divider";
import { Tooltip } from "react-tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { GoInfo } from "react-icons/go";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export const RightBar=({
   model,
   size,
   setSize,
   samples,
   setSamples,
   imageStyle,
   setImageStyle
}:{
   model : 'dall-e-3' | 'dall-e-2',
   size : '256x256' | '512x512' | '1024x1024',
   setSize : (size : '256x256' | '512x512' | '1024x1024')=>void,
   samples : number,
   setSamples : (samples : number)=>void
   imageStyle : 'vivid' | 'natural',
   setImageStyle : (style : 'vivid' | 'natural')=>void
})=>{
  const [isCollapsed, setIsCollapsed] = useState(false);

return (
   <div
   className={` relative h-full border dark:border-neutral-700 rounded-md p-2 transition-all duration-500 ease-in-out overflow-y-auto overflow-x-hidden ${Styles.chatscroll} ${
     isCollapsed ? "w-10 overflow-hidden" : " w-[30rem]"
   }`}
 >
   <button onClick={()=>setIsCollapsed(!isCollapsed)} className="top-1 left-1 text-2xl">
     {isCollapsed ? (
       <TbLayoutSidebarLeftCollapseFilled />
     ) : (
       <TbLayoutSidebarRightCollapseFilled />
     )}
   </button>
   <Divider className="w-full" />
   <div className={`w-full ${isCollapsed && "hidden"}`}> 
   
   <div className="w-full">
    <div className="flex items-center w-full my-3 space-x-3">
       <h6>Size</h6> 
       <GoInfo  data-tooltip-id="sizeInfo" />
       <Tooltip id="sizeInfo"  className="w-40">
          <p className="w-40">Only 1024 X 1024 Size is supported for Dall-E-3 by ai flavoured</p>
       </Tooltip>
    </div>
    <RadioGroup className="flex items-center" value={model === 'dall-e-3' ? '1024x1024' : size} defaultValue={size} onValueChange={(v)=>setSize(v as '256x256' | '512x512' | '1024x1024') }>
        <div className="flex items-center space-x-2">
           <RadioGroupItem value="256x256" id="256x256" disabled={model=== "dall-e-3"} />
              <Label htmlFor="256x256" className={`${model === 'dall-e-3' && "opacity-80"}`}>256x256</Label>
        </div>
        <div className="flex items-center space-x-2">   
           <RadioGroupItem value="512x512" id="512x512" disabled={model=== "dall-e-3"} />
              <Label htmlFor="512x512" className={`${model === 'dall-e-3' && "opacity-80"}`}>512 x 512</Label>
        </div>
        <div className="flex items-center space-x-2">   
           <RadioGroupItem value="1024x1024" id="1024x1024" />
              <Label htmlFor="1024x1024">1024 x 1024</Label>
        </div>
    </RadioGroup>
    </div>       
    <div className="w-full">
        <span className="flex w-full space-x-2 py-2 mt-4 items-center">
         <h6 className="">Number of Images</h6>
          <GoInfo
            className="cursor-pointer mx-4 text-md"
            data-tooltip-id="sampleImageTip"
          />
        </span>
      <div className="flex items-center space-x-2">
      <Input
        id="width"
        type="number"
        max={model === 'dall-e-3' ? 1 : 5}   
        min={1}
        value={samples}
        className="col-span-2 h-8"
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (model === 'dall-e-3' && value > 1) {
            value = 1;  
          }
          setSamples(value);
        }}
      />
      </div>
      <Tooltip id="sampleImageTip">
        <p>Number of images to generate</p>
        <p>Minimum 1 , Maximum 5</p>
        <p><b>Dall-E 3 </b> model only support <b>1</b> <br/>Number of image at a time.</p>
      </Tooltip>
    </div>  

    <div className={`w-full my-2 ${model === "dall-e-2" && "opacity-85"}`}>
       <span className="flex w-full space-x-2 py-2 mt-4 items-center">
            <h6 className="">Style</h6>
             <GoInfo
               className="cursor-pointer mx-4 text-md"
               data-tooltip-id="style"
             />
      </span>
          <Select disabled={model=== "dall-e-2"} defaultValue='vivid' onValueChange={(v)=>setImageStyle(v as 'vivid' | 'natural')}>
              <SelectTrigger className=" h-8 w-28 focus:ring-0 focus:outline-none focus:border-none dark:bg-inherit">
                <SelectValue placeholder={imageStyle} />
              </SelectTrigger>
              <SelectContent>
               <div className="flex items-center space-x-2">
                 <SelectItem value="vivid">Vivid</SelectItem>
               </div>
               <div className="flex items-center space-x-2">
                 <SelectItem value="natural">Natural</SelectItem>
               </div>
              </SelectContent>
            </Select>

      <Tooltip id="style">
         <div className=" w-72"> 
            <p><b>This param is only supported for dall-e-3</b></p>
            <p>Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images.</p>
         </div>
      </Tooltip>
    </div>
    </div>
 </div>
)
}