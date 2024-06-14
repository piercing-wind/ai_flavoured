import {
  findChatSession,
  getAllPreviousSessions,
  getDocUrls,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { ImageSessionBar } from "@/components/imageSessionBar";
import { getAllPreviousSessionsWithImage } from "@/actions/userPromptImage/userPromptImage";


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

  const chatSessions = await getAllPreviousSessionsWithImage(user.id || "");

  const chatSession = chatSessions.find(
    (sessions) => sessions.session === params.slug
  );
  const userPromptImages = chatSession ? chatSession.userPromptImages : [];
//   console.log('UserPromptImage',userPromptImages)
  if (chatSession?.sessionType !== 'image') {
    notFound();
  }

  return (
    <>
      <div className="w-full h-full md:mr-2">
         <ImageSessionBar
            user={user}
            params={params}
            userPromptImages={userPromptImages}
            chatName={'chatName' in userChatSession ? userChatSession.chatName || "" : ""}
         />
      </div>

    </>
  );
}
