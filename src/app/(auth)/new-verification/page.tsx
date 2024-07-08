import { NewVerificationContent } from "./newVerification";
import { Suspense } from "react";
import { BackButtonLink } from "../backbuttonLink";

const Verification = ({searchParams}:{searchParams:{ [key : string] : string}}) => {
   
   const  callbackUrl = searchParams.callbackUrl;
  return (
    <>
      <div className="z-10 md:px-14 xl:px-28 py-9 justify-center items-center">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center sm:mt-36">
          Email Verification
        </h1>
        <Suspense>
        <NewVerificationContent />
        </Suspense>
        <BackButtonLink link={`/login?callbackUrl=${callbackUrl}`} text="" label="Back to Login" />
      </div>
    </>
  );
};
export default Verification;
