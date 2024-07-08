import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const {auth} = NextAuth(authConfig);

import {
  publicRoutes,
  authRoutes,
  apiRoutesPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export default auth((request) => {
  const isLoggedIn = !!request.auth;
  const nextUrl = request.nextUrl;
  const route = nextUrl.pathname;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || route.startsWith('/share/');
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute){
      return null;
  }
  if(isAuthRoute){
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    if(nextUrl.searchParams.get("plan")){
      const url = `/login?callbackUrl=${nextUrl.pathname}&plan=${nextUrl.searchParams.get("plan")}`
      return  Response.redirect(new URL(url, nextUrl));
    }
    const url = `/login?callbackUrl=${nextUrl.pathname}&plan=${"free"}`
    return Response.redirect(new URL(url, nextUrl));
  }
  return null;
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
