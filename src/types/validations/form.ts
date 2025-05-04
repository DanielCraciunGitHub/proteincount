import {
  activityLevels,
  allergies,
  dietTypes,
  gender,
  mealSizes,
  mealTypes,
} from "@/data/formDataSchema";
import { z } from "zod";

export const formStateSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
  age: z.coerce.number({
    required_error: "Please enter your age",
    invalid_type_error: "Please enter a valid age",
  }),
  gender: z.enum(gender, {
    message: "Please select your gender",
  }),
  activityLevel: z.enum(activityLevels, {
    message: "Please select an activity level",
  }),
  height: z.discriminatedUnion("unit", [
    z.object({
      unit: z.literal("cm"),
      cm: z.coerce.number().min(1, {
        message: "Please enter a valid height",
      }),
    }),
    z.object({
      unit: z.literal("feet"),
      feet: z.coerce.number().min(1, {
        message: "Please enter a valid feet value",
      }),
      inches: z.coerce.number().min(1, {
        message: "Please enter a valid inches value",
      }),
    }),
  ]),
  weight: z.discriminatedUnion("unit", [
    z.object({
      unit: z.literal("kg"),
      kg: z.coerce.number().min(1, {
        message: "Please enter a valid weight",
      }),
    }),
    z.object({
      unit: z.literal("lbs"),
      lbs: z.coerce.number().min(1, {
        message: "Please enter a valid weight",
      }),
    }),
  ]),
  dietType: z.enum(dietTypes, {
    required_error: "Please select a diet type",
  }),
  allergies: z.array(
    z.enum(allergies, {
      required_error: "Please select at least one allergy",
    })
  ),
  meals: z.array(
    z.object({
      mealOrSnack: z.enum(mealTypes),
      size: z.enum(mealSizes),
      description: z.string().min(20, {
        message: "Description must be at least 20 characters long",
      }),
    })
  ),
});

export type FormState = z.infer<typeof formStateSchema>;
