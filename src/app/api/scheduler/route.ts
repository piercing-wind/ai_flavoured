import { NextRequest } from "next/server";
import {db} from "@/lib/db";
import { forEach } from "lodash";

export async function GET(req: NextRequest){ 
   const header = req.headers.get('Authorization');

   if(header !== "iloveai") return Response.json({ response: 'Forbidden', message: 'Access is restricted, You are not Allowed here!' }, { status: 403 });
   try{
   const res = await db.subscriptionDetail.findMany({where:{status: 'cancelled'}});
   const userIdsCancelled :string[] = []
   const userIdsYearlyActivePremium :  Array<{ userId: string; lastUpdated: Date }> = []

   const currentDate = Math.floor(new Date().getTime() / 1000);

   forEach(res, async (item) => {
      if(item.status === "cancelled"){
         if(item.currentStart === null || item.currentEnd === null) {
            
         }else if(item.currentEnd >= currentDate){
            userIdsCancelled.push(item.userId)            
         }else{
            console.log(false)
         }
      } else if(item.status === 'active' && item.planId === process.env.NEXT_PUBLIC_1_YEAR_MONTHLY_PREMIUM_PLAN_ID){
         userIdsYearlyActivePremium.push({ userId : item.userId, lastUpdated : item.updatedAt })
      }
    });

    if (userIdsCancelled.length > 0) {
      const res = await db.$transaction(
        userIdsCancelled.flatMap(userId => [
          db.user.update({
            where: { id: userId },
            data: { subscription: 'free' }
          }),
          db.subscriptionQuota.update({
            where: {userId : userId },
            data: { 
               subscriptionStatus: 'free',
               aiChatWithDoc : 2,
               aiImages : 5,
               aipresentation : 0,
               gpt3_5Question : 10,
               gpt4Question : 2,
               gpt4oQuestion : 3,
               textToSpeech : 200
             } 
          })
        ])
      );
    }
    if (userIdsYearlyActivePremium.length > 0) {
      const transactionPromises = userIdsYearlyActivePremium.flatMap(data => {
         const lastUpdatedDate = new Date(data.lastUpdated);
         const futureDate = new Date(lastUpdatedDate);
         futureDate.setMonth(futureDate.getMonth() + 1);

         // if lastupdated + 30 days less than current date
          if (futureDate <= new Date()) {
              return [
                  db.subscriptionDetail.updateMany({
                      where: { userId: data.userId },
                      data: { updatedAt: new Date() }
                  }),
                  db.subscriptionQuota.update({
                      where: { userId: data.userId },
                      data : {
                         aiChatWithDoc : 2,
                         aiImages : 5,
                         aipresentation : 0,
                         gpt3_5Question : 10,
                         gpt4Question : 2,
                         gpt4oQuestion : 3,
                         textToSpeech : 200,
                      }
                  })
              ];
          }
          return []; 
      }).filter(promise => promise !== undefined);
  
      if (transactionPromises.length > 0) {
          const res = await db.$transaction(transactionPromises);
      }
  }

   return Response.json({ response: 'ok', message: `Updated the database at ${currentDate}`},{status : 200});
   }catch(e){
      return Response.json({ response: 'ok', message: `Error Occured Due to ${e}`},{status: 500 });
   }
}


