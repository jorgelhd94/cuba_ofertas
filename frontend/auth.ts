import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { getApiUrl } from "./lib/utils/api/api";


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const parsedCredentials = z
          .object({ username: z.string().min(3), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const res = await fetch(getApiUrl("/auth/login/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
            }),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          const user = await res.json();

          if (user) {
            return user;
          }

          if (!user) return null;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
