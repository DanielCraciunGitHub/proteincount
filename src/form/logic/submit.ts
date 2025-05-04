"use server";

import { FormState } from "@/form/formZodSchema";

export async function submitForm(formData: FormState) {
  console.log(formData);
}
