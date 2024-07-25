export const dynamic = "force-dynamic"
import React from 'react';
import { UserSession, getUserSession } from "@/actions/userSession";
import { Header } from "@/components/header/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { NameChangeButton } from "./client";
import AuthProvider from "@/components/AuthProvider";
import { getSubscriptionQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress"
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Styles from "@/components/header/header.module.css";
import Link from 'next/link';


type Quota = {
  id: string;
  userId: string;
  subscription: Date;
  renewal: Date;
  subscriptionStatus: string;
  aiChatWithDoc: number;
  aipresentation: number;
  gpt4Question: number;
  gpt4oQuestion: number;
  aiImages: number;
  aiVoices: number;
  textToSpeech: number;
  gpt3_5Question: number;
};

const quantity = {
   free :{
      aipresentation: 0,
      aiChatWithDoc: 2,
      gpt3_5Question: 10,
      gpt_4Question: 2,
      gpt_4oQuestion: 5,
      aiImages: 2,
      textToSpeech: 200,
   },
   premium :{
      aipresentation: 15,
      aiChatWithDoc: 0,
      gpt3_5Question: 2000,
      gpt_4Question: 100,
      gpt_4oQuestion: 200,
      aiImages: 150,
      textToSpeech: 15000,
   },
   unlimited :{
      aipresentation: 0,
      aiChatWithDoc: 0,
      gpt3_5Question: 0,
      gpt_4Question: 0,
      gpt_4oQuestion: 0,
      aiImages: 0,
      textToSpeech: 0,
   }

}


const Page = async () => {
   const user : UserSession = await getUserSession();
   if(user === null) return <>No user found yet</>
   const quota: Quota = user !== null ?  await getSubscriptionQuota(user.id) :0;

   const calculateProgress = (quota : number, totalQuota : number) => {
      return (user.subscription === 'unlimited' || totalQuota === quota || totalQuota === 0) ?  0 : (quota / totalQuota) * 100; 
    };
    
   
    const aipresentationProgress = calculateProgress(quota.aipresentation, quantity[user.subscription]?.aipresentation || 0);
    const aiChatWithDocProgress = calculateProgress(quota.aiChatWithDoc, quantity[user.subscription]?.aiChatWithDoc || 0);
    const gpt3_5QuestionProgress = calculateProgress(quota.gpt3_5Question, quantity[user.subscription]?.gpt3_5Question || 0);
    const gpt_4QuestionProgress = calculateProgress(quota.gpt4Question, quantity[user.subscription]?.gpt_4Question || 0);
    const gpt4oQuestionProgress = calculateProgress(quota.gpt4oQuestion, quantity[user.subscription]?.gpt_4oQuestion || 0);
    const textToSpeechProgress = calculateProgress(quota.textToSpeech, quantity[user.subscription]?.textToSpeech || 0);
    const aiImagesProgress = calculateProgress(quota.aiImages, quantity[user.subscription]?.aiImages || 0);

    
  return (
    <AuthProvider>
      <div className="w-full">
        <Header />
        <div className="w-[95%] sm:w-[80%] m-auto mb-[10rem]">
          <h1 className='my-5 text-xl font-semibold'>Account Information</h1>

          <Card>
            <CardHeader>
              <CardTitle className="flex">
                <div className="h-[5.5rem] md:h-[6rem] w-[8rem] lg:w-[7rem] relative">
                  {user.image !== null ?
                  <Image
                    src={user.image}
                    alt="Avatar"
                    fill
                    className="rounded-full "
                    style={{
                       objectFit: "cover",
                     }}
                     />
                     :
                     <User className='h-full w-full'/>
                  }
                </div>
                <NameChangeButton currentName={user.name} userId={user.id} subscription={user.subscription}/>
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
               <div className='w-full flex gap-10 flex-wrap my-5'>
                <Link href='/myaccount'> <h1 className={cn("border-b-0 p-1 cursor-pointer", Styles.link)}>Quota Usage</h1></Link>
                 <Link href='/myaccount/creation'> <h1 className={cn("border-b-0 p-1 cursor-pointer", Styles.link)}>Creations</h1></Link>
               </div>
                <Table>
                  <TableCaption>A list of your recent Usage.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[20%] text-center">AI</TableHead>
                      <TableHead className="w-[5%] text-center">Remaing</TableHead>
                      <TableHead className="text-center">Usage</TableHead>
                      <TableHead className="text-center w-[15%]">{user.subscription === 'free' && 'Free Tier'}{user.subscription === 'premium' && 'Premium'}{user.subscription === 'unlimited' && 'Unlimited'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className=" text-center font-medium">AI Presenation</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" :  quota.aipresentation }</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={aipresentationProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.aipresentation : user.subscription === "premium" ? 15 : "∞"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-center font-medium">Chat With Doc</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' || user.subscription === 'premium' ? "∞" : quota.aiChatWithDoc}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={aiChatWithDocProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.aiChatWithDoc : user.subscription === "premium" ? "∞" : "∞"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-center font-medium">AI Images</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" : quota.aiImages}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={aiImagesProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.aiImages : user.subscription === "premium" ? quantity.premium.aiImages : "∞"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-center font-medium">GPT-3 Questions</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" : quota.gpt3_5Question}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={gpt3_5QuestionProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.gpt3_5Question : user.subscription === "premium" ? quantity.premium.gpt3_5Question : "∞"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-center font-medium">GPT-4 Questions</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" : quota.gpt4Question}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={gpt_4QuestionProgress} /></TableCell>
                      <TableCell className=" text-center">{user.subscription === 'free' ? quantity.free.gpt_4Question : user.subscription === "premium" ? quantity.premium.gpt_4Question : "∞"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-center font-medium">GPT-4o Questions</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" : quota.gpt4oQuestion}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={gpt4oQuestionProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.gpt_4oQuestion : user.subscription === "premium" ? quantity.premium.gpt_4oQuestion : "∞"}</TableCell>
                    </TableRow>
                    <TableRow title='The TTS Quota is in Alphabetic Charcters'>
                      <TableCell className=" text-center font-medium">Text to Speech (TTS)</TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'unlimited' ? "∞" : quota.textToSpeech}</TableCell>
                      <TableCell className=" text-center flex flex-col items-center justify-center"><Progress className="w-full h-2 m-2" value={textToSpeechProgress} /></TableCell>
                      <TableCell className=" text-center ">{user.subscription === 'free' ? quantity.free.textToSpeech : user.subscription === "premium" ? quantity.premium.textToSpeech : "∞"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p>Got any queries? ask us at <a href="mailto:team@aiflavoured.com" className='text-blue-500'>here</a></p>
            </CardFooter>
          </Card>
          
        </div>
        {/* <Footer /> */}
      </div>
    </AuthProvider>
  );
};
export default Page;
