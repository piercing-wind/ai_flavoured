import { FaRegCircleCheck } from "react-icons/fa6";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="mt-4 block text-center items-center text-green-600 bg-destructive/15  border-green-600 border p-4 rounded-md gap-x-2 text-base text-destructive">
      <FaRegCircleCheck className=" h-5 w-5 inline" />&nbsp;&nbsp;  
      <span className="text-md">{message}</span>
    </div>
  );
};
