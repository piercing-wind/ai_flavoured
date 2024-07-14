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
import { ResetPasswordSchema } from "../../../../tmp/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useState, useTransition } from "react";
import { ResetPassword } from "@/actions/reset-password";
export const ResetPasswordForm = () => {
 
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      //todo: add the reset action

      ResetPassword(values).then((data: any) => {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="your@nice_email.com"
                      type="email"
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
            Procced to reset
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </>
  );
};
