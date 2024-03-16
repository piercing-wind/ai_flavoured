import { auth } from "@/auth";

export const UserData = async () => {
  const session = await auth();
  const user = session?.user;
   console.log("Session : ", session);

  if (session) {
    // console.log("User : ", user.email);
    // console.log("User : ", user);
    return (
      <>
        <p>
          {user.email}
        </p>
        <p>{user.role}</p>
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
