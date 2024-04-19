import type { Metadata } from "next";
import {cn} from "../lib/utils";
import "./globals.css";
import {Provider} from './provider'
import AuthProvider from "../components/AuthProvider";

export const metadata: Metadata = {
  title: "Ai Flavoured",
  description: "Gain information or Chat with documents and pdfs make presentation out of its summary",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased","font-helvetica")}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
