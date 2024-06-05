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

import { presentation } from "@/aiflavoured/presentation/themes/presentation";
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


interface ChatSession {
  chatId: string;
  chatName: string | null;
  userId: string;
  timestamp: Date;
}

interface SidebarProps {
  chatSessions: ChatSession[];
}
export const Sidebar = ({ chatSessions }: SidebarProps) => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
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
    if (editingChatId !== null) {
      // updateOptimisticChatHistory(
      //   chatSessions.map((chat) => {
      //     // if (chat.chatId === editingChatId) {
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
        await updateChatName(editingChatId, inputValue);
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
  const handleDelete = async (chatId : string, userFiles : FileObject[] ) => {
    console.log(userFiles)
    await deleteChatSession(chatId),
      
    Promise.all(userFiles.map(file => deleteFromS3(file.fileKey)))

    console.log("deleted")
  }

  
  const handleAPI = async () => {
    const data = {
      author : "Sourabh",
      title : "biomePresentationTheme",
      pptxData : "text",
      imageSearch : "Google Search",
      modelForColorAndTitle : "gpt-3.5-turbo-0125",
      waterMark : true
    }
    console.log("clickers")
    //  await presentation(data);  *
      // await facetThemePresentation(data);   
    //  await ppPartyThemePresentation(data);  *
    //  await darkThemeMoonPresentation(data);  *
      await minimalistSalePitchThemePresentation(data);  
      // await scientificBluePresentationTheme(data);   *
    //  await biomePresentationTheme(data);
  }

  return (
    <div className={`${isSidebarOpen ? "w-72" : "w-0"}`}>
      {success && <Success message="Updated successfully" />}
      <div
        className={`relative z-20 text-white sidebar w-72 p-2 bg-zinc-900 h-screen transition-all duration-200 transform ${
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
          <Link href="/chat">
          <Button className="text-sm my-4">
            <FaPlus /> &nbsp; New Chat
          </Button>
          </Link> 
          <button onClick={handleAPI} >
          <div className="flex items-center mx-2 my-5">
            <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
          </div>
          </button>
            <button onClick={async()=> {
              const res = await fetch('/api/runpythonscript', {
                method: 'POST',
              });
              console.log(res);
            }} >
          <div className="flex items-center mx-2 my-5">
            <IoIosCreate className=" text-xl " /> &nbsp; Presentation AI
          </div>
            </button>
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
                    <Link key={chathistory.chatId} href={
                      (() => {
                        if (chathistory.userFiles && chathistory.userFiles[0]) {
                          switch(chathistory.userFiles[0].generator){
                            case "aiflavoured":
                              return `/x/aipresentation/${chathistory.chatId}`;
                            case "user":    
                              return `/x/chat/${chathistory.chatId}`;
                            default:
                              return "/error";
                          }
                        } else {
                          return "/error"; // return "/error" or any other default route
                        }
                      })()
                    }>
                      <div                       
                        className={`p-2 w-56 my-2 overflow-hidden truncate text-md flex items-center rounded-md justify-between hover:bg-gray-800 ${
                          chathistory.chatId === params
                            ? " backdrop-blur-3xl bg-pink-900 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                         revalidate(pathname)
                        }}
                      >
                        <div className=" items-center flex">
                          {chathistory.userFiles.length === 0 ? (
                            <div className="rounded-full p-1  w-1 bg-pink-600"></div>
                          ) : chathistory.userFiles.length === 1 ? (
                            <div className="rounded-full p-1  w-1 bg-purple-600"></div>
                          ) : (
                            <MdFolderZip className=" text-purple-300 text-lg" />
                          )}{" "}
                          &nbsp;&nbsp;
                          {chathistory.chatId !== editingChatId ?
                           ( chathistory.chatId === params ? <p className="truncate w-32">{chathistory.chatName}</p> : chathistory.chatName ): (<>
                          <input 
                          value={inputValue !== null && inputValue !== undefined ? inputValue : chathistory.chatName}   
                          onChange={event => setInputValue(event.target.value)} 
                          className=" w-32"
                          style={{ backgroundColor: 'transparent', borderBottom: '1px solid pink'}}
                          ></input>
                          <div className="flex items-center text-lg">
                          <button onClick={async () =>  {await handleEdit(); setEditingChatId(null)}} className="mx-2" ><IoMdCheckmark className="text-green-600"/></button>
                          <button onClick={() => {setEditingChatId(null);setInputValue('')}} className=""><FcCancel /></button>
                          </div>
                          </>)}
                        </div>
                        {chathistory.chatId === params && editingChatId === null &&  (
                          <div className="flex items-center text-lg">
                            <CiEdit className="mx-2" onClick={() => {setEditingChatId(chathistory.chatId); setInputValue(chathistory.chatName);}}/>
                            <RiDeleteBin5Line className="mx-2" onClick={()=>{handleDelete(chathistory.chatId, chathistory.userFiles)}} />
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
          className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 py-3 bg-pink-600 hover:bg-pink-800 rounded-r-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdChevronLeft /> : <MdChevronRight />}
        </button>
      </div>
    </div>
  );
};
