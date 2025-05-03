import { z } from "zod";

export const activityLevels = [
  "sedentary",
  "lightlyActive",
  "active",
  "veryActive",
] as const;

export const heightUnits = ["cm", "feet"] as const;

export const weightUnits = ["kg", "lbs"] as const;

export const dietTypes = [
  "vegetarian",
  "vegan",
  "pescitarian",
  "no diet",
  "carnivore",
] as const;

export const gender = ["male", "female"] as const;

export const mealSizes = ["small", "medium", "large"] as const;

export const mealTypes = ["meal", "snack"] as const;

export const allergies = [
  "gluten",
  "dairy",
  "eggs",
  "peanuts",
  "soy",
  "treeNuts",
  "fish",
  "shellfish",
] as const;

export const formStateSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.enum(gender),
  activityLevel: z.enum(activityLevels),
  height: z.object({
    unit: z.enum(heightUnits),
    feet: z.number(),
    inches: z.number(),
    cm: z.number(),
  }),
  weight: z.object({
    unit: z.enum(weightUnits),
    pounds: z.number(),
    kg: z.number(),
  }),
  dietType: z.enum(dietTypes),
  allergies: z.array(z.enum(allergies)),
  meals: z.array(
    z.object({
      mealOrSnack: z.enum(mealTypes),
      size: z.enum(mealSizes),
      description: z.string(),
    })
  ),
});

export type FormState = z.infer<typeof formStateSchema>;
