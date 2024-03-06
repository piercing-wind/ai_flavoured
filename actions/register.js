"use server";
import { signIn, signOut } from "../auth";
export async function register() {
  try {
    await signIn(provider, { redirectTo: redirectURL });
    
  } catch (err) {
    if(err instanceof AuthError) {
      switch(err.code) {
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
