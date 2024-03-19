import { BackButtonLink } from "../backbuttonLink";
import { NewPasswordForm } from "./newPassword";
import { Suspense } from 'react'

const NewPasswordPage = () => {
  return (
    <>
    <Suspense>
      <div className="z-10 md:px-14 xl:px-28 py-9">
        <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center">
          Change password
        </h1>
        <p>Enter a new password!</p>
        <NewPasswordForm />
        <BackButtonLink link="/login" text="Back to" label="Login!" />
      </div>
      </Suspense>
    </>
  );
};
export default NewPasswordPage;
