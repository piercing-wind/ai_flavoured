import Razorpay from 'razorpay';

export const razorpayCLient = new Razorpay({
   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
   key_secret: process.env.RAZORPAY_KEY_SECRET,
})