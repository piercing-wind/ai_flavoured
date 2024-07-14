"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "../../../../tmp/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useState, useTransition } from "react";
import { NewPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";
export const NewPasswordForm = () => {
 const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
     NewPassword(values, token).then((data: any) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder=""
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant="glow"
            className=" w-full text-lg"
            disabled={isPending}
          >
            Reset Password
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </>
  );
};
