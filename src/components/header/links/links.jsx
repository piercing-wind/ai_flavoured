"use client";
import Link from "next/link";
import Styles from "../header.module.css";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { UserProfile } from "./userProfile";
import {CurrentUser} from "@/hooks/useCurrentUser"

// import { useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";..
// for mobile
const InteractiveLinkType2 = ({
  idxs,
  href,
  children,
}) => {
  return (
    <Link className={cn("w-full h-full text-center", Styles.link)} href={href}>
      <motion.div
        className={cn(
          "ml-6 mr-6 py-4 px-12 text-xl text-center cursor-pointer",
          Styles.mLink
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 + idxs / 10,
        }}
      >
        {children}
      </motion.div>
    </Link>
  );
};

export const Links = ({ type }) => {
  // const { status: session } = useSession();
   
  const userData = CurrentUser();    // very important here to assign null if userData is empty!!
  const links = [
    { href: "/flavours", text: "Flavours" },
    { href: "/image", text: "AI Images" },
    { href: "/about", text: "About" },
    { href: "/pricing", text: "Pricing" },
  ];
  if (userData.data === null) {
    links.push({ href: "/login", text: "Sign up/Login" });
  }

  if (type === "HeaderNav") {
    return (
      <>
      
        <Link
          href="/flavours"
          className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}
        >
          Flavours
        </Link>
        <Link
          href="/image"
          className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}
        >
          AI Images
        </Link>
        <Link
          href="/about"
          className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}
        >
          About
        </Link>
        <Link
          href="/pricing"
          className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}
        >
          Pricing
        </Link>
        <div>
          {userData.data ? (
            <UserProfile userData={userData} />
          ) : (
            <Link
              href="/login"
              className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}
            >
              Sign up/Login
            </Link>
          )}
        </div>
      
      </>
    );
  } else if (type === "MobileNav") {
    return (
      <>
        {links.map((link, idx) => (
          <InteractiveLinkType2 key={idx} idxs={idx} href={link.href}>
            {link.text}
          </InteractiveLinkType2>
        ))}
      </>
    );
  }
};

// export const TextLinks = () => {
//   const{data : session} = useSession();
//   const links = [
//     { href: '/products', text: 'Products' },
//     { href: '/howtouse', text: 'How to' },
//     { href: '/about', text: 'About' },
//     { href: '/pricing', text: 'Pricing' },
//     { href: session ? '/api/auth/signout?callbackUrl=/' : '/api/auth/signin', text: session ? 'Logout' : 'Login' },
//   ];

//   return(
//     <>
//     {links.map((link, idx) => (
//       <MobileLinks key={idx} href={link.href}>{link.text}</MobileLinks>
//     ))}
//   </>
//   )}
