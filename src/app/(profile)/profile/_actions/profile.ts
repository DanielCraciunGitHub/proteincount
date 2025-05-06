"use server";

import { db } from "@/db";
import { profileData } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProfileData(userId: string) {
  const [data] = await db
    .select()
    .from(profileData)
    .where(eq(profileData.userId, userId));

  console.log(data);
  return data;
}
