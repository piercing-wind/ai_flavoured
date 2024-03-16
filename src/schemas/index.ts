import * as z from "zod";
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "Name is Required"),
    // userName: z.string().max(30, "Maximum 30 charcters allowed").min(1, "Username is Required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum 8 charcters Required"),
    confirmPassword: z.string().min(8,"Confirm Password is Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  });
