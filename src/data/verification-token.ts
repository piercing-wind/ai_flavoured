import { dbq } from "@/db/db";
import { db } from "@/lib/db";

export const getVerficationTokenByEmail = async (email: string) => {
  try {
    const verification = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verification;
  } catch (error) {
    return null;
  }
};

export const getVerficationTokenByToken = async (token: string) => {
  try {
    const verification = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verification;
  } catch (error) {
    return null;
  }
};
