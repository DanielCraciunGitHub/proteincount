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
    | "slider";
  label: string;
  options?: string[];
  placeholder?: string;
};

export const formDataSchema: FormDataItem[] = [
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
  {
    key: "activityLevel",
    type: "toggle-group",
    label: "Activity Level",
    options: ["sedentary", "lightly active", "active", "very active"],
  },
  {
    key: "height",
    type: "number",
    label: "Height",
  },
  {
    key: "weight",
    type: "number",
    label: "Weight",
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
  {
    key: "allergies",
    type: "allergiesDropdown",
    label: "Allergies",
  },
  {
    key: "meals",
    type: "mealsInput",
    label: "Meals",
  },
];
