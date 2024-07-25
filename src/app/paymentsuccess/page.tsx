import Link from "next/link";

const Page = () => {
   return (
      <div className="h-screen overflow-hidden w-full flex flex-col items-center justify-center gap-5">
         <h1 className="text-2xl font-bold">Thank you for your purchase. <span className="text-green-500">Your payment was successfully processed.</span></h1>
         <p>Your subscription is now active. We appreciate your trust in our services and hope you enjoy the benefits.</p>
         <Link href="/flavours" className="text-xl font-semibold py-2 rounded-3xl w-36 bg-aiflavoured shadow-lg text-center hover:bg-pink-600">Start</Link>
      </div>
   );
};
export default Page;