"use client";

import Link from "next/link";

interface BackButtonProps {
  link: string;
  text: string;
  label: string;
}

export const BackButtonLink = ({ link, text, label }: BackButtonProps) => {
  return (
    <div className="text-center align-middle text-sm mt-4">
      {text}&nbsp;
      <Link href={link} className="text-blue-500">
        {label}
      </Link>
    </div>
  );
};

