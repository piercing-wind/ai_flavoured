import {ResetPasswordForm} from './ResetPasswordForm';
import {BackButtonLink} from '../backbuttonLink';
const ResetPasswordPage = () => {
  return (
      <div className="z-10 md:px-14 xl:px-28 py-9">
      <h1 className=" text-2xl md:text-3xl font-bold p-4 text-center">
        Reset password
      </h1>
      <ResetPasswordForm />
      {/*  div className="text-center mt-4 align-middle">* OR *</div> */}
      {/* <SocialLogin label="Continue with" />
      <div
        className={cn("mx-auto w-1/3 border-t mt-5", Styles.borderColor)}
      ></div> */}
      <BackButtonLink link="/login" text="Back to" label="Login!" />
    </div>
  );
}
export default ResetPasswordPage;