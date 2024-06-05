'use client';
import { createContext, useContext } from "react";

// Initialize the context with the correct type
const ChatContext = createContext<any | null>(null);

export function useChat(){
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};


export function ChatProvider ({ children, chatSessions, user }: { children: React.ReactNode, chatSessions: any, user: any }) {
  return (
    <ChatContext.Provider value={{ chatSessions, user }}>
      {children}
    </ChatContext.Provider>
  );
};