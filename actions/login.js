"use server";

import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "../auth";

const redirectURL = process.env.REDIRECT_URL;
export async function login(provider) {
  try {
    await signIn(provider, { redirectTo: redirectURL });
    const user = await auth();
    console.log("User", user);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "redirect-to-provider":
          console.log("Redirecting to provider");
          break;
        case "redirect-to-provider":
          console.log("Redirecting to provider");
          break;
        case "provider-callback":
          console.log("Processing provider callback");
          break;
        case "session-error":
          console.log("Session error");
          break;
        case "oauth-error":
          console.log("OAuth error");
          break;
        case "unknown-error":
          console.log("Unknown error");
          break;
        default:
          console.log("Unknown error");
      }
    }
    throw err;
  }
  console.log("Something went wrong");
}
