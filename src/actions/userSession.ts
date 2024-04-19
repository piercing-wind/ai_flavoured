"use server"
import {auth} from "@/auth"

export const Session = async () => {
      try {
            const session = await auth();

            if (!session || !session.user?.id) {
                  return { failure: "User not authenticated" };
            }
            const userId = session?.user?.id ?? '';
            return Promise.resolve({ session: session?.user });
      } catch (e) {
            console.log(e);
            return { failure: "User not authenticated" };
      }
}

