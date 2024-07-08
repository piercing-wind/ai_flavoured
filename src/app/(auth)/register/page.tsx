import React from "react";
import { RegisterForm } from "./register-form";
import { SocialLogin } from "@/components/auth/socialLogin";
import Styles from "../layout.module.css";
import { cn } from "@/lib/utils";
import { BackButtonLink } from "../backbuttonLink";

const Register = ({searchParams}:{searchParams :{ [key : string] : string}}) => {

  return (
    <>
      <div className="z-10 py-7">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center">
          Register
        </h1>
        <RegisterForm plan={searchParams.plan || '/'} callbackUrl={searchParams.callbackUrl || '/'} />
        <div className="text-center mt-4 align-middle">* OR *</div>
        <SocialLogin plan={searchParams.plan} callbackUrl={searchParams.callbackUrl || '/'} label="Sign in with" />
        <div
          className={cn("mx-auto w-1/3 border-t mt-5", Styles.borderColor)}
        ></div>
        <BackButtonLink
          link="/login"
          text="Already have an account?"
          label="Login here"
        />
      </div>
    </>
  );
};
export default Register;
