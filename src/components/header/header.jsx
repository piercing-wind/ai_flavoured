import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
import { TryForFreeButton } from "../ButtonTryForFree";
config.autoAddCss = false;

import Styles from "./header.module.css";
import { Links } from "./links/links";
import { MobileMenu } from "./mobileMenu";
import AuthProvider from "@/components/AuthProvider";

export const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-3xl font-bold glow ml-2 mr-2  whitespace-nowrap sm:text-5xl md:ml-6 lg:text-7xl"
      >
        Ai Flavoured
      </Link>
    </div>
  );
};

export const Header = async () => {
  return (
    <AuthProvider>
      <div
        className={[
          "top-0 inset-x-0 h-16 sm:h-20 flex items-center justify-between xl:px-20 border-b relative",
          Styles.headerBorderColor,
        ].join(" ")}
      >
        <div className="left-10">
          <Logo />
        </div>
        <MobileMenu />
        <div className="hidden xl:flex items-center justify-center">
          <nav className={"items-center justify-center flex"}>
            <div className="items-center sm:flex text-xl sd:text-sm">
              <Links type="HeaderNav" />
            </div>
          </nav>
        </div>

        <div className="hidden xl:flex">
          <TryForFreeButton />
        </div>
      </div>
    </AuthProvider>
  );
};
