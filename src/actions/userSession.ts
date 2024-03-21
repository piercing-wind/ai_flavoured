import {auth} from "@/auth"

export const Session = async ()=>{
      const session = await auth();
      if(!session) return null;
      return session;
}
