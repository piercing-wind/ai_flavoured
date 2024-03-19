//Code for social login buttons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const SocialLogin = ({label}) => {
  return (
    <div className="sm:flex gap-4 w-full mt-4">
      {/* <SocialButton icon={<FcGoogle className="h-5 w-5"/>} type="Google" styles={styles}/>
          <SocialButton icon={<FaGithub className="h-5 w-5"/>} type="Github" styles={styles}/> */}
      <form
      className="w-full"
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
          className="w-full px-0"
          variant="glow"
        >
          <FcGoogle className="h-5 w-5" />
          &nbsp;{label} Google
        </Button>
      </form>
      <form
      className="w-full mt-4 sm:mt-0"
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
          className="w-full px-0"
          variant="glow"
        >
          <FaGithub className="h-5 w-5" />
          &nbsp;{label} Github
        </Button>
      </form>
    </div>
  );
};
