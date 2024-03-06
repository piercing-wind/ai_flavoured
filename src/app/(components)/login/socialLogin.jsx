//Code for social login buttons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AuthError } from "next-auth";
import Styles from "./button.module.css";
import { signIn } from "../../../../auth";

export const SocialLogin = ({}) => {
  return (
    <div className="sm:flex gap-4">
      {/* <SocialButton icon={<FcGoogle className="h-5 w-5"/>} type="Google" styles={styles}/>
          <SocialButton icon={<FaGithub className="h-5 w-5"/>} type="Github" styles={styles}/> */}
      <form
        action={async () => {
          "use server";
          try {
            await signIn("google", { redirectTo: process.env.REDIRECT_URL });
          } catch (err) {
            if (err instanceof AuthError) {
              throw err;
            }
            throw err;
          }
        }}
      >
        <Button
          size="lg"
          className={cn("w-full", Styles.buttonStyle)}
          variant="glow"
        >
          <FcGoogle className="h-5 w-5" />
          &nbsp;Sign in with Google
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          try {
            await signIn("github", { redirectTo: process.env.REDIRECT_URL });
          } catch (err) {
            if (err instanceof AuthError) {
              throw err;
            }
            throw err;
          }
          console.log("Something went wrong");
        }}
      >
        <Button
          size="lg"
          className={cn("w-full", Styles.buttonStyle)}
          variant="glow"
        >
          <FaGithub className="h-5 w-5" />
          &nbsp;Sign in with Github
        </Button>
      </form>
    </div>
  );
};
