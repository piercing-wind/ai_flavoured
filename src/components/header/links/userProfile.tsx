"use client";
import { Logout } from "@/actions/logout";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { UserIcon } from "@/components/userIcon";
export const UserProfile = ({ userData }: { userData: any }) => {
  const [display, setDisplay] = useState(false);
  const user = userData?.data?.user;    
  const userProfileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userProfileRef.current && !(userProfileRef.current as HTMLElement).contains(event.target as Node)) {
        setDisplay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (userData.status === "authenticated") {
    return (
      <>
        <div className="relative inline-block z-30 cursor-pointer" ref={userProfileRef}>
          <div className="ml-3 md:mx-5" 
          onClick={() => {
            if (display) {
              setDisplay(false);
            } else {
              setDisplay(true);
            }
          }}
          >
        <UserIcon userImage={user?.image} />
          </div>
      {display ? (
            <div className="absolute w-[230px] sm:w-72 right-0 mt-4 rounded-md p-3 backdrop-blur-3xl overflow-auto" style={{ border: '1px solid #ff0783' }}>
                  <div className=" text-sm md:text-lg">
                        <h5 className="font-semibold">{user?.name}</h5>
                        <p className="text-sm">{user?.email}</p>
                        <p>{user?.subscription}</p>
                        <p className="my-2 py-1" style={{ borderTop: '0.5px solid #4d2f4fd8', borderBottom: '0.5px solid #4d2f4fd8' }} >Personal</p>
                        <div className="flex items-center justify-between">
                          <p>Theme</p> &nbsp; <div className="right"><ThemeSwitch/></div>
                        </div>
                        <button style={{ border: '0.5px solid #ff0783' }} className="flex px-5 rounded-2xl justify-center items-center mt-2 hover:bg-zinc-800" onClick={() => Logout()}>Log out</button>
                  </div>
            </div>
      ) : (
            <></>
      )}
          {/* <p>{userData?.name}</p>
          <p>{userData?.email}</p> */}
        </div>
      </>
    );
  }else if(userData.status === "loading"){
    return (
      <CircleLoader size={35} color="#a60075" loading  className="mx-5"/>
    )}
};
