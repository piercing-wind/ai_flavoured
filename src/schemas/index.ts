import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Minimum 6 charcters Required"),
  confirmPassword: z.string().min(6, "Confirm Password is Required"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
  code : z.optional(z.string())
});

export const RegisterUserSchema = z
  .object({
    name: z.string().min(1, "Name is Required"),
    // userName: z.string().max(30, "Maximum 30 charcters allowed").min(1, "Username is Required"),
    email: z.string().email(),
    password: z.string().min(6, "Minimum 6 charcters Required"),
    confirmPassword: z.string().min(6, "Confirm Password is Required"),
    isTwoFAEnabled: z.optional(z.boolean()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  });

export const uploadToUserFileTBSchema = z.object({
  fileKey: z.string(),
  fileName: z.string(),
  userId: z.string(),
  url: z.string(),
  session: z.string(),
  fileType: z.string(),
});

const searchSchema = z.object({
  query: z.string(),
  user: z.string().optional(),
  fileName :z.string()
});

export const presentationSchema = z.object({
  selectedFiles : z.array(z.object({
    id: z.optional(z.number()),
    userId: z.string(),
    fileKey: z.string(),
    fileName: z.string(),
    url: z.string(),
    session: z.string(),
    fileType: z.string(),
    createdAt: z.optional(z.date()),
    generator : z.string()
  })),
   user :z.object({
    name: z.string(),
    id: z.string(),
    subscription: z.string(),
    email: z.string(),
    role : z.string(),
   }),
    slides : z.number(),
    wordsAmount : z.string(),
    audience : z.string(),
    imageSearch : z.string(),
    ppmodel : z.string(),
    waterMark : z.boolean(),
    variant :z.optional(z.string()),
    textInputValue : z.string(),
    themeFunction :  z.string()
});
