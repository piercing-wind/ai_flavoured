import crypto from "crypto";
import { getVerficationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetByEmail } from "@/data/reset-passwordToken";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getTwoFATokenByEmail } from "@/data/twoFAToken";

export const generateTwoFAToken = async(email:string)=>{
  const token = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);
  const exisitingToken = await getTwoFATokenByEmail(email);
   //console.log("from token.ts",exisitingToken);
  // if(exisitingToken.error){ return {error : "No data found"}};
  if(exisitingToken.id){
    await db.twoFAToken.delete({
      where:{
        id:exisitingToken.id
      }
    })
  }
  try{
  const twoFAToken = db.twoFAToken.create({
    data:{
      email,
      token,
      expires,
    }
  });
  return twoFAToken;}catch(e){
    console.log(e)};
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetByEmail(email);
  if (existingToken.id) {
    await db.resetPasswordToken.delete({
      where: {  
        id: existingToken.id,
      },
    });

  } 
  try{
  const updatePassword = db.resetPasswordToken.create({
    data:{
      email,
      token,
      expires,
    }}
  );
  return updatePassword;}catch(e){console.log(e)
};
}

export const generateVerficationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerficationTokenByEmail(email);
  //no need to do existingToken.id check because it uses prisma client to query the Database!
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  try{
  const verification = db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verification;
}catch(e){console.log(e)};
  
}
