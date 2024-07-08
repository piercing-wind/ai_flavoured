import {
  findChatSession,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { AudioSessionBar } from "@/components/audioSessionBar";
import { getAllPreviousSessionsWithAudio } from "@/actions/userPromptAudio/userPromptAudio";
import { getAudioQuota } from "@/actions/subscriptionQuota/subscriptionQuota";


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

  
  const prevSessions = await getAllPreviousSessionsWithAudio(user.id || "");
  const auidoQuota = await getAudioQuota(user.id || "");
  const sessionAudios = prevSessions.find(
    (sessions) => sessions.session === params.slug
  );
  if (!sessionAudios) {
   notFound();
  }
  const prevUserPromptAudio = sessionAudios.userPromptAudios.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
   // console.log(prevUserPromptImages);
  if (sessionAudios?.sessionType !== 'audio') {
    notFound();
  }

  return (
    <>
      <div className="w-full h-full md:mr-2">
         <AudioSessionBar
            user={user}
            params={params}
            prevUserPromptAudio={prevUserPromptAudio}
            chatName={'chatName' in userChatSession ? userChatSession.chatName || "" : ""}
            audioQuota={auidoQuota}
         />
      </div>

    </>
  );
}
