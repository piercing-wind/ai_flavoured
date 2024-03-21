import Styles from "./header/header.module.css";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
export const TryForFreeButton = () => {
  return (
    <button
      className={cn(
        buttonVariants({
          size: "sm",
          className:
            "my-2 ml-2 h-7 font-normal text-xs py-2 px-2 rounded-2xl sm:h-9 sm:px-4 md:m-6 md:text-base border",
        }),
        Styles.btnh
      )}

    >
      Try For Free
    </button>
  );
};
