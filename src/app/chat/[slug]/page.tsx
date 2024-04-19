import {
  findChatSession,
  getAllPreviousSessions,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";
import { FormError } from "@/components/auth/form-error";
import { Conversation } from "./conversation";
import { Sidebar } from "@/components/sidebar";


export default async function Chat({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const userId = session.user.id;

  const id: any = await findChatSession(params.slug);

  if (id.error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <FormError message={id.error} />
      </div>
    );
  }
  const chatSessions = await getAllPreviousSessions(userId);
  // console.log(chatSessions);

  return (
    <>
      <div className="fullbody flex">
          <Sidebar chatSessions={chatSessions} />


        <div className="pdfviewr flex"> hello</div>
        <div className="converstaion flex">
          <Conversation chatSession={params} user={userId} />
        </div>
      </div>
    </>
  );
}
