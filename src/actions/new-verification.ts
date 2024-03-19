"use server";
import { dbq } from "@/db/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { getVerficationTokenByToken } from "@/data/verification-token";
export const newVerification = async (token: string) => {
  const existingToken = await getVerficationTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }
  await dbq(
    'UPDATE "User" SET "emailVerified" = NOW(), email = $2 WHERE id = $1',
    [existingUser.id, existingUser.email]
  );
  await dbq('DELETE FROM "VerificationToken" WHERE id = $1', [existingToken.id]);
  return { success: "Email Verified" };
};
