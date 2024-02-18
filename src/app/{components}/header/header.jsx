import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
import {TryForFreeButton} from '../ButtonTryForFree'

config.autoAddCss = false;

import Styles from "./header.module.css";
import { cn } from "../../../lib/utils";
import {Links} from "./links/links";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import MobileMenu from "./hamburgerAndNav";
const Logo = () => {
  return (
    <>
      <Link href="/" className=" text-4xl font-bold glow md:ml-6 whitespace-nowrap sm:text-5xl ml-2 mr-2 lg:text-7xl">
        Ai Flavoured
      </Link>
    </>
  );
};

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div
      className={[
        "top-0 inset-x-0 h-20 flex items-center justify-between xl:px-20 border-b relative",
        Styles.headerBorderColor,
      ].join(" ")}
    >
      <div className="left-10">
        <Logo />
      </div>
      <MobileMenu />
      
      <div className="hidden xl:flex items-center justify-center">
        <nav className={"items-center justify-center flex"}>
          <div className="items-center sm:flex text-xl sd:text-sm text-white">
            <Links type="HeaderNav" /> 
          </div>
        </nav>
      </div>
      <div className="hidden xl:flex">
       <TryForFreeButton/>
      </div>
    </div>
  );
};
export default Header;
