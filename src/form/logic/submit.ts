"use server";

import { db } from "@/db";
import { profileData } from "@/db/schema";
import { FormState } from "@/form/formZodSchema";

export async function initializeProfileData(
  formData: FormState,
  userId: string
) {
  const { height, weight, ...rest } = formData;

  const heightValueInCm =
    height.unit === "cm" ? height.cm : height.feet * 12 + height.inches;

  const weightValueInKg =
    weight.unit === "kg" ? weight.kg : weight.lbs * 2.20462;

  const [data] = await db
    .insert(profileData)
    .values({
      height: heightValueInCm,
      weight: weightValueInKg,
      ...rest,
      userId,
    })
    .onConflictDoNothing()
    .returning();

  return data.id;
}
