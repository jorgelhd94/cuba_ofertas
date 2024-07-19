import { ILoginResponse } from "@/lib/interfaces/ILoginResponse";
import type { NextAuthConfig } from "next-auth";

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAdminViews = nextUrl.pathname.startsWith("/admin");
      if (isOnAdminViews) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
    async session({ session, token }) {
      return token["user"] ? { ...session, user: token["user"] } : session;
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse =
          account.provider === "credentials" ? user : account.meta;

        if (!backendResponse) return token;

        token["user"] = (backendResponse as ILoginResponse).user;
        token["access_token"] = (backendResponse as ILoginResponse).access;
        token["refresh_token"] = (backendResponse as ILoginResponse).refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;

        return token;
      }

      if (!token["ref"]) {
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      // Refresh the backend token if necessary
      if (
        typeof token["ref"] === "number" &&
        getCurrentEpochTime() > token["ref"]
      ) {
        const response = await fetch(
          process.env.NEXTAUTH_BACKEND_URL + "auth/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: token["refresh_token"],
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        token["access_token"] = data.access;
        token["refresh_token"] = data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }

      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
