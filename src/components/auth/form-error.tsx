import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="mt-4 block items-center text-red-600 bg-destructive/15  border-red-600 border p-4 rounded-md gap-x-2 text-center text-base text-destructive">
      <HiOutlineExclamationTriangle className=" h-5 w-5 inline" />&nbsp;&nbsp;
      <span className="text-md">{message}</span>
    </div>
  );
};
