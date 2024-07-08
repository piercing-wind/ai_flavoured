"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { changeUserName } from "./user";
import { Free, Pro, Unlimited } from "@/components/badage";

export const NameChangeButton = ({
  currentName,
  userId,
   subscription,
}: {
  currentName: string;
  userId: string;
  subscription: string;
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [newName, setNewName] = useState(currentName);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const changeName = async () => {
    const res = await changeUserName(userId, newName);
    router.refresh();
    console.log(res);
  };

  const handleButtonClick = () => {
    setIsInputOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  return (
    <>
      <Toaster />
      <div className=" px-4 sm:px-10 sm:pt-5 w-full flex flex-wrap sm:flex-nowrap relative">
        <div className=" gap-2 flex flex-col w-full">
          <h1 className="text-nowrap tracking-wide">{newName}</h1>
          <span className="flex gap-5">
            {subscription === "free" && <Free />}
            {subscription === "pro" && <Pro />}
            {subscription === "unlimited" && <Unlimited />}
          </span>
        </div>
        <Button
          variant={"bw"}
          className="border self-end ml-auto"
          onClick={handleButtonClick}
        >
          Change Name
        </Button>
        {isInputOpen && (
          <div className="absolute text-sm font-normal sm:w-[40%] h-20 top-[2%] right-[2%] p-5 backdrop-blur-sm rounded-sm">
            <Input type="text" value={newName} onChange={handleInputChange} />
            <Button
              onClick={() => {
                try {
                  update({ name: newName });
                  changeName();
                  toast({
                    title: "Name Changed Successfully",
                    description: `Your name has been updated successfully form ${currentName} to ${newName}, New name might be reflected in some time.`,
                    duration: 10000,
                  });
                  setIsInputOpen(false)
                } catch (e) {
                  toast({
                    variant: "destructive",
                    title: "Failed to change name",
                    description: (e as Error).message,
                    duration: 10000,
                  });
                }
              }}
            >
              Save
            </Button>
            <Button onClick={() => setIsInputOpen(false)}>Cancel</Button>
          </div>
        )}
      </div>
    </>
  );
};
