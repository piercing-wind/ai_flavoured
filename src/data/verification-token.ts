import { dbq } from "@/db/db";

export const getVerficationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await dbq(
      "SELECT * FROM VerificationToken WHERE email = $1",
      [email]
    );
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerficationTokenByToken = async (token: string) => {
      try {
        const verificationToken = await dbq(
          "SELECT * FROM VerificationToken WHERE email = $1",
          [token]
        );
        return verificationToken;
      } catch (error) {
        return null;
      }
    };
    