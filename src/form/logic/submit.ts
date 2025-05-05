"use server";

import { headers } from "next/headers";
import { db } from "@/db";
import { profileData } from "@/db/schema";
import { FormState } from "@/form/formZodSchema";

import { auth } from "@/lib/auth";

export async function submitForm(formData: FormState) {
  const { height, weight, ...rest } = formData;

  const sessionInstance = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionInstance) {
    throw new Error("Unauthorized");
  }

  const heightValueInCm =
    height.unit === "cm" ? height.cm : height.feet * 12 + height.inches;

  const weightValueInKg =
    weight.unit === "kg" ? weight.kg : weight.lbs * 2.20462;

  await db.insert(profileData).values({
    height: heightValueInCm,
    weight: weightValueInKg,
    userId: sessionInstance.user.id,
    ...rest,
  });
  console.log(formData);
}
