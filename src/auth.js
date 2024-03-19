import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserById } from "./db/users";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getTwoFAConfirmationByUserId } from "./data/twoFAConfirmation";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      }); // update user
    },
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({ user, account }) {
      //allow only verified users to sign in
      const existingUser = await getUserById(user.id);
      if (account.provider === "credentials"){
      
      if (!existingUser.emailVerified) return false;
      }
      if(existingUser.isTwoFAEnabled){
        const twoFAConfirmation = await getTwoFAConfirmationByUserId(existingUser.id);
        if(!twoFAConfirmation){
          return false;
        }
        await db.twoFAConfirmation.delete({
          where: {
            id: twoFAConfirmation.id,
          },});
      };

      return true;
    },
    async jwt({ token, user }) {
      // console.log("User : ", user);
      // console.log("JWT : ", token);

      if (!token.sub) return token; // if no user, return empty token
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token; // if no user, return empty token

      token.role = existingUser.role;
      token.subscription = existingUser.subscription;

      return token;
    },
    async session({ session, token }) {
      // console.log("Session : ", token);
      if (session?.user) {
        session.user.role = token.role;
        session.user.subscription = token.subscription;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  trustHost: true,
  trustHostedDomain: true,
});
