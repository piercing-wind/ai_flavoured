'use server'

import * as z from "zod";
import { NewPasswordSchema } from "../../tmp/schemas";
import { getPasswordResetByToken } from "@/data/reset-passwordToken";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { dbq } from "@/db/db";

export const NewPassword = async (values: z.infer<typeof NewPasswordSchema>,token?: string | null) => {
      if(!token) return {error: "Missing token"};
      const validateFields = NewPasswordSchema.safeParse(values);
      if (!validateFields.success) return { error: "Invalid Password" };
      const { password, confirmPassword } = values;
      const existingToken = await getPasswordResetByToken(token);
      if(existingToken.error) return {error: "Invalid Token or it does not exist"};
      if(password !== confirmPassword) return {error: "Passwords do not match"};
      const expired = new Date(existingToken.expires) > new Date();
      if(expired) return {error: "Token has expired"};
      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) return {error: "Email does not exist"};

      const hashedPassword = await bcrypt.hash(password, 10);
      try{
            await dbq('UPDATE "User" SET password = $1 WHERE id = $2', [hashedPassword, existingToken.id]);
            await dbq('DELETE FROM "ResetPasswordToken" WHERE id = $1', [existingToken.id]);
            return {success: "Password updated successfully"};
      }catch(e){
            console.log(e);
            return {error: "Error updating password"};
      }
};