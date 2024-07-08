"use server"
import {auth} from "@/auth"

export type UserSession ={
   name: string,
   email: string,
   image: string,
   role: string,
   subscription: "free" | "premium" | "unlimited",
   id: string,
   timeZone: string
 } | null;

export const getUserSession = async () : Promise<UserSession> => {
      try {
            const session = await auth();

            if (!session || !session.user?.id) {
               return null;
            }
            return Promise.resolve(session.user as UserSession);
      } catch (e) {
            console.log(e);
           throw new Error("User not authenticated");
      }
}

