import { FaUser } from "react-icons/fa6"
export const UserIcon = ({userImage}:{userImage : string | null}) => {
  return (
    <div
      className="rounded-full h-7 w-7  justify-center items-center flex md:h-9 md:w-9"
      style={{ backgroundColor: "#ff0783" }}

    >
      {userImage === null ? (
        <FaUser className="h-3 w-3 sm:h-5 sm:w-5" />
      ) : (
        <img className="rounded-full" src={userImage|| ""} alt="user" />
      )}
    </div>
  );
};
