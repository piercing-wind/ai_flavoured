'use server'
import { createChatSession } from "@/actions/chat/chatSession";
import { auth } from "@/auth";

export const createSession = async (name: string,  sessionType : string) => {
    console.log("Creating Image Session");
    const userSession = await auth();
    if (!userSession) return "/login";
    const session = await createChatSession(userSession?.user?.id || "", name, sessionType);
    return `/x/${sessionType}/${session}`;
 };   