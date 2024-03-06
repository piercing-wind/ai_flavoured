import { auth } from "../../../../auth";

export const UserData = async () => {
  const session = await auth();
  const user = session?.user;
  // console.log("Session : ", session);

  if (session) {
    // console.log("User : ", user.email);
    // console.log("User : ", user);
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
