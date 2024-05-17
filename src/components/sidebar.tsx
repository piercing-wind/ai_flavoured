"use client";

import Link from "next/link";
import Styles from "@/app/chat/chat.module.css";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { FaPlus } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { useState , useOptimistic} from "react";
import { MdChevronLeft, MdChevronRight, MdFolderZip } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";
import { updateChatName, deleteChatSession } from "@/actions/chat/chatSession";
import { Success } from "./success";
import { usePathname } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { presentaion } from "@/aiflavoured/presentation/presentation";
import { aiSlides } from "@/aiflavoured/presentation/aiSlides";
import { pptxDocGenerator } from "@/aiflavoured/presentation/pptxDocGenerator";


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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [success, setSuccess] = useState(false);
  
  const pathname = usePathname();
  const params = pathname.split("/").pop();


  //todo :  will update this later
  // const [optimisticChatHistory, updateOptimisticChatHistory ]= useOptimistic(chatSessions, (state, newChatHistory : any) => {
    
  //   return [...state, newChatHistory];
    
  // });

  // const [chatHistory, setChatHistory] = useState(chatSessions);


  const handleEdit = () => {  
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
        updateChatName(editingChatId, inputValue);
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
  const handleDelete = (chatId : string) => {
    deleteChatSession(chatId);
    console.log("deleted")
  }
  const revalidate = async ()=>{
    await revalidatePath(pathname)
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
          <button onClick={()=>pptxDocGenerator()}>
          <div className="flex items-center mx-2 my-5">
            <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
          </div>
          </button>
            <button onClick={()=>presentaion()}>
          <div className="flex items-center mx-2 my-5">
            <IoIosCreate className=" text-xl " /> &nbsp; Presentation AI
          </div>
            </button>
          <Divider />

          <div className="chathistory">
            <h1 className="text-lg p-2 m-2 hover:bg-stone-900 rounded-md">
              <div className="flex items-center ">
                <FaHistory /> &nbsp; Chat History
              </div>
            </h1>
            <div className={`h-96 overflow-auto ${Styles.chatscroll}`}>
              {chatSessions.length >= 1 ? (
                chatSessions
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((chathistory: any) => (
                    // {
                    <Link key={chathistory.chatId} href={`/chat/${chathistory.chatId}`}>
                      <div
                        
                        className={`p-2 w-56 my-2 overflow-hidden overflow-ellipsis text-md flex items-center rounded-md justify-between hover:bg-gray-800 ${
                          chathistory.chatId === params
                            ? " backdrop-blur-3xl bg-pink-900 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          revalidate;
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
                           (chathistory.chatName ): (<>
                          <input 
                          value={inputValue !== null && inputValue !== undefined ? inputValue : chathistory.chatName}   
                          onChange={event => setInputValue(event.target.value)} 
                          className=" w-32"
                          style={{ backgroundColor: 'transparent', borderBottom: '1px solid pink'}}
                          ></input>
                          <div className="flex items-center text-lg">
                          <button onClick={() => {handleEdit(); setEditingChatId(null)}} className="mx-2" ><IoMdCheckmark className="text-green-600"/></button>
                          <button onClick={() => {setEditingChatId(null);setInputValue('')}} className=""><FcCancel /></button>
                          </div>
                          </>)}
                        </div>
                        {chathistory.chatId === params && editingChatId === null &&  (
                          <div className="flex items-center text-lg">
                            <CiEdit className="mx-2" onClick={() => {setEditingChatId(chathistory.chatId),setInputValue(chathistory.chatName);}}/>
                            <RiDeleteBin5Line className="mx-2" onClick={()=>{handleDelete(chathistory.chatId)}} />
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
