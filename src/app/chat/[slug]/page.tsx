import {
  chatSession,
  getAllPreviousSessions,
} from "@/actions/chat/chatSession";
import { auth } from "@/auth";
import { FormError } from "@/components/auth/form-error";
import { Conversation } from "./conversation";
import { Login } from "@/actions/login";
import { Logo } from "@/components/header/header";
import Link from "next/link";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCreate } from "react-icons/io";

export default async function Chat({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { failure: "User not authenticated" };
  }
  const userId = session.user.id;

  const id: any = await chatSession(params.slug);

  if (id.error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <FormError message={id.error} />
      </div>
    );
  }
  const chatSessions = await getAllPreviousSessions(userId);

  return (
    <>
      <div className="fullbody flex">
        <div className="sidebar w-1/5 m-4">
            <Link
              href="/"
              className="font-bold glow whitespace-nowrap text-5xl m-4 "
            >
              Ai Flavoured
            </Link>
            <div className="m-3">
              <Divider />
            </div>
          <div className="mx-4 my-4">

          <Button className="text-sm my-4" >
            <HiOutlinePlusSmall className="text-lg" /> &nbsp; New Chat
          </Button>
          
          <div className="flex items-center m-6">
          <TiFolderOpen className=" text-xl" /> &nbsp; Chat with Documents
          </div>
          <div className="flex items-center m-6">
          <IoIosCreate  className=" text-xl" /> &nbsp; Presentation AI
          </div>
          </div>
        </div>

        <div className="pdfviewr"></div>
        <div className="converstaion">
          <Conversation chatSession={params} user={userId} />
        </div>
      </div>
    </>
  );
}
