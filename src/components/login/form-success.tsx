import { FaRegCircleCheck } from "react-icons/fa6";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="mt-5 flex items-center text-green-500 bg-destructive/15 rounded-md gap-x-2 text-sm text-destructive">
      <FaRegCircleCheck className=" h-5 w-5" />
      <span className="text-md">{message}</span>
    </div>
  );
};
