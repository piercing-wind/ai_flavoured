import { dbq } from "@/db/db"

export const getTwoFAToken = async (token: string) => {
      try {
            const twoFAToken = dbq('SELECT * FROM "TwoFAToken" WHERE token = $1', [token]);
            return twoFAToken;
      } catch (error) {
            return null;
      }
}
export const getTwoFATokenByEmail = async (email: string) => {
      try {
            const twoFAToken = dbq('SELECT * FROM "TwoFAToken" WHERE email = $1', [email]);
            return twoFAToken;
      } catch (error) {
            return null;
      }
}