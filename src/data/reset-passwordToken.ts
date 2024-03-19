import { dbq } from "@/db/db"

export const getPasswordResetByToken = async (token: string) => {
      try{
            const ResetPasswordToken = await dbq('SELECT * FROM "ResetPasswordToken" WHERE token = $1', [token]);
            return ResetPasswordToken;
      }catch{
            return null
      }
};

export const getPasswordResetByEmail = async (email: string) => {
      try{
            const ResetPasswordToken = await dbq('SELECT * FROM "ResetPasswordToken" WHERE email = $1', [email]);
            return ResetPasswordToken;
      }catch{
            return null
      }
}