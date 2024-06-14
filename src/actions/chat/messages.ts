'use server';

import { dbq } from "@/db/db";
import { db } from "@/lib/db";
type Message = {
  message: string;
  role: string;
  session: string;
  timestamp: string;
  title?: string;
};
type formatedMessage ={
  title? : string | null;
  message: string;
  role: string;
  timestamp: Date;
}


export const storeMessage = async (data: Message) => {
  try {
    const { session, title, message, role, timestamp } = data;
    await dbq(
      'INSERT INTO "messageHistory" ("session", "title", "message", "role", "timestamp") VALUES ($1, $2, $3, $4, $5) ',
      [session, title, message, role, timestamp]
    );
    return { success: "Message stored successfully" };
  } catch (e) {
    console.log(e);
  }
};

export const getMessages = async (session: string) => {
  const messages = await db.messageHistory.findMany({
    where: {
      session,
    },
    orderBy: {
      timestamp: "asc",
    },
    select:{
      message: true,
      role: true,
      timestamp: true,
      title: true
    }
  });
  // console.log(messages);
  return messages;
};


export const  formatMessages = async (messages: formatedMessage[]) => {
  const format = messages.map((message: any) => `${message.role}: ${message.message},`).join('\n');
  return format
}