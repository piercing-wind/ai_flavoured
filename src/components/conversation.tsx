'use client';
import { useState } from "react";
import { BsSend } from "react-icons/bs";

export const Conversation = ({chatSession, user} : {chatSession : { slug: string }, user : string}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const fetchResponse = async () => {
        setMessages((prevMessages: string[]) => [...prevMessages, userInput]);
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            message: userInput,
            chatId: chatSession.slug,
          }),
        });
        setUserInput("");
        const reader = response.body?.getReader();
        let accumulatedChunks = "";

        
        reader?.read().then(function processText({ done, value }) {
          if (done) {
            // console.log("Stream complete"); 
            setMessages((prevMessages: string[])=>[...prevMessages, accumulatedChunks]);
            setSystemMessage("");
            console.log( "done");
            return;
          }      
          const chunks = new TextDecoder("utf-8").decode(value);
          setSystemMessage((prevMessages : string) => prevMessages + chunks);
          accumulatedChunks += chunks;
          console.log(chunks);;
          reader.read().then(processText);
        });
      };
          
          const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const userInput = event.target.value;
            setUserInput(userInput);
           };

  return (
    <div className="w-full relative h-full ">
      <h1>Conversation</h1>
      {messages.map((message, index) => (
        (index % 2) === 0 ? (<p key={index} >User : {message}</p>) : <p key={index}>System : {message}</p>
        ))}
        {systemMessage && <p>System : {systemMessage}</p>}
      <div className="w-full p-2 border rounded-sm top-[calc(100vh-11rem)] absolute flex items-center" >
      <textarea className="rounded-md w-full focus:outline-none" 
      style={{
        minHeight : '3rem', 
        maxHeight: '12rem',
      scrollbarWidth: 'none',
      resize: 'vertical',
}}
      placeholder="Ask me anything about the document!" 
      value={userInput} 
      onChange={handleUserInput} 
      />
      <button onClick={fetchResponse} className="p-2"><BsSend  className="text-xl"/></button>
      </div>
    </div>
  );
};
