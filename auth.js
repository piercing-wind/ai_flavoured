import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log(GithubProvider);
        console.log("Profile GitHub : ", profile);
        let userRoles = "GitHub User";
        if (profile?.email === "sourabhsharma5677@gmail.com") {
          userRoles = "Admin";
        }
        return {
          ...profile,
          roles: userRoles,
        };
      },
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google : ", profile);
        let userRoles = "Google User";
        return {
          ...profile,
          id: profile.sub,
          roles: userRoles,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT : ", token);
      if (user) {
        token.roles = user.roles;

        token.login = user.login;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("Session : ", session);
      if (session?.user) {
        session.user.roles = token.roles;
        session.user.login = token.login;
      }
      return session;
    },
  },
  trustHost: true,
  trustHostedDomain: true,
});
