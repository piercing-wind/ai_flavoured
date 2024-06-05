"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

interface FormErrorProps {
  message: string | undefined;
  clearMessage? : (v: string) => void;
}

export const FormError = ({ message, clearMessage }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center text-red-600 bg-destructive/15  border-red-600 border p-4 rounded-md text-center text-base text-destructive">
      <div className=" flex items-center justify-center">
        <HiOutlineExclamationTriangle className=" h-8 w-8 inline" />
        &nbsp;&nbsp;
      </div>
      <div>
        <span className="text-md">{message}</span>
      </div>
      {clearMessage &&
      <div className=" flex items-center justify-center">
        <button onClick={()=>clearMessage('')}>
          <IoMdClose className="h-5 w-5 inline right-0" />
        </button>
      </div>
      }
    </div>
  );
};
