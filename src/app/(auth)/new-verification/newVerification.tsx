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
  const [loading, setLoading] = useState(false);

  const searchPramas = useSearchParams();
  const token = searchPramas.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing Token");
      return;
    }
  setLoading(true);
   await newVerification(token)
      .then((data: any) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      {loading && (
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
