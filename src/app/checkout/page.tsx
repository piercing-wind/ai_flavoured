import { PaypalButton } from "@/components/paypal";
import { getCurrentRate, timezoneCurrencies } from "@/lib/timezoneAndCurrency";
import {prices, plans} from "@/components/globalVariables";
import { getUserSession } from "@/actions/userSession";
import Link from "next/link";




type Plan = keyof typeof prices;

interface PageProps {
  searchParams: { [key: string]: string };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const user = await getUserSession();
  if (!user) return <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"><h1 className="text-4xl font-bold">You are not logged in!</h1> <p>Please login here <Link href={'/login?callbackUrl=/checkout'}>Login</Link></p></div>;
  const {email, id, timeZone} = user;



  const plan = searchParams.plan as Plan;
  
  console.log(plans[plan]);



  const price = prices[plan];
  const value = parseFloat((plan.includes('annual') ? price * 12 : price).toFixed(2));
  const InrRate = getCurrentRate["INR"]
//   const INR = 
  console.log(InrRate);
  const currency = timezoneCurrencies[ timeZone as keyof typeof timezoneCurrencies];

  const symbol = currency && currency.currencySymbol ?  currency.currencySymbol : "₹";


   
   return (
      <div className="h-[100vh] w-full overflow-hidden flex bg-white text-black">
         <div className="w-[50%] border flex flex-col items-center justify-center">
            <h1>Subscription {searchParams.plan}</h1>
            <h1>Checkout</h1>
            <h1>{symbol} {(value * InrRate).toFixed(2)}</h1> 
         </div> 
         <div className="flex items-center justify-center w-[50%] h-full overflow-hidden">

         </div>
      </div>
   )
}
export default Page;