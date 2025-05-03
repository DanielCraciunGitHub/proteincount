import {
  activityLevels,
  allergies,
  dietTypes,
  FormState,
  heightUnits,
  weightUnits,
} from "@/types/validations/form";

export type FormDataItem = {
  key: keyof FormState;
  type:
    | "text"
    | "number"
    | "select"
    | "toggle-group"
    | "checkbox"
    | "radio"
    | "mealsInput"
    | "divider"
    | "textarea"
    | "allergiesToggle"
    | "slider"
    | "heightInput"
    | "weightInput";
  label: string;
  options?: string[];
  placeholder?: string;
};

export const mealsSectionSchema: FormDataItem[] = [
  {
    key: "meals",
    type: "mealsInput",
    label: "Meals",
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
  },
  {
    key: "gender",
    type: "toggle-group",
    label: "Gender",
    options: ["male", "female"],
  },
];

export const metricsSchema: FormDataItem[] = [
  {
    key: "height",
    type: "heightInput",
    label: "Height",
    options: [...heightUnits],
  },
  {
    key: "weight",
    type: "weightInput",
    label: "Weight",
    options: [...weightUnits],
  },
  {
    key: "activityLevel",
    type: "toggle-group",
    label: "Activity Level",
    options: [...activityLevels],
  },
  {
    key: "dietType",
    type: "toggle-group",
    label: "Diet Type",
    options: [...dietTypes],
  },
  {
    key: "allergies",
    type: "allergiesToggle",
    label: "Allergies",
    options: [...allergies],
  },
];

export const formDataSchema: FormDataItem[] = [
  ...personalInfoSchema,
  ...metricsSchema,
  ...mealsSectionSchema,
];
