
export const plans ={
   '1-month-premium' : 'plan_OZwb56H6Jq5SAa',
   '1-month-unlimited' : 'plan_OZwb56H6Jq5SAa',
   'annual-premium' : 'plan_OZwb56H',
   'annual-unlimited' : process.env.NEXT_PUBLIC_UNLIMITED_ANNUAL_PLAN_ID,
}

export const prices = {
   '1-month-unlimited' : 37.30, //USD
   '1-month-premium' : 9.34,  //USD
   'annual-unlimited' : 31.7,  //USD
   'annual-premium' : 7.9,  //USD
}
export type User ={
   name: string,
   email: string,
   image: string,
   role: string,
   subscription: "free" | "premium" | "unlimited",
   id: string,
   timeZone: string
 }