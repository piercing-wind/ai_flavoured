"use client";

import { useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { Links } from "./links/links";
import { TryForFreeButton } from "../ButtonTryForFree";
import { UserProfile } from "./links/userProfile";
import { CurrentUser } from "@/hooks/useCurrentUser";

export const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const userData = CurrentUser();
  return (
    <>
      <div className="xl:hidden flex items-center ">
        <TryForFreeButton />
        <UserProfile userData={userData}/>
        
        {/* <div className="hidden md:flex"> */}
        <Hamburger rounded toggled={isOpen} size={22} toggle={setOpen} color="Pink" />
        {/* </div> */}
        <motion.div
          className="w-full z-30 absolute left-1/2 transform -translate-x-1/2 "
          initial={{ opacity: 0}}
          style={{ top: "3.9rem" }}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          transition={{ duration: 0.7}}
        >
          {isOpen && (
            <div className="rounded-md py-5 w-full grid place-items-center left-0 right-0 items-center justify-center z-30 backdrop-blur-3xl">
              <Links className="" type="MobileNav" />
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

