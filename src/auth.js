import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserById } from "./db/users";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getTwoFAConfirmationByUserId } from "./data/twoFAConfirmation";
import { getSubscriptionQuota } from "./actions/subscriptionQuota/subscriptionQuota";

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
  adapter: {
   ...PrismaAdapter(db),
   async createUser(profile) {
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     const newUser = await db.user.create({
       data: {
         email: profile.email,
         name: profile.name,
         image: profile.image,
         timeZone: timeZone,  // Storing the timezone
       },
     });
     const subscriptionQuota = await getSubscriptionQuota(newUser.id);
     if(subscriptionQuota.error){
     await db.subscriptionQuota.create({
       data: {
         userId: newUser.id,
       },
     });
    }
    return newUser;
   },
 },
  callbacks: {
    async signIn({ user, account }) {
      try{

      //allow only verified users to sign in
      const existingUser = await getUserById(user.id);
      if (account.provider === "credentials" && !existingUser.emailVerified){
      return false;
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
      }catch(e){
        if(e instanceof CredentialsSignin){
          console.log("Error : ", e.message);
          return Error(e.message);  
        }
      }
      return true;
    },
    async jwt({ token, user ,trigger, session }) {

      if(trigger === "update"){
         token.name = session.name;
      }

      // console.log("User : ", user);
      // console.log("Token : ", token);
      if (!token.sub) return token; // if no user, return empty token
      const existingUser = await getUserById(token.sub);

      //initializing the Base Quota for the new user
      if(user){
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      token.timeZone = timeZone;
      }
      if (!existingUser) return token; // if no user, return empty token
      token.role = existingUser.role;
      token.subscription = existingUser.subscription;
      token.id = existingUser.id;


      // console.log("JWT : ", token); 
      return token;
    },
    async session({ session, token, trigger }) {

      if (session?.user) {
        session.user.role = token.role;
        session.user.subscription = token.subscription;
        session.user.id = token.id;
        session.user.timeZone = token.timeZone;
      }
      
      //console.log("Session : ", token);
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
