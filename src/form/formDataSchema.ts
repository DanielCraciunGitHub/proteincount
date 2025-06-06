import { FormState } from "@/form/formZodSchema";

export const activityLevels = [
  "sedentary",
  "lightly-active",
  "active",
  "very-active",
] as const;

export const heightUnits = ["cm", "feet"] as const;

export const weightUnits = ["kg", "lbs"] as const;

export const dietTypes = [
  "balanced",
  "vegetarian",
  "pescitarian",
  "vegan",
  "carnivore",
  "keto",
  "low-carb",
  "low-fat",
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
  "tree-nuts",
  "fish",
  "shellfish",
] as const;

type FormDataItemType =
  | "text"
  | "number"
  | "select"
  | "toggle-group"
  | "checkbox"
  | "radio"
  | "mealsInput"
  | "divider"
  | "textarea"
  | "multi-toggle-group"
  | "slider"
  | "heightInput"
  | "weightInput";

export type FormDataItem = {
  key: keyof FormState | "divider";
  type: FormDataItemType;
  label: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

export const mealsSectionSchema: FormDataItem[] = [
  {
    key: "meals",
    type: "mealsInput",
    label: "",
    required: true,
  },
];

export const personalInfoSchema: FormDataItem[] = [
  {
    key: "name",
    type: "text",
    label: "Name",
  },
  {
    key: "age",
    type: "number",
    label: "Age",
    required: true,
  },
  {
    key: "gender",
    type: "toggle-group",
    label: "Gender",
    options: [...gender],
    required: true,
  },
];

export const metricsSchema: FormDataItem[] = [
  {
    key: "height",
    type: "heightInput",
    label: "Height",
    options: [...heightUnits],
    required: true,
  },
  {
    key: "weight",
    type: "weightInput",
    label: "Weight",
    options: [...weightUnits],
    required: true,
  },
  {
    key: "activityLevel",
    type: "toggle-group",
    label: "Activity Level",
    options: [...activityLevels],
    required: true,
  },
  {
    key: "dietType",
    type: "toggle-group",
    label: "Diet Type",
    options: [...dietTypes],
    required: true,
  },
  {
    key: "allergies",
    type: "multi-toggle-group",
    label: "Allergies",
    options: [...allergies],
  },
];

export const formDataSchema: FormDataItem[] = [
  ...personalInfoSchema,
  {
    key: "divider",
    type: "divider",
    label: "",
  },
  ...metricsSchema,
  {
    key: "divider",
    type: "divider",
    label: "",
  },
  ...mealsSectionSchema,
];
