import {
  findChatSession,
  getAllPreviousSessions,
  getDocUrls,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";

import { notFound } from "next/navigation";
import { MainBar } from "@/components/mainBar";
import { PresentationSession } from "@/components/presentationSession";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const user = session.user;

  const userChatSession: any = await findChatSession(params.slug);

  if (userChatSession.error) {
    notFound();
  }

  const chatSessions = await getAllPreviousSessions(user.id || "");
  const chatSession = chatSessions.find(
    (session) => session.chatId === params.slug
  );
  const userFiles = chatSession ? chatSession.userFiles : [];
  const displayPresentation = userFiles.length === 1 && userFiles[0].fileType !== "application/pdf" ? true : false;

  return (
    <>
      {/* <div className="fullbody w-full flex h-screen"> */}

      <div className="w-full">
        {displayPresentation ? (
          <PresentationSession
            user={user}
            params={params}
            userFiles={userFiles}
            chatName={userChatSession.chatName}
          />
        ) : (
          <MainBar
            user={user}
            params={params}
            userFiles={userFiles}
            chatName={userChatSession.chatName}
          />
        )}{" "}
      </div>

      {/* </div> */}
    </>
  );
}
