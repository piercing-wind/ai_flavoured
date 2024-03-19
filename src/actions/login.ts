"use server";
import { LoginUserSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerficationToken, generateTwoFAToken } from "@/lib/token";
import { getTwoFATokenByEmail } from "@/data/twoFAToken";
import { sendVerificationEmail, sendTwoFAEmail } from "@/lib/mail";
import { dbq } from "@/db/db";
import { getTwoFAConfirmationByUserId } from "@/data/twoFAConfirmation";

export const Login = async (values: z.infer<typeof LoginUserSchema>) => {
  const validate = LoginUserSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid Email or Password" };
  }
  const { email, password, code } = validate.data;

  const existingUser = await dbq('SELECT * FROM "User" WHERE email = $1', [email]);

  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Email does not exist!"}
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
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
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
