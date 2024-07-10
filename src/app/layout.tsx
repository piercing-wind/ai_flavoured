import type { Metadata } from "next";
import {cn} from "../lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeSwitch";
import path from "path";

export const metadata: Metadata = {
  title: "Ai Flavoured | AI Image Generation,AI Presentations,AI Audio Creation, and AI PDF Summarization",
   metadataBase: new URL(`${process.env.WEBSITE_URL}`),
   description:"Experience the best in AI with our comprehensive solutions. Generate stunning images with DALL-E and SDXL, create professional presentations from any document, transform text into high-quality audio, and quickly summarize PDFs. Enhance your productivity with our advanced AI tools.",
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
   twitter:{
      card : 'summary_large_image'
   },
   openGraph:{
         images:[
            {
               url : "/opengraph-image.jpg",
               height : 630,
               width : 1200,
               alt : "Welcome to Ai Flavoured"
            }
         ]
   }
 };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased","font-helvetica")}>
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
