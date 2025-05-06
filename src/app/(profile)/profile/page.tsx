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

  return <div>Profile {JSON.stringify(profileData, null, 2)}</div>;
}
