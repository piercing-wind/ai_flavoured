"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteChatSession } from "@/actions/chat/chatSession";
import { ChatSession } from "@/app/(x)/layout";
import { deleteFromS3 } from "@/actions/file/awsS3";

export const OptionsDelete = ({
  link,
  session
}: {
  link: string;
  session : ChatSession;
}) => {
  const { toast } = useToast();
  const [disabled, setDisable] = useState(false);
  const handleDelete = async (sessionId : string, sessionType : string) => {
   try{
    switch(sessionType){
      case 'presentation':
      case 'chatwithdoc':
          deleteFromS3(session.userFiles.map(file => file.fileKey));
          await deleteChatSession(sessionId, sessionType),
          console.log("deleted")
         toast({
            title: 'Chat deleted',
            description: 'Chat has been deleted successfully and all its files have been removed from the server.',
            duration: 10000,
         })
         break;
      case 'image/sdxl':
      case 'image/dall-e':
            const fileKeys = session.userPromptImages.flatMap(userPromptImage => 
              userPromptImage.images.map(image => image.fileKey)
            );
            deleteFromS3(fileKeys);
            await deleteChatSession(sessionId, sessionType);
            // This will log the array of fileKeys
            toast({
               title: 'Session deleted',
               description: 'Session has been deleted successfully and all its images have been removed from the server.',
               duration: 10000,
            })
          break;
      case 'audio' :
            deleteFromS3(session.userPromptAudios.map(audio => audio.fileKey));
            await deleteChatSession(sessionId, sessionType);
         toast({
            title: 'Session deleted',
            description: 'Session has been deleted successfully and all its audio files have been removed from the server.',
            duration: 10000,
         })
         break;
   
      }
   }catch(e){
      toast({
         title: 'Error',
         description: `An error occurred while deleting the session. Please try again. ${(e as Error).message}`,
         duration: 10000,
      })
   }
  }
  return (
    <>
      <Toaster />
      <DropdownMenu>
        <DropdownMenuTrigger className="text-2xl flex items-center justify-center">
          ...
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={link}>Open</Link>
          </DropdownMenuItem>
          <Label className="text-red-500 text-xs mt-5 text-nowrap flex flex-row mx-auto ml-5">
            <AlertTriangle className="h-3 w-3 flex items-baseline" /> &nbsp;
            Danger
          </Label>
            <Dialog>
              <DialogTrigger className="text-sm p-2 tracking-wider hover:bg-slate-50 w-full text-left rounded-sm dark:hover:bg-neutral-900">Delete</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your session media&#39;s and remove your session data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                      <Button type="button" variant="secondary"  
                      disabled={disabled}
                      onClick={async () => {
                          try {
                            setDisable(true); 
                            await handleDelete(session.session, session.sessionType);
                            setDisable(false);
                            toast({
                              title: `${session.chatName || ""} is deleted`,
                              description: `The session is deleted successfully`,
                            });
                          } catch (e) {
                           setDisable(false);
                            toast({
                              variant: "destructive",
                              title: `Error in deleting ${session.chatName|| ""}`,
                              description: `The session is not deleted because of the error ${
                                (e as Error).message
                              }`,
                            });
                          }
                        }}>
                        Yes i am sure
                      </Button>
                  </DialogFooter>
              </DialogContent>
            </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
