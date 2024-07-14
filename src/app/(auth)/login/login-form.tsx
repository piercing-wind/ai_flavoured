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
import { LoginUserSchema } from "../../../schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useState, useTransition } from "react";
import { Login } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";


export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const plan = searchParams.get("plan");
  const router = useRouter();
  
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another login method"
      : "";
  const [showTwoFA, setTwoFA] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Login(values)
        .then((data: any) => {
          if (data.error) {
            form.reset();
            setError(data.error);
          }
          if (data.success) {
            form.reset();
            setSuccess(data.success);
            router.push(callbackUrl ?  plan ? `${callbackUrl}?plan=${plan}` : callbackUrl : callbackUrl || "/");
          }
          if (data.twoFA) {
            setTwoFA(true);
            setSuccess("Authentication code is sent to your email");
          }
        })
        .catch((e: any) => {
          console.log("Unexpected error:", e);
          setError("An unexpected error occurred");
        });
    });
  };
  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {showTwoFA && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Security Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="_ _ _ _ _ _"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {!showTwoFA && (
              <>
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
                          placeholder=""
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button
            type="submit"
            variant="glow"
            className=" w-full text-lg"
            disabled={isPending}
          >
            {showTwoFA ? "Confirm" : "Login"}
          </Button>
          <FormSuccess message={success} />
          <FormError message={error || urlError} />
        </form>
      </Form>
    </>
  );
};
