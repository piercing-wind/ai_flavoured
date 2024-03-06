import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "@/app/api/auth/database/databaseConfig";

const dataBaseConnectorAndQueryExecutor = async (query,values) => {
  const client = await pool.connect();
  console.log("Connected to database");
  if (!client) {
    console.error("Database connection failed!");
    return { err: "Database connection failed!" };
  }
  try {
    const result = await client.query(query,values);
    return result.rows;
  } catch (err) {
    console.error(err);
    return { err: "Database query failed!" };
  } finally {
    client.release(client);
    console.log("Database connection closed");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        console.log(GithubProvider);
        // console.log("Profile GitHub : ", profile);
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
        // console.log("Profile Google : ", profile);
        let userRoles = "Google User";
        return {
          ...profile,
          id: profile.sub,
          roles: userRoles,
        };
      },
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
  callbacks: {
    async jwt({ token, user }) {
      console.log("User : ", user);
      console.log("JWT : ", token);
     
      if (user) {
        token.roles = user.roles;
        token.login = user.login;
        try {
          // console.log("UserData............. :",user.iat, user.email, user.name, user.roles);
          await dataBaseConnectorAndQueryExecutor(
            "INSERT INTO googleusers (id,email,name, roles) VALUES ($1, $2, $3,$4)",
            [user.id, user.email, user.name, user.roles]
          );
        } catch (err) {
          console.error(err);
          return { err: "Database query failed!" };
        }
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
  pages: {
    signIn: "/login",
  },
});
