import { db } from "./db";

type User = {
   id: string,
   name: string,
   email: string,
   emailVerified: Date,
   image: string,
   password: string | null,
   role: string,
   subscription: 'free' | 'premium' | 'unlimited',
   accountCreationTimestamp: Date,
   timeZone: string,
   isTwoFAEnabled: boolean, 
}
/***
 * This Function will run everytime when user logs in the Application */ 

export const checkUserSubscription = async (user:User) => {
   const {id, subscription} = user;
   if (subscription === 'free' || subscription === 'unlimited') return;
   try {
      const res = await db.subscriptionDetail.findMany({
        where: {
          AND: [
            { userId: id },
            { 'subscriptionId': process.env.NEXT_PUBLIC_1_YEAR_MONTHLY_PREMIUM_PLAN_ID }
             
          ]
        }
      });

      if(res.length === 0)  return 
      
      
    } catch (error) {
      console.error('Failed to check user subscription:', error);
      // Handle the error appropriately
    }

}