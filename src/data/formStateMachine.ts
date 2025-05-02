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
  initial: "personal",

  states: {
    personal: {
      on: {
        NEXT: "metrics",
      },
    },
    metrics: {
      on: {
        NEXT: "meals",
        BACK: "personal",
      },
    },
    meals: {
      on: {
        NEXT: "confirm",
        BACK: "metrics",
      },
    },
    confirm: {
      on: {
        SUBMIT: "submit",
        BACK: "meals",
      },
    },
    submit: { type: "final" },
  },
});
