'use client'

import Link from "next/link";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { FaPlus } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import {useState} from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


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

  return (
  <div className={`${isSidebarOpen ? 'w-72' : 'w-0'}`}>
    <div className={` relative sidebar w-72 p-2 bg-zinc-900 h-screen transition-all duration-200 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <Link href="/" className="font-bold glow whitespace-nowrap text-5xl m-4 ">
        Ai Flavoured
      </Link>
      <div className="m-3">
        <Divider />
      </div>
      <div className="mx-4 my-4">
        <Button className="text-sm my-4">
          <FaPlus /> &nbsp; New Chat
        </Button>

        <div className="flex items-center mx-2 my-5">
          <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
        </div>
        <div className="flex items-center mx-2 my-5">
          <IoIosCreate className=" text-xl " /> &nbsp; Presentation AI
        </div>
        <Divider />

        <div className="chathistory">
          <h1 className="text-lg p-2 m-2 hover:bg-stone-900 rounded-md">
            <div className="flex items-center">
              <FaHistory /> &nbsp; Chat History
            </div>
          </h1>
          <ul>
            {chatSessions.length > 1 ? (chatSessions.map((chathistory: any) => (
              <li key={chathistory.chatId}>
                <Link href={`/chat/${chathistory.chatId}`}>
                  {chathistory.chatName}
                </Link>
              </li>
            ))):( <div>
                  <p>No chat history</p>
            </div>)}
          </ul>
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
