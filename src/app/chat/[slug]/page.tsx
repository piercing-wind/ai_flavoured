import {
  findChatSession,
  getAllPreviousSessions,
  getDocUrls,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";

import { Sidebar } from "@/components/sidebar";
import { notFound } from "next/navigation";

import { MainBar } from "@/components/mainBar";
import { revalidatePath } from 'next/cache'

export default async function Chat({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const userId = session.user.id;

  const id: any = await findChatSession(params.slug);

  if (id.error) {
    notFound();
  }

  const revalidate =async ()=>{
    "use server"
    revalidatePath(`/chat/${params.slug}`)
  }

  const chatSessions = await getAllPreviousSessions(userId);
  const activeSessions = chatSessions.find(
    (session) => session.chatId === params.slug
  );
  // console.log("activeSessions", activeSessions);

  const filesName = await getDocUrls(params.slug);

  return (
    <>
      <div className="fullbody w-full flex h-screen">
        <Sidebar chatSessions={chatSessions}  revalidate={revalidate} params={params}/>

        <div className="w-full">
          <MainBar userId={userId} params={params} filesName={filesName} chatName={id.chatName}/>
        </div>
      </div>
    </>
  );
}
