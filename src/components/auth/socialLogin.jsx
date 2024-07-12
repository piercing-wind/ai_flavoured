//Code for social login buttons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const SocialLogin = ({ label, callbackUrl = "/", plan }) => {
  const handleSignIn = async (formData) => {
    "use server";
    const provider = formData.get("provider");
    console.log(provider);

    try {
      await signIn(provider, {
        redirectTo: callbackUrl
          ? plan
            ? `${callbackUrl}?plan=${plan}`
            : callbackUrl
          : process.env.REDIRECT_URL,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.errorCode === "OAuthProviderError") {
        }
        throw err;
      }
      throw err;
    }
  };

  return (
    <div className="sm:flex gap-4 w-full mt-4">
      <form className="w-full" action={handleSignIn}>
        <input type="hidden" name="provider" value="google" />
        <Button size="lg" className="w-full px-0" variant="glow">
          <FcGoogle className="h-5 w-5" />
          &nbsp;{label} Google
        </Button>
      </form>
      <form className="w-full mt-4 sm:mt-0" action={handleSignIn}>
        <input type="hidden" name="provider" value="github" />

        <Button size="lg" className="w-full px-0" variant="glow">
          <FaGithub className="h-5 w-5" />
          &nbsp;{label} Github
        </Button>
      </form>
    </div>
  );
};
