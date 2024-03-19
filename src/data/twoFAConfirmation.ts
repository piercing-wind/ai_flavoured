import { dbq } from "@/db/db";

export const getTwoFAConfirmationByUserId = async (userId: string) => {
      try {
            const twoFAConfirmation = await dbq('SELECT * FROM "TwoFAConfirmation" WHERE "userId" = $1', [userId]);
            return twoFAConfirmation;
      } catch (error) {
            return error;
      }
}