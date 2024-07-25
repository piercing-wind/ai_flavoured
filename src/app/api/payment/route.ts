import { NextRequest } from "next/server";
import crypto from 'crypto';
import {db} from "@/lib/db";
import { paymentSuccess } from "@/lib/paymentSuccess";



function validateRazorpaySignature(body: string, receivedSignature: string, secret: string): boolean {
   const expectedSignature = crypto.createHmac('sha256', secret)
                                    .update(body)
                                    .digest('hex');
   return receivedSignature === expectedSignature;
 }


export async function GET(){
   return Response.json({ response: 'Forbidden', message: 'Access is restricted'},{status: 403 });
}

export async function POST(req: NextRequest){
   const razorpay = await req.json();
   const signatureHeader = req.headers.get('x-razorpay-signature');
   if(!signatureHeader) return  Response.json({ response: 'Forbidden', message: 'Signature is Missing'},{status: 403 });
   if(!validateRazorpaySignature(JSON.stringify(razorpay), signatureHeader, process.env.RAZOR_PAY_SECRET!)) return Response.json({ response: 'Access Ristricted', message: 'Invalid Signature'},{status: 403 });
   const {payload} = razorpay;
   const {payment} =  payload;
   const {subscription} = payload;
   try{
      switch (razorpay.event) {
    
         case 'subscription.activated':
            await db.$transaction(async (db) => {
            const subscriptionDetail = await db.subscriptionDetail.create({
               data: {
                   subscriptionId: subscription.entity.id,
                   planId: subscription.entity.plan_id,
                   status: subscription.entity.status,
                   startAt: subscription.entity.start_at,
                   endAt: subscription.entity.end_at,
                   paymentMethod: subscription.entity.payment_method,
                   createdAt: subscription.entity.created_at,
                   userEmail : subscription.entity.notes.email,
                   userId : subscription.entity.notes.id,
                   currentStart : subscription.entity.current_start,
                   currentEnd : subscription.entity.current_end,
                   chargeAT : subscription.entity.charge_at,
                   expiresBy  : subscription.entity.expire_by,
                 },
            });
           
         });
            break;

         case 'subscription.charged':

         const res = await db.$transaction(async (db) => {
            switch (subscription.entity.plan_id) {
               case process.env.NEXT_PUBLIC_MONTHLY_UNMLIMITED_PLAN_ID:
               case process.env.NEXT_PUBLIC_UNLIMITED_ANNUAL_PLAN_ID:
                  if(payment.entity.status === 'captured'){
                  await db.user.update({
                     where: { id: subscription.entity.notes.id },
                     data: {subscription : "unlimited" },
                  })
                  await db.subscriptionQuota.update({
                     where:{'userId': subscription.entity.notes.id},
                     data:{
                        aiChatWithDoc : 0,
                        aiImages : 0,
                        aipresentation : 0,
                        gpt3_5Question : 0,
                        gpt4Question  : 0,
                        gpt4oQuestion : 0,
                        subscriptionStatus : 'unlimited',
                        textToSpeech : 0,
                     }
                  })
               }else{
                  db.user.update({
                     where: { id: subscription.entity.notes.id },
                     data: {subscription : "free" },
                  })
                  db.subscriptionQuota.update({
                     where:{'userId': subscription.entity.notes.id},
                     data:{
                        aiChatWithDoc : 1,
                        aiImages : 2,
                        aipresentation : 0,
                        gpt3_5Question : 10,
                        gpt4Question  : 3,
                        gpt4oQuestion : 2,
                        subscriptionStatus : 'free',
                        textToSpeech : 200,
                     }
                  })
               }
               break;
               case process.env.NEXT_PUBLIC_MONTHLY_PREMIUM_PLAN_ID:
               case process.env.NEXT_PUBLIC_1_YEAR_MONTHLY_PREMIUM_PLAN_ID:
                  if(payment.entity.status === 'captured'){
                  await db.user.update({
                     where:{id : subscription.entity.notes.id},
                     data:{subscription : "premium"}
                  })
                  
                  await db.subscriptionQuota.update({
                     where:{'userId': subscription.entity.notes.id},
                     data:{
                        aiChatWithDoc : 2,
                        aiImages : 150,
                        aipresentation : 15,
                        gpt3_5Question : 2000,
                        gpt4Question  : 100,
                        gpt4oQuestion : 200,
                        subscriptionStatus : 'premium',
                        textToSpeech : 15000,
                     }
                  })
            
                 }else{
                  db.user.update({
                     where: { id: subscription.entity.notes.id },
                     data: {subscription : "free" },
                  })
                  db.subscriptionQuota.update({
                     where:{'userId': subscription.entity.notes.id},
                     data:{
                        aiChatWithDoc : 1,
                        aiImages : 2,
                        aipresentation : 0,
                        gpt3_5Question : 10,
                        gpt4Question  : 3,
                        gpt4oQuestion : 2,
                        subscriptionStatus : 'free',
                        textToSpeech : 200,
                     }
                  })
               }
               }   
               
          await db.transaction.create({
                data: {
                    currency: payment.entity.currency,
                    status: payment.entity.status,
                    orderId: payment.entity.order_id,
                    international: payment.entity.international,
                    paymentMethod: payment.entity.method,
                    cardId: payment.entity.card_id,
                    card : payment.entity.card,
                    bank: payment.entity.bank,
                    wallet: payment.entity.wallet,
                    vpa: payment.entity.vpa,
                    email: payment.entity.email,
                    contact: payment.entity.contact,
                    tokenId: payment.entity.token_id,
                    fee: payment.entity.fee,
                    tax: payment.entity.tax,
                    errorCode: payment.entity.error_code,
                    errorDes: payment.entity.error_description,
                    rrn: payment.entity.acquirer_data.rrn,
                    upiTnxID: payment.entity.acquirer_data.upi_transaction_id,
                    createdAt: payment.entity.created_at,
                    subscriptionId : subscription.entity.id,
                },
            });

        });
         case 'subscription.pending': 
         case 'subscription.halted':
         case 'subscription.completed':
         case 'subscription.paused':
            await db.$transaction(async (db) => {
               db.subscriptionDetail.update({
                 where:{ subscriptionId : subscription.entity.id},
                 data:{
                    'status' : subscription.entity.status,
                 }
              }),
               db.user.update({
                   where:{ id : subscription.entity.notes.id},
                   data:{
                     subscription : 'free',
                   }
               }),
               db.subscriptionQuota.update({
                  where:{'userId': subscription.entity.notes.id},
                  data:{
                     subscriptionStatus : 'free',
                     aiChatWithDoc : 2,
                     aiImages : 5,
                     aipresentation : 0,
                     gpt3_5Question : 10,
                     gpt4Question : 2,
                     gpt4oQuestion : 3,
                     textToSpeech : 200,
                  }
               })
           });
              break; 


         case 'subscription.cancelled':
            console.log("Subscription Cancelled");
          await db.$transaction(async (db) => {
             db.subscriptionDetail.update({
               where:{ subscriptionId : subscription.entity.id},
               data:{
                  'status' : subscription.entity.status,
               }
            })
         });
            break;

  }
   return Response.json({ response: 'ok', message: 'Action processed successfully'},{status: 200 });
   }catch(e){
      console.log("Error",e);
   }
   // fs.writeFileSync('output/data.json', JSON.stringify(body));
   return Response.json({ response: 'ok', message: 'Action processed successfully'},{status: 200 });

}