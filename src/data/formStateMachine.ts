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
  initial: "personalInfo",

  states: {
    personalInfo: {
      on: {
        NEXT: "personalInfoConfirmation",
      },
    },
    personalInfoConfirmation: {
      on: {
        NEXT: "mealQuestions",
        BACK: "personalInfo",
      },
    },
    mealQuestions: {
      on: {
        NEXT: "mealQuestionsConfirmation",
        BACK: "personalInfoConfirmation",
      },
    },
    mealQuestionsConfirmation: {
      on: {
        NEXT: "finalConfirmation",
        BACK: "mealQuestions",
      },
    },
    finalConfirmation: {
      on: {
        SUBMIT: "submit",
        BACK: "mealQuestionsConfirmation",
      },
    },
    submit: { type: "final" },
  },
});
