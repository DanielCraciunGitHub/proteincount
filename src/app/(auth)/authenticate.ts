"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function emailPasswordAuth(
  email: string,
  password: string,
  type: "sign-in" | "sign-up"
) {
  if (type === "sign-in") {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } else {
    await auth.api.signUpEmail({
      body: {
        name: "John Doe",
        email,
        password,
      },
    });
  }

  redirect("/profile");
}
