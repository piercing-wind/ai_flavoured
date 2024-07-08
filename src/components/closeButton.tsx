"use client";
import { MdOutlineClose } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaypalButton } from "./paypal";
import { useState } from "react";

export const CloseButton = ({
  close,
  className = "",
}: {
  close: (v: boolean) => void;
  className?: string;
}) => {
  return (
    <div className={`${className}`} onClick={() => close(false)}>
      <MdOutlineClose />
    </div>
  );
};

export const PurchaseButton = ({
  children,
  className = "",
  purchase,
}: {
  children: string;
  className?: string;
  purchase?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover>
      <PopoverTrigger
        onClick={() => {
          setIsOpen(true);
        }}
        className={`flex items-center justify-center font-bold h-12 rounded-md ${className}`}
        style={{ boxShadow: "0 0 5px #ff0786" }}
      >
        {children} <FaAngleRight className="mx-5" />
      </PopoverTrigger>
      {isOpen && (
        <PopoverContent className="h-[18rem] w-[25rem] backdrop-blur-md">
          <CloseButton close={setIsOpen} />
          <PaypalButton amount={"9.37"} />
        </PopoverContent>
      )}
    </Popover>
  );
};
