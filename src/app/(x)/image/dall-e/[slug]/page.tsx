import {
  findChatSession,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { ImageSessionBar } from "@/components/imageSessionBar";
import { getAllPreviousSessionsWithImage } from "@/actions/userPromptImage/userPromptImage";
import { getImageQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { ImageSessionBarDalle } from "@/components/imageSessionBarDalle";


export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const user = session.user;

  const userChatSession = await findChatSession(params.slug);

  if ('error' in userChatSession) {
    if (userChatSession.error) {
      notFound();
    }
  }

  
  const chatSessions = await getAllPreviousSessionsWithImage(user.id || "", 'dalle');
  const aiImages = await getImageQuota(user.id || "")

  const chatSession = chatSessions.find(
    (sessions) => sessions.session === params.slug
  );
  const prevUserPromptImages = chatSession ? 
  [...chatSession.userPromptImages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) : [];
   // console.log(prevUserPromptImages);
  if (chatSession?.sessionType !== 'image/dall-e') {
    notFound();
  }

  return (
    <>
      <div className="w-full h-full md:mr-2">

         <ImageSessionBarDalle
            user={user}
            params={params}
            prevUserPromptImages={prevUserPromptImages}
            imageQuota={aiImages}
            chatName={'chatName' in userChatSession ? userChatSession.chatName || "" : ""}
         />
      </div>

    </>
  );
}
