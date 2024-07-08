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
import { RegisterUserSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { useState, useTransition } from "react";
import { Register } from "@/actions/register";
export const RegisterForm = ({callbackUrl, plan}:{callbackUrl : string, plan : string}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isTwoFAEnabled: false,
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterUserSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      Register(values,callbackUrl, plan).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="your_nice@email.com"
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
                      placeholder="your secret password"
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
                  <FormLabel className="text-lg">Confirm Password</FormLabel>
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
          <div className="flex items-center mt-6 text-sm text-pink-100">
          <FormField
              control={form.control}
              name="isTwoFAEnabled"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="text-lg">Confirm Password</FormLabel> */}
                  <FormControl>
                    <input 
                    style={{backgroundColor: "pink"}}
                    className="h-4 w-4 bg-transparent text-pink-600 flex "
                      {...field}
                      disabled={isPending}
                      placeholder=""
                      type="checkbox"
                      value={field.value ? "true" : "false"} // Fix: Convert boolean value to string
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            &nbsp;
            &nbsp;
            <p> Would you like to Enable Two Factor Authenticaion?</p>
            </div>
          <Button
            type="submit"
            variant="glow"
            className="w-full text-lg mt-8"
            disabled={isPending}
          >
            Create an account
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </>
  );
};
