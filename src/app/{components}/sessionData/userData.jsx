import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const UserData = async () => {
  const session = await getServerSession(options);
  const user = session?.user;

  if (session) {
    console.log("User : ", user.email);
    console.log("User : ", user);
    return (
      <>
        <p>
          {user.roles === "Admin" || user.roles === "GitHub User" ? user.login : user.email}
        </p>
        <p>{user.roles}</p>
      </>
    );
  } else {
    return (
      <>
        <p>No Session...</p>
      </>
    );
  }
};
