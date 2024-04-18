'use client';
import { useState } from "react";

export const Conversation = ({chatSession, user} : {chatSession : { slug: string }, user : string}) => {
      const [messages, setMessages] = useState("");
      const [userInput, setUserInput] = useState("");
      console.log(userInput)
      const fetchData = async () => {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            message: userInput,
            chatId: chatSession.slug,
          }),
        });
        setUserInput("");
            const reader = response.body?.getReader();
        
            reader?.read().then(function processText({ done, value }) {
              if (done) {
                // console.log("Stream complete"); 
                return;
              }       
              const chunks = new TextDecoder("utf-8").decode(value);
              setMessages((prevMessages) => prevMessages + chunks);
              console.log(chunks);
              reader.read().then(processText);
            });
          };

          const handleInputChange :(event: React.ChangeEvent<HTMLInputElement>) => void = (event) =>{
            setUserInput(event.target.value);
          };


  return (
    <div>
      <h1>Conversation</h1>
      <input className="border border-red-600 text-black" type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={fetchData}>Start Chat</button>
      <p>{messages}</p>
    </div>
  );
};
