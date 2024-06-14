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

  const userChatSession = await findChatSession(params.slug);

  if ('error' in userChatSession) {
    if (userChatSession.error) {
      notFound();
    }
  }

  const chatSessions = await getAllPreviousSessions(user.id || "");


  const chatSession = chatSessions.find(
    (session) => session.session === params.slug
  );
  const userFiles = chatSession ? chatSession.userFiles : [];
  const hasNonUserGenerator = userFiles.find(
    (file) => file.generator !== "user"
  );
  if (hasNonUserGenerator) {
    notFound();
  }

  return (
    <>
      {/* <div className="fullbody w-full flex h-screen"> */}

      <div className="w-full">
          <MainBar
            user={user}
            params={params}
            userFiles={userFiles}
            chatName={'chatName' in userChatSession ? userChatSession.chatName || "" : ""}
          />

      </div>

      {/* </div> */}
    </>
  );
}
