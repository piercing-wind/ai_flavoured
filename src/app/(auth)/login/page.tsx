import React from "react";
import { LoginForm } from "./login-form";
import { SocialLogin } from "@/components/auth/socialLogin";
import Styles from "../layout.module.css";
import { cn } from "@/lib/utils";
import { BackButtonLink } from "../backbuttonLink";
import { Suspense } from 'react'

const Login = ({searchParams} : {searchParams :{ [key : string] : string}}) => {
   return (
    <>
    <Suspense>
      <div className="z-10 md:px-14 xl:px-28 py-9">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center">
          Login
        </h1>
        <LoginForm />
        <div className="flex">
          <BackButtonLink
            link="/reset-password"
            text=""
            label="Forgot password?"
          />
        </div>
        <div className="text-center mt-4 align-middle">* OR *</div>
        <SocialLogin label="Continue with" callbackUrl={searchParams.callbackUrl} plan={searchParams.plan} />
        <div
          className={cn("mx-auto w-1/3 border-t mt-5", Styles.borderColor)}
        ></div>
        <BackButtonLink
          link={`/register?callbackUrl=${searchParams.callbackUrl || "/"}`}
          text="Dont have an account?"
          label="Create here"
        />
      </div>
      </Suspense>
    </>
  );
};
export default Login;
