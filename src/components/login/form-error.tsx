import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="mt-4 flex items-center text-red-500 bg-destructive/15 rounded-md gap-x-2 text-sm text-destructive">
      <HiOutlineExclamationTriangle className=" h-5 w-5" />
      <span className="text-md">{message}</span>
    </div>
  );
};
