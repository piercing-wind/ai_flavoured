"use server";
import { RegisterUserSchema } from "../../tmp/schemas";
import bcrypt from "bcryptjs";
import { dbq } from "@/db/db";
import * as z from "zod";
import { db } from "@/lib/db";
import { generateVerficationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const Register = async (values: z.infer<typeof RegisterUserSchema>,callbackUrl : string, plan: string) => {
  const validate = RegisterUserSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Something went wrong!" };
  }
  const { name, email, password, isTwoFAEnabled } = validate.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    console.log("Email already exists in database!");
  }

  try {
    const result = (await dbq('SELECT email FROM "User" WHERE email = $1', [
      email,
    ])) as any;

    if (!result.email) {
     const newUser = await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          isTwoFAEnabled, // default is false
          timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone,  
        },
      });
      await db.subscriptionQuota.create({
         data: {
           userId: newUser.id,
         },
       });
      const verification = await generateVerficationToken(email);
      if (verification) {
        await sendVerificationEmail(
          name,
          verification.email,
          verification.token,
          callbackUrl,
          plan
        );
        console.log("Confirmation mail sent on your email");
      }

      return { success: "Account created successfully! Please confirm with mail sent in your email" };
    } else {
      return { error: "Email already exists in database!" };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
