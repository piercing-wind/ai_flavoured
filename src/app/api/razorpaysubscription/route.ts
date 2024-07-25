import { razorpayCLient } from "@/lib/razorpay";
import { NextRequest } from "next/server";

export async function GET(){

   return Response.json({ response: 'Forbidden', message: 'Access is restricted'},{status: 403 });
}

export async function POST(req: NextRequest) {
   try {
  const body = await req.json();
  const {plan, email, id, expireBy, totalCount, addonFee} = body;

  const subscription = await razorpayCLient.subscriptions.create({
    plan_id: plan,
    customer_notify: false,
    addons: [
      {
        item: {
          name: "Platform Fees",
          amount: addonFee,
          currency: "INR",
        },
      },
    ],
    total_count: totalCount,
    expire_by : expireBy,
    notes:{
      email: email,
      id: id
   },
    });
    return Response.json({ response: 'ok', subscription : subscription},{status: 200 });
   }
   catch (error) {
      console.log(error);
     return Response.json({ response: 'error', message: `Error Occured Due to ${error}`},{status: 500 });
      
  }
}
