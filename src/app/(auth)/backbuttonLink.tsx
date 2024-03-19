"use client";

import Link from "next/link";

interface BackButtonProps {
  link: string;
  text: string;
  label: string;
}

export const BackButtonLink = ({ link, text, label }: BackButtonProps) => {
  return (
    <div className="text-center align-middle text-base mt-4">
      {text}&nbsp;
      <Link href={link} className="text-blue-400">
        {label}
      </Link>
    </div>
  );
};

