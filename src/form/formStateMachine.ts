"use client";

import { setup } from "xstate";

import { FormLocalStorage } from "./logic/formLocalStorage";

export type FormEvents =
  | { type: "NEXT" }
  | { type: "SUBMIT" }
  | { type: "BACK" }
  | { type: "RESTORE" };

export const formMachine = setup({
  types: {
    context: {},
    events: {} as FormEvents,
  },
  actions: {
    saveState: (_, params: { value: string }) => {
      FormLocalStorage.saveState(params.value);
    },
  },
}).createMachine({
  context: {},
  initial: FormLocalStorage.getState() || "personal_questions",

  states: {
    personal_questions: {
      on: {
        NEXT: {
          target: "your_metrics",
          actions: [
            { type: "saveState", params: { value: "your_metrics" } },
          ],
        },
      },
    },
    your_metrics: {
      on: {
        NEXT: {
          target: "meal_questions",
          actions: [
            { type: "saveState", params: { value: "meal_questions" } },
          ],
        },
        BACK: {
          target: "personal_questions",
          actions: [
            { type: "saveState", params: { value: "personal_questions" } },
          ],
        },
      },
    },
    meal_questions: {
      on: {
        NEXT: {
          target: "confirm",
          actions: [{ type: "saveState", params: { value: "confirm" } }],
        },
        BACK: {
          target: "your_metrics",
          actions: [
            { type: "saveState", params: { value: "your_metrics" } },
          ],
        },
      },
    },
    confirm: {
      on: {
        SUBMIT: "submit",
        BACK: {
          target: "meal_questions",
          actions: [
            { type: "saveState", params: { value: "meal_questions" } },
          ],
        },
      },
    },
    submit: { type: "final" },
  },
});
