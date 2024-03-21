"use client";
import { Logout } from "@/actions/logout";
import { useState } from "react";
import { CircleLoader } from "react-spinners";
import { FaUser } from "react-icons/fa6"
export const UserProfile = ({ userData }: { userData: any }) => {
  const [display, setDisplay] = useState(false);
  const user = userData?.data?.user;    
  if (userData.status === "authenticated") {
    return (
      <>
        <div className="relative inline-block z-30">
          <div className="rounded-full h-7 w-7 md:h-9 md:w-9 justify-center items-center flex mx-3 md:mx-5" 
          style={{backgroundColor: "#ff0783"}}
          onClick={() => {
            console.log("Avatar clicked");
            if (display) {
              setDisplay(false);
            } else {
              setDisplay(true);
            }
          }}
          >
          {user?.image === null ? (<FaUser className="h-3 w-3 sm:h-5 sm:w-5"/>) : (
          <img
            className="rounded-full"
            src={user?.image || ""}
            alt="user"
          />)}
          </div>
      {display ? (
            <div className="absolute w-[230px] sm:w-72 right-0 mt-4 rounded-md p-3 backdrop-blur-3xl overflow-auto" style={{ border: '1px solid #ff0783' }}>
                  <div className=" text-sm md:text-lg">
                        <h5 className="font-semibold">{user?.name}</h5>
                        <p className="text-sm">{user?.email}</p>
                        <p className="my-2 py-1" style={{ borderTop: '0.5px solid #4d2f4fd8', borderBottom: '0.5px solid #4d2f4fd8' }} >Personal</p>
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
