import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Styles from "./header/header.module.css";
import { buttonVariants } from "../{components}/ui/button";
import { cn } from "@/lib/utils";
export const TryForFreeButton = () => {
  return (
    <button
      className={cn(
        buttonVariants({
          size: "sm",
          className:
            "btnh my-2 ml-2  text-white font-semibold py-2 px-2 rounded-xl sm:px-4 sm:rounded-2xl md:m-6 md:text-base border",
        }),
        Styles.btnh
      )}

    >
      Try For Free
    </button>
  );
};
