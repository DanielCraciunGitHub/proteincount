import { FormState } from "@/types/validations/form";

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
    | "allergiesDropdown"
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
  },
  {
    key: "weight",
    type: "weightInput",
    label: "Weight",
  },
  {
    key: "activityLevel",
    type: "toggle-group",
    label: "Activity Level",
    options: ["sedentary", "lightly active", "active", "very active"],
  },
  {
    key: "dietType",
    type: "toggle-group",
    label: "Diet Type",
    options: [
      "vegetarian",
      "vegan",
      "pescitarian",
      "no diet",
      "carnivore",
    ],
  },
];

export const formDataSchema: FormDataItem[] = [
  ...personalInfoSchema,
  ...metricsSchema,
  ...mealsSectionSchema,
];
