"use server";
import { RegisterUserSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { dbq } from "@/db/db";
import * as z from "zod";
import { db } from "@/lib/db";

export const Register = async (values: z.infer<typeof RegisterUserSchema>) => {
  const validate = RegisterUserSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Something went wrong!" };
  }
  const { name, email, password } = validate.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = db.user.findUnique({
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
      await db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      console.log("Account created sucessfully!");

      return { success: "Account created sucessfully!" };
    } else {
      return { error: "Email already exists in database!" };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
