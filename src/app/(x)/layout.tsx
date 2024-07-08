import { getAllPreviousSessions, getAllPreviousSessionsWithOtherData } from "@/actions/chat/chatSession";
import { getUserSession } from "@/actions/userSession";
import { Sidebar } from "@/components/sidebar";
export interface UserFile {
   id: number;
   userId: string;
   fileKey: string;
   fileName: string;
   url: string;
   session: string;
   theme: string | null;
   generator: 'user' | 'aiflavoured';
   fileType: string;
   createdAt: Date;
 }

 export interface AiImages {
   id: string;
   userPromptImageId: string;
   fileKey: string;
   fileName: string;
   url: string;
   fileType: string;
   like: boolean | null;
   upscaled: boolean | null;
   generator: 'user' | 'aiflavoured' | string;
   imageModel: 'sdxl' | 'dalle'; // Assuming UserPromptImage is another interface you have defined
 }
 export interface UserPromptImage {
   id: string;
   userId: string;
   session: string;
   prompt: string | null;
   createdAt: Date;
   updatedAt: Date;
   images:AiImages[];
 }

 export interface UserPromptAudio {
   id: string;
   userId: string;
   session: string;
   prompt: string;
   audioUrl: string;
   fileName: string;
   fileKey: string;
   fileType: string;
   createdAt: Date;
   updatedAt: Date;
 }
 
export interface ChatSession {
   session: string;
   chatName: string | null;
   userId: string;
   sessionType: string;
   timestamp: Date;
   userFiles : UserFile[];
   userPromptImages: UserPromptImage[];
   userPromptAudios : UserPromptAudio[];
 };
 
 
export interface SidebarProps {
   chatSessions: ChatSession[];
   subscription: string;
 }
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode,
}) {
   const userSession = await getUserSession();
   let prevSessions: ChatSession[] = [];
   if(userSession){
      prevSessions = await getAllPreviousSessionsWithOtherData(userSession.id);
   }
   // if (prevSessions.length > 0 && prevSessions[0].userPromptImages && prevSessions[0].userPromptImages.length > 0) {
   //    console.log(prevSessions[0].userPromptImages[0].images);
   //  } else {
   //    console.log('No images found');
   //  }
  return (
    <div className="fullbody w-full flex flex-row h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}

      <Sidebar  chatSessions={prevSessions} subscription={userSession ? userSession.subscription : 'free'}/>
      {children}
    </div>
  );
}
