"use client";

import Link from "next/link";
import Styles from "@/app/x/chat/chat.module.css";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { FaPlus } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { useState , useOptimistic, useEffect} from "react";
import { MdChevronLeft, MdChevronRight, MdFolderZip } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";
import { updateChatName, deleteChatSession } from "@/actions/chat/chatSession";
import { Success } from "./success";
import { usePathname } from 'next/navigation'
import { revalidate } from "@/actions/revalidate";
import { useRouter } from "next/navigation";
import { RiPresentationFill } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'
import { IoDocumentsSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { SiAudiomack } from "react-icons/si";



import { PresentationData, presentation } from "@/aiflavoured/presentation/themes/presentation";
import { aiSlidesForPresentation } from "@/aiflavoured/presentation/aiSlidesForPresentation";
import { pptxDocGenerator } from "@/aiflavoured/presentation/pptxDocGenerator";
import { getImagesFromGoogle, getImagesFromGoogleAsBase64ArrayWithoutHeaders } from "@/aiflavoured/presentation/getImagesFromGoogleAndConvertToBase64";
import {imageToBase64, localImageToBase64} from "@/aiflavoured/imgs/imageToBase64";
import { histogram } from "@/aiflavoured/imgs/histogram";
import {webpToJpg4} from "@/aiflavoured/presentation/webptoJpg";
import { googleImagesDesignFilterAI } from "@/aiflavoured/presentation/googleImagesDesignFilterAI";
import { FileObject } from "./mainBar";
import { deleteFromS3 } from "@/actions/file/awsS3";
import { log } from "console";
import { facetThemePresentation } from "@/aiflavoured/presentation/themes/facetThemePresentation";
import { chat } from "googleapis/build/src/apis/chat";
import { spresentation } from "@/aiflavoured/presentation/simplePresentation";
import { ppPartyThemePresentation } from "@/aiflavoured/presentation/themes/ppPartyThemePresentation";
import { darkThemeMoonPresentation } from "@/aiflavoured/presentation/themes/darkThemeMoonPresentation";
import { minimalistSalePitchThemePresentation } from "@/aiflavoured/presentation/themes/minimalistSalePitchThemePresentation";
import { scientificBluePresentationTheme } from "@/aiflavoured/presentation/themes/scientificBluePresentationTheme";
import { biomePresentationTheme } from "@/aiflavoured/presentation/themes/biomePresentationTheme";
import { pptxToPdf } from "@/actions/cloudconvert/cloudconvert";
import { adobePPTXToPdf } from "@/actions/adobe/adobePPTXToPdf";
import { imageGenerator } from "@/actions/huggingface/huggingFace";
// import { texttoimage } from "@/actions/huggingface/texttoimage";
import { PresentationImage, generatePresentaionAndStore } from "@/aiflavoured/presentation/generatePresentaionAndStore";
import { convertSlidesStringToObject } from "@/aiflavoured/presentation/convertSlidesStringToObject";
import { getPresentationData, storePresentationData } from "@/actions/presentationData/presentationData";


interface ChatSession {
  session: string;
  chatName: string | null;
  userId: string;
  sessionType: string;
  timestamp: Date;
}

interface SidebarProps {
  chatSessions: ChatSession[];
}
export const Sidebar = ({ chatSessions }: SidebarProps) => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingsession, setEditingsession] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [success, setSuccess] = useState(false);
  
  const pathname = usePathname();
  const params = pathname.split("/").pop();
  useEffect(() => {
    const refreshPage = () => {
      router.refresh();
    };
    refreshPage();
  },[])

  //todo :  will update this later
  // const [optimisticChatHistory, updateOptimisticChatHistory ]= useOptimistic(chatSessions, (state, newChatHistory : any) => {
    
  //   return [...state, newChatHistory];
    
  // });

  // const [chatHistory, setChatHistory] = useState(chatSessions);


  const handleEdit = async () => {  
    if (editingsession !== null) {
      // updateOptimisticChatHistory(
      //   chatSessions.map((chat) => {
      //     // if (chat.session === editingsession) {
      //     //   return {
      //     //     ...chat,
      //     //     chatName: inputValue,
      //     //   };
      //     // }
      //     console.log(chat)
      //     return chat;
      //   })
      // )
      try{
        console.log( inputValue)
        await updateChatName(editingsession, inputValue);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        },5000);
      }catch(e){
        console.log(e)
      }
    }
  }
  
  // Danger zone :
  const handleDelete = async (session : string, userFiles : FileObject[] ) => {
    console.log(userFiles)
    await deleteChatSession(session),
      
    Promise.all(userFiles.map(file => deleteFromS3(file.fileKey)))

    console.log("deleted")
  }

  
  const handleAPI = async () => {
 }
  return (
    <div className={`${isSidebarOpen ? "w-72" : "w-0"} z-10`}>
      {success && <Success message="Updated successfully" />}
      <div
        className={`z-10 text-white sidebar w-72 p-2 bg-zinc-900 h-screen transition-all duration-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          className="font-bold glow whitespace-nowrap text-5xl m-4 "
        >
          Ai Flavoured
        </Link>
        <div className="m-3">
          <Divider />
        </div>
        <div className="mx-4 my-4">
          <Link href="/x/chat">
          <Button className="text-sm my-4">
            <FaPlus /> &nbsp; New Chat
          </Button>
          </Link> 

            <Link href="/x/chat">
               <div className="flex items-center mx-2 my-5">
                  <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
               </div>
            </Link>

          <Link href="/x/aipresentation">
            <div className="flex items-center mx-2 my-5">
              <IoIosCreate className=" text-xl " /> &nbsp; Presentation AI
            </div>
            </Link>
          <Divider />

          <div className="chathistory flex flex-col h-full">
            <h1 className="text-lg p-2 m-2 hover:bg-stone-900 rounded-md">
              <div className="flex items-center ">
                <FaHistory /> &nbsp; Chat History
              </div>
            </h1>
            <div className={`h-[47vh] sm:h-[30vh] md:h-[33vh] lg:h-[45vh] xl:h-[50vh] overflow-auto ${Styles.chatscroll}`}>
              {chatSessions.length >= 1 ? (
                chatSessions
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((chathistory: any) => (
                    
                    // {
                    <Link key={chathistory.session} href={
                      (() => {
                          switch(chathistory.sessionType){
                            case "presentation":
                              return `/x/aipresentation/${chathistory.session}`;
                            case "chatwithdoc":    
                              return `/x/chat/${chathistory.session}`;
                              case "image":
                              return `/x/image/${chathistory.session}`;
                              case "audio":
                              return `/x/audio/${chathistory.session}`;
                            default:
                              return "/error";
                          }
                      
                      })()
                    }
                    data-tooltip-id="tooltips"
                    >
                      <div                       
                        className={`p-2 w-56 my-2 overflow-hidden truncate text-md flex items-center rounded-md justify-between hover:bg-gray-800 ${
                          chathistory.session === params
                            ? " backdrop-blur-3xl bg-pink-900 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                         revalidate(pathname)
                        }}
                      >
                        <div className=" items-center flex" >
                        {(() => {
                           switch (chathistory.sessionType) {
                              case "presentation":
                                 return(
                                       <>
                                       <div className="p-1 text-xl text-pink-600"><RiPresentationFill/></div>
                                       <Tooltip id="tooltips" place="top" >
                                          <span>AI Presentation</span>
                                       </Tooltip>
                                       </>
                                       )
                              case "chatwithdoc":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-blue-600"><IoDocumentsSharp /></div>
                                    <Tooltip id="tooltips" place="top" >
                                       <span>Chat With Docs</span>
                                    </Tooltip>
                                    </>
                                    )
                              case "image":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-green-600"><IoMdImages/></div>
                                    <Tooltip id="tooltips" place="top" >
                                       <span>Image</span>
                                    </Tooltip>
                                    </>
                                    )
                              case "sessionType4":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-yellow-600"><SiAudiomack /></div>
                                    <Tooltip id="tooltips" place="top" >
                                       <span>Audio</span>
                                    </Tooltip>
                                    </>
                                    )
                              default:
                                 return chathistory.userFiles.length === 1 ? (
                                 <div className="rounded-full p-1  w-1 bg-purple-600"></div>
                                 ) : (
                                 <MdFolderZip className=" text-purple-300 text-lg" />
                                 );
                           }
                           })()}{" "}
                          &nbsp;&nbsp;
                          {chathistory.session !== editingsession ?
                           ( chathistory.session === params ? <p className="truncate w-32">{chathistory.chatName}</p> : chathistory.chatName ): (<>
                          <input 
                          value={inputValue !== null && inputValue !== undefined ? inputValue : chathistory.chatName}   
                          onChange={event => setInputValue(event.target.value)} 
                          className=" w-32"
                          style={{ backgroundColor: 'transparent', borderBottom: '1px solid pink'}}
                          ></input>
                          <div className="flex items-center text-lg">
                          <button onClick={async () =>  {await handleEdit(); setEditingsession(null)}} className="mx-2" ><IoMdCheckmark className="text-green-600"/></button>
                          <button onClick={() => {setEditingsession(null);setInputValue('')}} className=""><FcCancel /></button>
                          </div>
                          </>)}
                        </div>
                              
                        {chathistory.session === params && editingsession === null &&  (
                          <div className="flex items-center text-lg">
                            <CiEdit className="mx-2" onClick={() => {setEditingsession(chathistory.session); setInputValue(chathistory.chatName);}}/>
                            <RiDeleteBin5Line className="mx-2" onClick={()=>{handleDelete(chathistory.session, chathistory.userFiles)}} />
                          </div>
                        )}
                      </div>
                    </Link>
                  ))
              ) : (
                <div>
                  <p>No chat history</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute top-1/2 z-40 right-[-15px] transform -translate-y-1/2 py-3 bg-pink-600 hover:bg-pink-800 rounded-r-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdChevronLeft /> : <MdChevronRight />}
        </button>
      </div>
    </div>
  );
};
