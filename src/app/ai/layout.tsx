import { getAllPreviousSessions } from "@/actions/chat/chatSession";
import { auth } from "@/auth";
import { Sidebar } from "@/components/sidebar";


export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const user = session.user;
  const chatSessions = await getAllPreviousSessions(user.id || "");
  return (
    <div className="fullbody w-full flex h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}

      <Sidebar chatSessions={chatSessions} />
      {children}
    </div>
  );
}
