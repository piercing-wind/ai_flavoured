"use server";
import { LoginUserSchema } from "../../tmp/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerficationToken, generateTwoFAToken } from "@/lib/token";
import { getTwoFATokenByEmail } from "@/data/twoFAToken";
import { sendVerificationEmail, sendTwoFAEmail } from "@/lib/mail";
import { dbq } from "@/db/db";
import { getTwoFAConfirmationByUserId } from "@/data/twoFAConfirmation";
import { isRedirectError } from "next/dist/client/components/redirect";


//this login function is used to login the user from the EMAIL and PASSWORD

export const Login = async (values: z.infer<typeof LoginUserSchema>) => {
 
   const validate = LoginUserSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid Email or Password" };
  }
  const { email, password, code } = validate.data;

  const existingUser = await dbq('SELECT * FROM "User" WHERE email = $1', [email]);
  
  if(existingUser.password === null) return {error : "This email is already in use with other login provider. Please login with that provider."}

  if(existingUser.error){
    return {error: "The email you entered is not registered with us. Please register first."}
  }
  if(!existingUser.emailVerified){
    const verification = await generateVerficationToken(existingUser.email);
    if (verification) {
      await sendVerificationEmail(existingUser.name, verification.email, verification.token);
    }
    return {success: "Confirmation main sent!" };
  }

  if(existingUser.isTwoFAEnabled && existingUser.email){
    if(code){
      const twoFactorToken = await getTwoFATokenByEmail(existingUser.email);
      if(!twoFactorToken){
        return {error: "This code is invalid! or it doesnt exist anymore."}
      }
      if (twoFactorToken.token !== code){
        return {error : "Wrong code"}
      }
      const isExpired = new Date(twoFactorToken.expires) > new Date();
      if (isExpired){
        return {error: "Code is Expired! Please generate new code."}
      }
      try{
      await dbq('DELETE FROM "TwoFAToken" WHERE id = $1',[twoFactorToken.id]);
      
      const existingConfirmation = await getTwoFAConfirmationByUserId(existingUser.id)
      if(existingConfirmation){
        await dbq('DELETE FROM "TwoFAConfirmation" WHERE id = $1',[existingConfirmation.id])
      }
      try{
      await dbq('INSERT INTO "TwoFAConfirmation" ("userId") VALUES ($1)', [existingUser.id])
      }catch(e){console.log(e)}
    }catch(e){
        console.log(e)
      }     
    }else{
    const twoFactorToken = await generateTwoFAToken(existingUser.email); 
    if (twoFactorToken)
    await sendTwoFAEmail(existingUser.name, existingUser.email, twoFactorToken.token);
    return { twoFA: true };
    }
  }


  try {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      redirect: false,
    });
    
    return { success: "Signed in successfully" };
  } catch (error) {
      console.log(error)
      if (isRedirectError(error)) {
      throw error;
   }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Email or Password" };
        case "AuthorizedCallbackError":
          return { error: "Access Denied" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
   }
};
