"use server";
import { LoginUserSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const Login = async (values: z.infer<typeof LoginUserSchema>) => {
  const validate = LoginUserSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid Email or Password" };
  }
  const { email, password } = validate.data;

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
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
