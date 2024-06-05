import ChatGPTIcon, { LogoText } from "@/components/logo";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Divider } from "./divider";



export const AiModelSelector = ({model, setModel , presentation = false, subscription = 'free'}:{model: string, setModel : (v:string)=>void, presentation?: boolean, subscription?: string}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between p-1">
            {model === "gpt-3.5-turbo-0125" ? (
              <>
                <LogoText className="h-6 w-6 flex" />
                <Button size={"sm"} className=" h-5">
                  Basic GPT-3.5 
                </Button>
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                <ChatGPTIcon />
                <Button size={"sm"} className=" h-5">
                  {model === "gpt-4o" ? "GPT - 4o" : "GPT - 4"} 
                </Button>
                {presentation && (
                  <div className="bg-gradient-to-br text-xs flex from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border">
                  {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
                  <p className="shiny-text rounded-lg text-nowrap px-1 font-semibold bg-pink-400 z-20">
                    {subscription === 'free' ? '1 Free ' : 'Pro'}
                  </p>
                </div>
                )}
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!presentation && (
            <>
          <DropdownMenuItem onClick={() => setModel('gpt-3.5-turbo-0125')}
          // className="flex flex-col"
          >
            <LogoText className="h-6 w-6 flex" />
            <Button size={"sm"} className=" h-5">
              Basic GPT-3.5
            </Button>
          </DropdownMenuItem>
          <Divider />
          </>
          )}
          <DropdownMenuItem onClick={() => setModel('gpt-4o')}
          className="flex flex-col"
          >
            <div className="flex items-center justify-between w-full ">
            <ChatGPTIcon />
            <Button size={"sm"} className=" h-5">
              GPT - 4o
            </Button>
            <div className="bg-gradient-to-br text-xs from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            </div>
          </DropdownMenuItem>
            <p className="text-xs">Smart, Fast & Advanced</p>
            <Divider />
          <DropdownMenuItem onClick={() => setModel('gpt-4')}
          className="flex flex-col"
          >
            <div className="flex items-center justify-between w-full ">
            <ChatGPTIcon />
            <Button size={"sm"} className=" h-5">
              GPT - 4
            </Button>
            <div className="bg-gradient-to-br text-xs from-pink-200 via-purple-200 to-violet-300 rounded-lg px-1 border">
              {/* <div className="absolute rounded-s-none top-0 left-2 h-2 w-5 bg-pink-500 blur-sm" /> */}
              <p className="shiny-text rounded-lg px-1 font-semibold bg-pink-400 z-20">
                Pro
              </p>
            </div>
            </div>
          </DropdownMenuItem>
            <p className=" text-xs">Accurate, Advanced</p>
            <Divider/>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
