'use client';
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import {LogoText} from "@/components/logo";
import {UserIcon} from "@/components/userIcon";
import { PulseLoader } from "react-spinners";
import {storeMessage, getMessages, formatMessages} from '@/actions/chat/messages';
import DOMPurify from 'dompurify';
import Styles from "@/app/(x)/chat/chat.module.css";
import { Quota } from "@/app/(x)/chat/[slug]/page";
import { updateGpt3_5QuestionQuota, updateGpt4QuestionQuota, updateGpt4oQuestionQuota } from "@/actions/subscriptionQuota/subscriptionQuota";

import { Toaster } from "./ui/toaster";
import { Pricing } from "./pricing";
import { useToast } from "./ui/use-toast";


type Message ={
  title? : string | null;
  message: string;
  role: string;
  timestamp: Date;
}
const formatMessage = (message : string) : { __html: string }=> {
  // Sanitize the input
  const sanitizedMessage = DOMPurify.sanitize(message);

  // Remove example questions from the message
  const messageWithoutQuestions = sanitizedMessage.replace(/\n*Example Questions:.*$/s, '');

  // Replace line breaks with <br> tags
  const formattedMessage = messageWithoutQuestions.replace(/\n/g, '<br>');
 
  return { __html: formattedMessage };
};
const extractQuestions = (message : string) => {
  const questionRegex = /\d+\.\s*(.+?)(?=\n\d+\.|$)/g;
  const questions = [];
  let match;

  while ((match = questionRegex.exec(message)) !== null) {
    questions.push(match[1].trim());
  }

  return questions;
};


export const Conversation = ({ chatSession, user, userFiles, aiModel, api, chatModelQuota} : { chatSession : { slug: string }, user : any, userFiles : any, aiModel : string, api : string, chatModelQuota : Quota}) => {
  
  const [remainingQuotaForGPT3, setRemainingQuotaForGPT3] = useState<number>(chatModelQuota.gpt3_5Question);
  const [remainingQuotaForGPT4, setRemainingQuotaForGPT4] = useState<number>(chatModelQuota.gpt4Question);
  const [remainingQuotaForGPT4o, setRemainingQuotaForGPT4o] = useState<number>(chatModelQuota.gpt4oQuestion);
  
  const {toast} = useToast(); 
  const [pricing , setPricing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const [firstChunkReceived, setFirstChunkReceived] = React.useState(false);
  const [apiCaller, setApiCaller] = useState("chat");
  const fetchSummaryFromFetchMessages = useRef(false)
  const fetchResponseMssage = useRef(false)
  // const [isLightMode, setIsLightMode] = useState(false);
  const fetchMessages = async () => {
    if(fetchSummaryFromFetchMessages.current) return;
    fetchSummaryFromFetchMessages.current = true;

    const fetchedMessages = await getMessages(chatSession.slug);
    if (fetchedMessages.length === 0) {
      const newMessages = [];
      for (const file of userFiles) {
        setIsThinking(true);
        try{
          const response = await fetch("/api/summary", {
            method: "POST",
            body: JSON.stringify({
              fileKey: file.fileKey,
              id: user.id,
              fileType: file.fileType,
              aiModel : aiModel, 
            }),
          });
          const data = await response.json();
          const summary = data.summary;
          const message = { title: `Summary of ${file.fileName}`,message: summary,role: 'aiflavoured', timestamp: new Date(),};
          newMessages.push(message);
          setIsThinking(false);

          //Todo handle the error if not saved somehow which is rare but can happen due to network error!
          switch (aiModel) {
            case 'gpt-3.5-turbo-0125':
               const newRemainingQuotaForGPT3 = remainingQuotaForGPT3 - 1;
               if(newRemainingQuotaForGPT3 < 0){setPricing(true); throw new Error('Quota exceeded')};
               setRemainingQuotaForGPT3(newRemainingQuotaForGPT3);
               await updateGpt3_5QuestionQuota(user.id, newRemainingQuotaForGPT3);
               break;
            case 'gpt-4':
               const newRemainingQuotaForGPT4 = remainingQuotaForGPT4 - 1;
               if(newRemainingQuotaForGPT4 < 0) {setPricing(true); throw new Error('Quota exceeded')};
               setRemainingQuotaForGPT4(newRemainingQuotaForGPT4);
               await updateGpt4QuestionQuota(user.id, newRemainingQuotaForGPT4); 
               break;
          case 'gpt-4o':
               const newRemainingQuotaForGPT4o = remainingQuotaForGPT4o - 1;  
               if(newRemainingQuotaForGPT4o < 0){setPricing(true); throw new Error('Quota exceeded')};
               setRemainingQuotaForGPT4o(newRemainingQuotaForGPT4o);
               await updateGpt4oQuestionQuota(user.id, newRemainingQuotaForGPT4o);
               break;
          }
          
          await storeMessage({ title: `Summary of ${file.fileName}`, session: chatSession.slug, message: summary, role: 'aiflavoured', timestamp: new Date().toISOString()});
          setMessages(newMessages);
        }catch(e){
         toast({
            variant : 'destructive',
            title : `${(e as Error).message}`,
            description : 'You have exceeded the quota for this model. Please upgrade your plan to continue using this model.',
         })
          console.log(e);
        }
      }
    } else {
      setMessages(fetchedMessages);
    }
  }

  useEffect(() => {
    setApiCaller(api);
    fetchMessages();
  }, []);

  
  
  const fetchResponse = async (question?: string) => {
   if(fetchResponseMssage.current) return;
   fetchResponseMssage.current = true;
   try{
      switch (aiModel) {
        case 'gpt-3.5-turbo-0125':
           const newRemainingQuotaForGPT3 = remainingQuotaForGPT3 - 1;
           if(newRemainingQuotaForGPT3 < 0){setPricing(true); throw new Error('Quota exceeded')};
           setRemainingQuotaForGPT3(newRemainingQuotaForGPT3);
           await updateGpt3_5QuestionQuota(user.id, newRemainingQuotaForGPT3);
           break;
        case 'gpt-4':
           const newRemainingQuotaForGPT4 = remainingQuotaForGPT4 - 1;
           if(newRemainingQuotaForGPT4 < 0) {setPricing(true); throw new Error('Quota exceeded')};
           setRemainingQuotaForGPT4(newRemainingQuotaForGPT4);
           await updateGpt4QuestionQuota(user.id, newRemainingQuotaForGPT4); 
           break;
      case 'gpt-4o':
           const newRemainingQuotaForGPT4o = remainingQuotaForGPT4o - 1;  
           if(newRemainingQuotaForGPT4o < 0){setPricing(true); throw new Error('Quota exceeded')};
           setRemainingQuotaForGPT4o(newRemainingQuotaForGPT4o);
           await updateGpt4oQuestionQuota(user.id, newRemainingQuotaForGPT4o);
           break;
      }
    setIsThinking(true);
    setDisable(true);

    const userMessage = question && question !== "" ? question : userInput;
    
    setMessages((prevMessages: Message[]) => [...prevMessages, {message: userMessage, role: 'human', timestamp: new Date()}]);  
    const res = await storeMessage({session : chatSession.slug, message : userMessage, role : 'human', timestamp: new Date().toISOString()});
    
    setUserInput("");
    
    const prevMessages = messages.slice(-30);
    const formattedMessage = await formatMessages(prevMessages);      
    const response = await fetch(`/api/${apiCaller}`, {
      method: "POST",
      body: JSON.stringify({
        prevChat : formattedMessage,
        userMessage: userMessage, // Added a comma here
        session: chatSession.slug,
        aiModel: aiModel,
      }),
    });
    const reader = response.body?.getReader();
    let accumulatedChunks = "";
    
    
    reader?.read().then(function processText({ done, value }) {
      setFirstChunkReceived(true);
      if (done) {
        // console.log("Stream complete"); 
        setSystemMessage("");
        setDisable(false);
        setMessages((prevMessages: Message[])=>[...prevMessages,{message :  accumulatedChunks, role :  'aiflavoured', timestamp: new Date()}]);
        const  res = storeMessage({session : chatSession.slug, message : accumulatedChunks, role : 'aiflavoured', timestamp: new Date().toISOString()});
       fetchResponseMssage.current = false;
        return;
            }      
            const chunks = new TextDecoder("utf-8").decode(value);
            setSystemMessage((prevMessages : string) => prevMessages + chunks);
            accumulatedChunks += chunks;
            setIsThinking(false);
            reader.read().then(processText);
          });

         }catch(e){
            const error = e as Error;
            toast({
               variant : 'destructive',
               title : "Insufficient Quota!",
               description : `${error}, Please Upgrade your plan for more!`
            })
         }
        };

    const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const userInput = event.target.value;
      setUserInput(userInput);
    };

    const handleQuestionClick = async (e : any, question: string) => {
      e.stopPropagation();
      e.preventDefault();
      setUserInput(question);
      await fetchResponse(question);
    };
    
    useEffect(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, []);
    
    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, firstChunkReceived, systemMessage, isThinking])
    
    return (
         <>
         <Toaster />
         {pricing && <Pricing setPricing={setPricing}/>}
    <div className="w-full flex flex-col h-full">
      <div className={`flex flex-col space-y-2 overflow-y-scroll h-[calc(100vh-5rem)] ${Styles.chatscroll}`}>
      {messages.map((chat, index) => (
        chat.role === 'human' 
          ? (
          <div className='flex w-full justify-end pt-2' key={index}>
            <div className={cn(`ml-16 self-end p-2 rounded-md border backdrop-blur-lg relative bg-slate-200 border-gray-200 dark:bg-zinc-900 dark:border-gray-600`)}> 
              {chat.message}
            </div>
            <div className='flex items-center mx-2' title={user?.name}>
              <UserIcon userImage={user?.image}/>
            </div>
          </div>
          ) : (
          <div className='flex w-full pt-2' key={index}>
            <div className='w-8 mx-2' title="AI Flavoured">
              <LogoText/>
            </div>
            <div className={cn(`relative overflow-hidden mr-16 self-start backdrop-blur-lg border  p-2 rounded-md bg-slate-50 dark:bg-transparent border-gray-200 dark:border-gray-700`)}> 
            {/* <div className="absolute rounded-s-none top-8 left-8 h-20 w-20 bg-pink-200 -z-10 blur-2xl" />
            <div className="absolute rounded-s-none top-1/4 left-3/4 h-20 w-20 bg-orange-200 -z-10 blur-2xl" />
            <div className="absolute rounded-s-none top-2/4 left-1/2 h-20 w-20 bg-violet-200 -z-10 blur-2xl" /> */}
            {chat.title && <div className="text-lg font-bold p-2 mb-2">{chat.title}</div>}
            
            <div dangerouslySetInnerHTML={ formatMessage(chat.message.replace(/\n/g, '<br />'))} />
            {chat.title && (
                  <div className=" border-t border-gray-700 pt-3">
                    <span className="font-semibold">Example Questions you might ask :</span>
                    <ol className=" list-inside list-decimal">
                      {extractQuestions(chat.message).map((question, i) => (
                        <li 
                        key={i}  
                        onClick={(e) =>{ handleQuestionClick(e, question)}} 
                        className={cn(`mt-2 rounded-md p-2 cursor-pointer bg-slate-200 hover:bg-slate-300 dark:bg-zinc-900 dark:hover:bg-zinc-800`)}
                        >
                          {question}      
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
            </div>
          </div>)
      ))}
        {systemMessage && <div ref={messagesEndRef} className='flex w-full'><div className='w-8 mx-2'><LogoText/></div><div ref={messagesEndRef} className="w-full mr-16 self-start backdrop-blur-lg border border-gray-700 p-2 rounded-md"> {systemMessage} </div></div>}
        { isThinking && <div ref={messagesEndRef} className='flex w-full items-center opacity-70 '>
                          <div className='w-8 mx-2'><LogoText/></div>
                            <div ref={messagesEndRef} className=" flex items-end mr-16 self-start backdrop-blur-lg border border-gray-700 p-2 rounded-md">
                               AI Flavoured is Thinking 
                              <PulseLoader color="#f436a6" className=" m-1" loading size={2} />
                          </div>
                       </div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full p-2 my-2 border border-gray-600 rounded-lg bottom-1 z-10 flex items-center" >
      <textarea className="rounded-md w-full focus:outline-none p-2" 
      style={{
        minHeight : '3rem', 
        maxHeight: '12rem',
      scrollbarWidth: 'none',
      resize: 'vertical',
}}
      placeholder="Ask me anything about the document!" 
      value={userInput} 
      onChange={(e)=>handleUserInput(e)} 
      onKeyDown={(e) => e.key === 'Enter' && fetchResponse()}
      disabled={isThinking || disable}
      />
      <button onClick={()=>fetchResponse()} 
       disabled={isThinking || disable} className="p-2"><BsSend  className="text-xl"/></button>
      </div>
    </div>
    </>);
};
