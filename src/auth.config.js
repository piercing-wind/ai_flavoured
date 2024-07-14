import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUserSchema } from "./schemas/index";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
          try {
          const validatedFields = LoginUserSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) return user;
          }
        } catch (error) {
          return null;
        }a
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,  
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // profile(profile) {
      //   console.log(GithubProvider);
      //   // console.log("Profile GitHub : ", profile);
      //   let userRoles = "GitHub User";
      //   if (profile?.email === "sourabhsharma5677@gmail.com") {
      //     userRoles = "Admin";
      //   }
      //   return {
      //     ...profile,
      //     roles: userRoles,
      //   };
      // },
    }),
    GoogleProvider({
      // profile(profile) {
      //   // console.log("Profile Google : ", profile);
      //   let userRoles = "Google User";
      //   return {
      //     ...profile,
      //     id: profile.sub,
      //     roles: userRoles,
      //   };
      // },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    FacebookProvider({
      profile(profile) {
        console.log("Profile Facebook : ", profile);
        let userRoles = "Facebook User";
        return {
          ...profile,
          id: profile.sub,
          roles: userRoles,
        };
      },
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],
  trustHostedDomain: true,
  trustHost: true,
  debugger : false,
};
