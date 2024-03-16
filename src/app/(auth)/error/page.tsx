import React from "react";
import { BackButtonLink } from "../backbuttonLink";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const AuthError = () => {
  return (
    <>
      <div className="z-10 md:px-14 xl:px-28 py-9 justify-center text-center items-center">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center sm:mt-36">
          Error
        </h1>
        <div className="p-4 text-sm">Something went wrong! Please try again.</div>
      <HiOutlineExclamationTriangle className="text-3xl text-red-500 mx-auto" />
        <BackButtonLink
          link="/login"
          text=""
          label="Back to Login"
        />
      </div>
    </>
  );
};
export default AuthError;
