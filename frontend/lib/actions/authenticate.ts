"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.cause?.err?.message) {
        case "Invalid credentials":
          return {
            message: "Credenciales incorrectas",
          };
        default:
          return {
            message: "Hubo un error al iniciar sesión",
          };
      }
    }
    throw error;
  }
}
