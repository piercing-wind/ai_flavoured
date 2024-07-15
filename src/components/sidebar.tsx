"use client";

import Link from "next/link";
import Styles from "@/app/(x)/chat/chat.module.css";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { FaPlus } from "react-icons/fa6";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { useState , useEffect} from "react";
import { MdChevronLeft, MdChevronRight, MdFolderZip } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";
import { updateChatName, deleteChatSession, getAllPreviousSessions } from "@/actions/chat/chatSession";
import { Success } from "./success";
import { usePathname } from 'next/navigation'
import { revalidate } from "@/actions/revalidate";
import { useRouter } from "next/navigation";
import { RiPresentationFill } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'
import { IoDocumentsSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { SiAudiomack } from "react-icons/si";
import { deleteFromS3, generatePublicFileAccessURL } from "@/actions/file/awsS3";
import { UserFile, UserPromptAudio, UserPromptImage } from "@/app/(x)/layout";
import { SidebarProps } from "@/app/(x)/layout";
import { useToast } from "./ui/use-toast";
import { Button as Button2 } from "./ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog";


export const Sidebar = ({chatSessions, subscription}:SidebarProps) => {
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(windowWidth < 786 ? false : true);
  const [editingsession, setEditingsession] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const {toast} = useToast();
  
  const pathname = usePathname();
  const params = pathname.split("/").pop();
  useEffect(() => {
   const handleResize = () => {
     setWindowWidth(window.innerWidth);
   };

   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);

  useEffect(() => {
    const refreshPage = () => {
      router.refresh();
    };
    refreshPage();
  },[router])

  const handleEdit = async () => {  
    if (editingsession !== null) {

      try{
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
  const handleDelete = async (session : string, sessionType : string) => {
   try{
    switch(sessionType){
      case 'presentation':
      case 'chatwithdoc':
         const data = chatSessions.find(chat => chat.session === session)?.userFiles;
         if(data){
          deleteFromS3(data.map(file => file.fileKey));
          await deleteChatSession(session, sessionType)
         }
         toast({
            title: 'Chat deleted',
            description: 'Chat has been deleted successfully and all its files have been removed from the server.',
            duration: 10000,
         })
         break;
      case 'image/sdxl':
      case 'image/dall-e':
         const data1 = chatSessions.find(chat => chat.session === session)?.userPromptImages;
         if (data1) {
            const fileKeys = data1.flatMap(userPromptImage => 
              userPromptImage.images.map(image => image.fileKey)
            );
            deleteFromS3(fileKeys);
            await deleteChatSession(session, sessionType);
          }
            toast({
               title: 'Session deleted',
               description: 'Session has been deleted successfully and all its images have been removed from the server.',
               duration: 10000,
            })
          break;
      case 'audio' :
         const data2 = chatSessions.find(chat => chat.session === session)?.userPromptAudios;
         if(data2){
            deleteFromS3(data2.map(audio => audio.fileKey));
            await deleteChatSession(session, sessionType);
         }
         toast({
            title: 'Session deleted',
            description: 'Session has been deleted successfully and all its audio files have been removed from the server.',
            duration: 10000,
         })
         break;
   
      }
   }catch(e){
      toast({
         title: 'Error',
         description: `An error occurred while deleting the session. Please try again. ${(e as Error).message}`,
         duration: 10000,
      })
   }
  }

  return (
    <div className={`${isSidebarOpen ? "w-72" : "w-0"} z-10 relative`}>
      
      {success && <Success message="Updated successfully" />}
      <div
        className={`z-10 text-white sidebar w-72 h-[100vh] p-2 overflow-y-hidden bg-zinc-900 transition-all duration-200 transform ${
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

            <Link href="/chat">
               <div className="flex items-center mx-2 my-5">
                  <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
               </div>
            </Link>
            {/* <button onClick={async ()=>{
              const a= await generatePublicFileAccessURL('Userdata/0d67e055-344b-4bcd-a1e7-8e26a90303f3/17197277858671712230116049synopsisofai.pdf');
              console.log(a)
            }}>
               Test
            </button> */}

          <Link href="/aipresentation">
            <div className="flex items-center mx-2 my-5">
              <IoIosCreate className=" text-xl " /> &nbsp; Presentation AI
            </div>
            </Link>
          <Divider />

          <div className="chathistory flex flex-col h-full">
            <h1
            onClick={() => setShowHistory(!showHistory)} 
            className="text-lg p-2 m-1 hover:bg-stone-900 rounded-md">
              <div className="flex items-center ">
                <FaHistory /> &nbsp; Chat History
              </div>
            </h1>
            {showHistory &&  <div className={` h-[22rem] overflow-y-auto ${Styles.chatscroll}`}>
              {chatSessions && chatSessions.length > 0 ? (
                chatSessions
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((chathistory) => (
                    
                    // {
                    <Link key={chathistory.session} href={
                      (() => {
                          switch(chathistory.sessionType){
                            case "presentation":
                              return `/aipresentation/${chathistory.session}`;
                            case "chatwithdoc":    
                              return `/chat/${chathistory.session}`;
                              case "image/sdxl":
                              return `/image/sdxl/${chathistory.session}`;
                              case "image/dall-e":
                              return `/image/dall-e/${chathistory.session}`;
                              case "audio":
                              return `/audio/${chathistory.session}`;
                            default:
                              return "/error";
                          }
                      
                      })()
                    }
                  
                    data-tooltip-id={chathistory.sessionType}
                    >
                     
                      <div                       
                        className={`p-1 my-2 truncate text-md flex items-center rounded-md justify-between hover:bg-gray-800 ${
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
                                       <Tooltip id="presentation" place="top" >
                                          <span>AI Presentation</span>
                                       </Tooltip>
                                       </>
                                       )
                              case "chatwithdoc":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-blue-600"><IoDocumentsSharp /></div>
                                    <Tooltip id="chatwithdoc" place="top" >
                                       <span>Chat With Docs</span>
                                    </Tooltip>
                                    </>
                                    )
                              case "image/sdxl":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-green-600"><IoMdImages/></div>
                                    <Tooltip id="image/sdxl" place="top" >
                                       <span>Image</span>
                                    </Tooltip>
                                    </>
                                    )      
                              case "image/dall-e":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-green-600"><IoMdImages/></div>
                                    <Tooltip id="image/dall-e" place="top" >
                                       <span>Image</span>
                                    </Tooltip>
                                    </>
                                    )
                              case "audio":
                                 return(
                                    <>
                                    <div className="p-1 text-xl text-yellow-600"><SiAudiomack /></div>
                                    <Tooltip id="audio" place="top" >
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
                          value={inputValue}   
                          onChange={event => setInputValue(event.target.value)} 
                          className=" w-32"
                          style={{ backgroundColor: 'transparent', borderBottom: '1px solid pink'}}
                          ></input>
                          <div className="flex items-center text-lg">
                          <button onClick={async () =>  {setInputValue(chathistory.chatName || ""); await handleEdit(); setEditingsession(null)}} className="mx-2" ><IoMdCheckmark className="text-green-600"/></button>
                          <button onClick={() => {setEditingsession(null);setInputValue('')}} className=""><FcCancel /></button>
                          </div>
                          </>)}
                        </div>
                              
                        {chathistory.session === params && editingsession === null &&  (
                          <div className="flex items-center text-lg">
                            <CiEdit className="mx-2" onClick={() => {setEditingsession(chathistory.session); setInputValue(chathistory.chatName || "");}}/>
                            <Dialog>
                                 <DialogTrigger className="text-sm p-2 tracking-wider hover:bg-slate-50 w-full text-left rounded-sm dark:hover:bg-neutral-900"><RiDeleteBin5Line className="mx-2"/></DialogTrigger>
                                 <DialogContent>
                                   <DialogHeader>
                                     <DialogTitle>Are you absolutely sure?</DialogTitle>
                                     <DialogDescription>
                                       This action cannot be undone. This will permanently delete
                                       your session media&#39;s and remove your session data from our servers.
                                     </DialogDescription>
                                   </DialogHeader>
                                   <DialogFooter className="sm:justify-start">
                                       <DialogClose asChild>
                                         <Button2 type="button" variant="secondary">
                                           Close
                                         </Button2>
                                       </DialogClose>
                                       <DialogClose asChild>
                                         <Button2 type="button" variant="secondary"  
                                         disabled={isDisabled}
                                         onClick={async () => {
                                             try {
                                              setDisabled(true);
                                              handleDelete(chathistory.session, chathistory.sessionType)
                                               toast({
                                                 title: `${chathistory.chatName || ""} is deleted`,
                                                 description: `The session is deleted successfully`,
                                               });
                                               setDisabled(false);
                                             } catch (e) {
                                              setDisabled(false);
                                               toast({
                                                 variant: "destructive",
                                                 title: `Error in deleting ${chathistory.chatName|| ""}`,
                                                 description: `The session is not deleted because of the error ${
                                                   (e as Error).message
                                                 }`,
                                               });
                                             }
                                           }}>
                                           Yes i am sure
                                         </Button2>
                                       </DialogClose>
                                     </DialogFooter>
                                 </DialogContent>
                               </Dialog>
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
            </div>}
            {subscription === "free" || subscription === null &&
            <div className="border rounded-md p-2 flex items-center justify-center text-lg font-bold ">
               Upgrade to premium
            </div>
            }
          </div>
        </div>
      </div>
        <button
          className="absolute top-1/2 z-40 -right-4 block transform -translate-y-1/2 py-3 bg-pink-600 hover:bg-pink-800 rounded-r-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <MdChevronLeft /> : <MdChevronRight />}
        </button>
    </div>
  );
};
