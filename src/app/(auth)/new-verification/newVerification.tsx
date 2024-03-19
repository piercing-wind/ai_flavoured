'use client';
import { PropagateLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useSearchParams } from "next/navigation";

export const NewVerificationContent = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchPramas = useSearchParams();
  const token = searchPramas.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data: any) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      {success && !error && (
        <div className="flex w-full justify-center p-4">
          <PropagateLoader color="#ff0783" loading={true} />
        </div>
      )}

      <div className="flex justify-center p-4">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </>
  );
};
