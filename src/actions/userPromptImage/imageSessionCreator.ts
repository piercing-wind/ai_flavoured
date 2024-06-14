'use server'
import { createChatSession } from "@/actions/chat/chatSession";
import { auth } from "@/auth";

export const createImageSession = async () => {
    console.log("Creating Image Session");
    const userSession = await auth();
    if (!userSession) return "/login";
    const session = await createChatSession(userSession?.user?.id || "", "AI Image Gen", "image");
    return `/x/image/${session}`;
 };   