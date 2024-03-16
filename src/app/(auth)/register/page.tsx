import React from "react";
import { RegisterForm } from "./register-form";
import { SocialLogin } from "@/components/login/socialLogin";
import Styles from "../layout.module.css";
import { cn } from "@/lib/utils";
import { BackButtonLink } from "../backbuttonLink";

const Register = () => {
  return (
    <>
      <div className="z-10 py-7">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center">
          Register
        </h1>
        <RegisterForm />
        <div className="text-center mt-4 align-middle">* OR *</div>
        <SocialLogin label="Sign in with" />
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
