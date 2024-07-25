export const dynamic = "force-dynamic"
import { DragAndDrop } from "@/components/dragAndDrop";
import Styles from "./chat.module.css"
import type { Metadata } from 'next'
import { getUserSession } from "@/actions/userSession";
import { getChatWithDocQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { Footer } from "@/components/footer";

const website = process.env.WEBSITE_URL || 'https://aiflavoured.com';

export const metadata: Metadata = {
   metadataBase: new URL(`${website}/chat`),
   title: 'AI Chat-chatbot Assistant AI PDF Summarizer | Powered by ChatGPT openai',
   description: 'Summarize PDF documents with AI and ask questions with our ChatGPT-powered software. Get instant, accurate summaries and answers using advanced GPT-4 technology.',
   applicationName: 'Chat PDF Software',
   authors: [{ name: 'Sourabh', url: 'https://www.linkedin.com/in/sourabh-sharma-8987451a2/' }],
   generator: 'AI Flavoured',
   keywords: ['AI', 'Chat', 'GPT-3','chatpdf', 'chatgpt', "summary", 'pdf summarizer','document summarizer', 'GPT-4', 'Documents', 'ChatGPT', 'ChatGPT-Software', 'cahtgpt', 'caht', 'cahtgot', 'chatgot', 'chatgpt 4o', 'Chat with Documents', 'AI Flavoured', 'pdf', 'chat', 'ai', 'pdf ia', "ai chatbot", 'chatbot', 'ai chat-chatbot Assistant' ],
   referrer: 'origin',
   creator: 'Sourabh',
   publisher: 'AI Flavoured',
   
   robots: {
      index: true,
      follow: true,
    },
   alternates: { canonical: '/chat' },
   category: 'Artificial Intelligence',
   classification: 'Chat Software',
   openGraph:{
      type: 'website',
      url: `${website}/chat`,
      title: 'AI Chat-chatbot Assistant AI PDF Summarizer | Powered by ChatGPT openai',
      siteName: 'AI Flavoured - Chat With Doc',
      description: 'Summarize PDF documents with AI and ask questions with our ChatGPT-powered software. Get instant, accurate summaries and answers using advanced GPT-4 technology.',
 
   }
 };
 
const Page=async ()=>{   
   const userSession = await getUserSession();
   const quota : number = userSession !== null ? await getChatWithDocQuota(userSession.id) : 0;

      return(
         <div className={`block w-full overflow-x-hidden ${Styles.hide_scrollbar} bg-gradient-to-br from-pink-100 via-purple-100 to-purple-100 dark:from-transparent dark:via-transparent dark:to-transparent`}>
            <div className="my-5 font-medium text-2xl w-full flex flex-wrap items-center md:items-baseline justify-center">
               <div className="aiflavoured text-5xl flex md:items-baseline font-bold text-nowrap">Ai Flavoured</div>
               &nbsp; &nbsp;
               <div className="flex text-center ">
               Boost Creativity And Knowledge: Learn more with AI.
               </div>
            </div>
            <div className="w-full "> 
            <h5 className="mx-[18%] md:text-lg font-semibold">Chat With Document</h5>
             <DragAndDrop userSession={userSession} quota={quota} />
            </div>
            <div className="w-full px-4 md:px-16 mb-10">            
              <div className="w-full md:flex flex-wrap justify-center items-center mt-10">
                 <div className=" md:flex-1 py-4 px-5 relative md:h-56 rounded-md bg-pink-50 dark:bg-neutral-950 ">
                    <h6 className="text-lg py-1 font-semibold">Student&#39;s 🧒🏻</h6>
                    <p className="opacity-85">Get ready for exams and complete your homework. Create custom outlines and speaker notes for your presentations.</p>
                       <br/>
                    <p className="opacity-85">Generate Amazing Ai Presentations</p>
                    <div className="absolute border-r h-[80%] top-4 right-0" />
                 </div>
                 <div className=" relative md:flex-1 py-4 px-5 md:h-56 rounded-md bg-pink-50 dark:bg-neutral-950">
                    <h6 className="text-lg py-1 font-semibold">Reseacher&#39;s 🧑‍🔬</h6>
                    <p className="opacity-85">Upload your research papers and get the information you need on your finger tips. </p>
                    <br />
                    <p className="opacity-85">Easily generate a summary of the paper&#39;s abstract for a concise overview</p>
                    <div className="absolute border-r h-[80%] top-4 right-0" />
                 </div>
                 <div className=" md:flex-1 py-4 px-5  md:h-56 rounded-md bg-pink-50 dark:bg-neutral-950">
                    <h6 className="text-lg py-1 font-semibold">Professionals&#39;s 👩‍🏫</h6>
                    <p className="opacity-85">Create detailed onboarding manuals and comprehensive training materials. </p>
                    <br />
                    <p className="opacity-85">Generate AI Image&#39;s, AI Voices and Presentation&#39;s 10x faster.</p>
                    
                 </div>
               </div>
               <div className="w-full md:flex flex-wrap justify-center items-center">
                  <div className="md:flex-1 py-4 px-5 relative md:h-48 rounded-md bg-pink-50 dark:bg-neutral-950 ">
                     <h6 className="text-lg py-1 font-semibold">🔮 Unlimited Uploads</h6>
                        <ul className="opacity-85">
                        <li>No size limit for your uploads</li>
                        <li>No limit on the number of uploads</li>
                        <li>Unlimited Question with AI </li>
                        </ul>
                     <div className="absolute border-r h-[80%] top-4 right-0" />
                  </div>
                  <div className=" relative md:flex-1 py-4 px-5  md:h-48 rounded-md bg-pink-50 dark:bg-neutral-950">
                     <h6 className="text-lg py-1 font-semibold">📁 Multiple File Types support</h6>
                        <ul className="opacity-85">
                        <li>Upload PDF, DOCX, PPTX, TXT</li>
                        <li>Upload multiple files at once</li>
                        </ul>
                     <div className="absolute border-r h-[80%] top-4 right-0" />
                  </div>
                  <div className=" md:flex-1 py-4 px-5  md:h-48 rounded-md bg-pink-50 dark:bg-neutral-950">
                     <h6 className="text-lg py-1 font-semibold">ℹ️ Easy Information</h6>
                     <p className="opacity-85"> No need to search the whole document to find the information. just ask the AI and get your answer</p>
                  </div>
               </div>
            </div>
            <Footer fixedBgWhite/>
         </div>
      )
}
export default Page