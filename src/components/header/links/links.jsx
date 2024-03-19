"use client";
import Link from "next/link";
import Styles from "../header.module.css";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
// for desktop
const InteractiveLinkType1 = ({ href, children }) => {
  return (
    <Link href={href} className={cn("border-b-0 ml-6 mr-6 p-1", Styles.link)}>
      {children}
    </Link>
  );
};

// for mobile
const InteractiveLinkType2 = ({ idxs, href, children }) => {
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

export const Links =  ({ type }) => {
  const { status: session } = useSession();
  // const sessionStatus = localStorage.getItem("sessionStatus");
  // if (sessionStatus === "authenticated") {
  //   console.log("Session is authenticated");
  // }
  // console.log(session);
  const links = [
    { href: "/products", text: "Products" },
    { href: "/howtouse", text: "How to" },
    { href: "/about", text: "About" },
    { href: "/pricing", text: "Pricing" },
    session === "authenticated" || session === "loading"
      ? { href: "/api/auth/signout?callbackUrl=/", text: "Logout" }
      : { href: "/login", text: "Sign Up/Login" },
  ];

  if (type === "HeaderNav") {
    return (
      <>
        {links.map((link, idx) => (
          <InteractiveLinkType1 key={idx} href={link.href}>
            {link.text}
          </InteractiveLinkType1>
        ))}
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
