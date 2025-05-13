import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { getProfileData } from "./_actions/profile";

export default async function ProfilePage() {
  const sessionInstance = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionInstance) {
    redirect("/");
  }

  const profileData = await getProfileData(sessionInstance.user.id);

  // const proteinCount = await getProteinCountCompletion([
  //   {
  //     role: "system",
  //     content: `
  //     You are a helpful data analyst and food expert.
  //     You are given personal data of a user and a list providing a description of the user's meals.
  //     You must analyse the data and provide an estimate of the user's protein intake for this day.
  //     `,
  //   },
  //   {
  //     role: "user",
  //     content: `
  //     Here is the list of food items and their protein counts:
  //     ${JSON.stringify(profileData.meals, null, 2)}
  //     `,
  //   },
  // ]);

  return <div>{JSON.stringify(profileData, null, 2)}</div>;
}
