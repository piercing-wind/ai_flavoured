"use server";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateResetPasswordToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const ResetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validateEmail = ResetPasswordSchema.safeParse(values);
  if (!validateEmail.success) {
    return { error: "Invalid email" };
  }
  const { email } = validateEmail.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "No user with that email" };
  }
  if(existingUser.password === null) {
    return { error: "The reset link cannot be sent to this email because it is registered with a other authentication method." };
  }
  try {
    const passwordToken = await generateResetPasswordToken(email);

    await sendPasswordResetEmail(
      existingUser.name || "",
      passwordToken?.email ?? "", // Add nullish coalescing operator
      passwordToken?.token ?? "", // Add nullish coalescing operator
    );
    return { success: "Reset link is sent to this mail!" };
  } catch (e) {
    console.log(e);
  }
};
