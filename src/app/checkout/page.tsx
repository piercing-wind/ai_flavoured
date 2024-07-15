import { PaypalButton } from "@/components/paypal";
import { getCurrentRate } from "@/lib/timezoneAndCurrency";
import {prices} from "@/components/globalVariables";



type Plan = keyof typeof prices;

interface PageProps {
  searchParams: { [key: string]: string };
}

const Page: React.FC<PageProps> = ({ searchParams }) => {
  const plan = searchParams.plan as Plan;

  if (!plan || !(plan in prices)) {
    return <div>Invalid plan</div>;
  }

  const price = prices[plan];
  const value = (plan.includes('annual') ? price * 12 : price).toFixed(2);
  const InrRate = getCurrentRate["INR"]

  const INR = Math.round((InrRate * parseFloat(value) * 10)) * 10;

   
   return (
      <div className="h-[100vh] w-full overflow-hidden flex bg-white text-black">
         <div className="w-[50%] border flex flex-col items-center justify-center">
            <h1>Subscription {searchParams.plan}</h1>
            <h1>Checkout</h1>
              <h1>$ {value}</h1> 
         </div> 
         <div className="flex items-center justify-center w-[50%] h-full overflow-hidden">
           <div className="w-[25rem]">
            <PaypalButton  />
           </div>
         </div>
      </div>
   )
}
export default Page;