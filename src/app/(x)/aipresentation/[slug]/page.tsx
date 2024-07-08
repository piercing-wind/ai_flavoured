import { findChatSession, getAllPreviousSessions } from "@/actions/chat/chatSession";
import { getAiPresentationAndModelsQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { auth } from "@/auth";
import { PresentationSession } from "@/components/presentationSession";
import { notFound } from "next/navigation";
import { Quota } from "../../chat/[slug]/page";


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
            (session) => session.session === params.slug
      );  
      const userFiles = chatSession ? chatSession.userFiles : [];   
      const quotaForAll : Quota = await  getAiPresentationAndModelsQuota(user.id || ""); 
      const hasUserGenerator = userFiles.find(
        (file) => file.generator === "aiflavoured"
      );
      if (!hasUserGenerator) {
        notFound();
      }   
return (
      <PresentationSession
        user={user}
        params={params}
        quota = {quotaForAll}
        userFiles={userFiles}
        chatName={userChatSession.chatName}
      />

  );
}
