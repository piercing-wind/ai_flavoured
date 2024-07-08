export const dynamic = "force-dynamic";
import { Header } from "@/components/header/header";
import { SupportForm } from "./support-form";
import { getUserSession } from "@/actions/userSession";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Ai Flavoured | Support",
    metadataBase: new URL(`${process.env.WEBSITE_URL}`),
    description:"AI Flavoured Support, get in touch with us for any queries or support. We are here to help you.",
    applicationName: "AI Flavoured", 
    authors: [
      {
        name: "Sourabh",
        url: "https://www.linkedin.com/in/sourabh-sharma-8987451a2/",
      },
    ],
    generator: "AI Flavoured",
    keywords: [
      "AI",
      "AI Flavoured",
      'AI Image',
       'chatGPT',
       'DALL-E',
       'Stable Diffusion XL',
       'AI Audio',
       'pdf summarization',
       'gpt',
       'chat',
       'ai presentation',
       'ppt ai',
       'powerpoint ai',
       'ai presentation maker',
       'ai',
       'sdxl base',
       'sdxl',
       'dalle',
    ],
    referrer: "origin",
    creator: "Sourabh",
    icons : "/logo/favicon.ico",
    publisher: "AI Flavoured",
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: "/" },
    manifest: "/manifest.json",
  };

const Page = async() => {
   const user = await getUserSession();
  return (
    <div className="w-full">
      <Header />
      <div className="w-full  overflow-hidden ">
        <h1 className="w-full text-center font-semibold text-4xl my-10">
          Support
        </h1>
        <SupportForm user={user}/>
      </div>
    </div>
 );
};
export default Page;
