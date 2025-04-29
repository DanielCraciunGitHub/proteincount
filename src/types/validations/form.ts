import { z } from "zod";

export const formStateSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.enum(["male", "female"]),
  activityLevel: z.enum([
    "sedentary",
    "lightlyActive",
    "active",
    "veryActive",
  ]),
  height: z.object({
    unit: z.enum(["cm", "feet"]),
    feet: z.number(),
    inches: z.number(),
    cm: z.number(),
  }),
  weight: z.object({
    unit: z.enum(["kg", "lbs"]),
    pounds: z.number(),
    kg: z.number(),
  }),
  dietType: z.enum([
    "vegetarian",
    "vegan",
    "pescitarian",
    "no diet",
    "carnivore",
  ]),
  allergies: z.array(z.string()),
  meals: z.array(
    z.object({
      mealOrSnack: z.enum(["meal", "snack"]),
      size: z.enum(["small", "medium", "large"]),
      description: z.string(),
    })
  ),
});

export type FormState = z.infer<typeof formStateSchema>;
