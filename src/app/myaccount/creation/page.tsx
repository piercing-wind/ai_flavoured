export const dynamic = "force-dynamic"
import { getUserSession } from "@/actions/userSession";
import { Header } from "@/components/header/header";
import { OptionsDelete } from "./client";
import { getAllPreviousSessionsWithOtherData } from "@/actions/chat/chatSession";
import { ChatSession } from "@/app/(x)/layout";

const SessionBlock =({session}:{session : ChatSession})=>{
   const link = session.sessionType === "chat" ? `/chat/${session.session}`: 
                session.sessionType === 'image/sdxl' ? `/image/sdxl/${session.session}` :
                session.sessionType === 'image/dall-e' ? `/image/dalle/${session.session}` :
                session.sessionType === 'presentation'? `/aipresentation/${session.session}`:
                session.sessionType === 'audio' ? `/audio/${session.session}` : '/myaccount';
   return (
         <div className="w-full sm:w-[95%] h-[50px] mx-auto rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
         style={{boxShadow: '0px 0px 5px 0px gray'}}
         >
             <h1>{session.chatName}</h1>
             <div className="flex items-center justify-between gap-4 w-full sm:w-[40%] lg:w-[30%] mt-2 sm:mt-0">
              <p className="text-right align-bottom mt-auto">{(session.timestamp).toDateString()}</p>
              <OptionsDelete link={link} session={session}/>
             </div>
         </div>
   )
}

const Page=async ()=>{
   const user = await getUserSession();

   const createdSession :ChatSession[] =user !== null ?  await getAllPreviousSessionsWithOtherData(user.id) : [];
   
   return (
      <div className="w-full">
      <Header/>
      <h1 className="my-5 w-full sm:w-[95%] md:w-[60%] mx-auto font-bold text-2xl">Sessions</h1>
         <div className="w-full sm:w-[95%] md:w-[60%] mx-auto">
            <div className="w-full">
               {/* headings */}
               <div className="w-full my-4 flex sm:flex-row justify-between">
                  <h1 className="font-semibold md:text-xl mx-auto ml-8 w-full sm:w-[60%] text-left flex items-center">Name</h1>
                  <div className="flex items-center md:mt-2 sm:mt-0 w-full sm:w-[40%]">
                     <h1 className="font-semibold hidden sm:flex  md:text-xl mx-auto px-4 text-nowrap">Created On</h1>
                     <h1 className="font-semibold  md:text-xl mx-auto px-4 text-nowrap">Action</h1>
                  </div>
               </div>
               <div className="flex flex-col gap-y-5">
                  {createdSession.map((session)=>{
                     return <SessionBlock key={session.session} session={session}/>
                  })}
               </div>

            </div>
         </div>   
      </div>
   )
}
export default Page