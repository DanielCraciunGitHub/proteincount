"use client";

import { setup } from "xstate";

export type FormEvents =
  | { type: "NEXT" }
  | { type: "SUBMIT" }
  | { type: "BACK" };

export const formMachine = setup({
  types: {
    context: {},
    events: {} as FormEvents,
  },
}).createMachine({
  context: {},
  initial: "personal_questions",

  states: {
    personal_questions: {
      on: {
        NEXT: "your_metrics",
      },
    },
    your_metrics: {
      on: {
        NEXT: "meal_questions",
        BACK: "personal_questions",
      },
    },
    meal_questions: {
      on: {
        NEXT: "confirm",
        BACK: "your_metrics",
      },
    },
    confirm: {
      on: {
        SUBMIT: "submit",
        BACK: "meal_questions",
      },
    },
    submit: { type: "final" },
  },
});
