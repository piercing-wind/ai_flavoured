"use client";
import { Logout } from "@/actions/logout";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";
import { UserIcon } from "@/components/userIcon";
import {
  Cloud,
  CreditCard,
  GitPullRequestDraft,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Sun,
  Palette,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Free, Pro, Unlimited } from "@/components/badage";
import { ModeToggle } from "@/components/themeModeChange";
import { UserSession } from "@/actions/userSession";

export const ServerUserProfile = ({ user }: { user: UserSession }) => {

  if (user !== null) {
    return (
      <div
        className="relative inline-block z-30 cursor-pointer"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="px-8"><UserIcon userImage={user.image} /></div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-md">{user.name}</DropdownMenuLabel>
            <div className="mx-2">{ user.subscription === 'free' ? <Free className="text-sm"/> : user.subscription === 'premium' ? <Pro className="text-sm px-0 font-extrabold"/> :  user.subscription === 'unlimited' && <Unlimited className="font-extrabold" />}</div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <a href="/myaccount">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
               </a>
                <ModeToggle>
                 <DropdownMenuItem className="cursor-pointer">
                  <Palette className="mr-2 h-4 w-4" />
                    <span>Theme</span>
                </DropdownMenuItem>
                </ModeToggle>
              {/* <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite Friends</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>
              <GitPullRequestDraft className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem> */}
            <a href="/support">
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            </a>
            {/* <DropdownMenuItem disabled>
              <Cloud className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => Logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return <CircleLoader size={35} color="#a60075" loading className="mx-5" />;
  }
};

{
  /* {display && (
      <div className="absolute w-[230px] sm:w-72 right-0 mt-4 rounded-md p-3 backdrop-blur-3xl overflow-auto" style={{ border: '1px solid #ff0783' }}>
            <div className=" text-sm md:text-lg">
                  <h5 className="font-semibold">{user?.name}</h5>
                  <p className="text-sm">{user?.email}</p>
                  <p>{user?.subscription}</p>
                  <p className="my-2 py-1" style={{ borderTop: '0.5px solid #4d2f4fd8', borderBottom: '0.5px solid #4d2f4fd8' }} >Personal</p>
                  <div className="flex items-center justify-between">
                    <p>Theme</p> &nbsp; <div className="right"><ThemeSwitch/></div>
                  </div>
                  <button style={{ border: '0.5px solid #ff0783' }} className="flex px-5 rounded-2xl justify-center items-center mt-2 hover:bg-zinc-800" onClick={() => Logout()}>Log out</button>
            </div>
      </div>
)} */
}
