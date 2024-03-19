import { cn } from "@/lib/utils";
import Styles from "./layout.module.css";
import { SocialLogin } from "../../components/auth/socialLogin";

const AuthLayout = ({ children }) => {
  return (
    <section>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={cn(
            "w-full  px-5 sm:px-9 my-10 mx-4 sm:w-9/12 lg:w-2/4 sm:h-[80vh] rounded-lg relative overflow-auto text-lg",
            Styles.shadowBox
          )}
        >
          {/* Background Circles */}
          <div className="absolute -z-10">
            <div className=" w-40 h-48 md:w-52 md:h-60 xl:w-80 xl:h-96 my-24 mx-38 lg:my-24 lg:mx-80 rounded-full blur-lg opacity-10 absolute bg-pink-600"></div>
            <div className=" w-40 h-48 md:w-52 md:h-60 xl:w-80 xl:h-96 my-18 mx-20 lg:my-18 lg:mx-20 rounded-full blur-lg opacity-10 absolute bg-cyan-100"></div>
            <div className=" w-40 h-48 md:w-52 md:h-60 xl:w-80 xl:h-96 my-48 mx-12 lg:my-48 lg:mx-24 rounded-full blur-lg opacity-10 absolute bg-purple-600"></div>
          </div>
          {/*  */}
          <div className="items-center justify-center text-lg">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthLayout;
