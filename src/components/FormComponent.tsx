"use client";

import { useRouter } from "next/navigation";
import {
  formDataSchema,
  mealsSectionSchema,
  metricsSchema,
  personalInfoSchema,
} from "@/data/formDataSchema";
import { formMachine } from "@/data/formStateMachine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMachine } from "@xstate/react";
import { useForm } from "react-hook-form";

import { FormState, formStateSchema } from "@/types/validations/form";
import { stateToFormTitle } from "@/lib/utils";

import { DynamicField } from "./DynamicField";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

export function FormComponent() {
  const [state, send] = useMachine(formMachine);
  const router = useRouter();

  const form = useForm<FormState>({
    resolver: zodResolver(formStateSchema),
    defaultValues: {
      name: "",
      age: undefined,
      allergies: [],
      activityLevel: undefined,
      dietType: undefined,
      gender: undefined,
      height: {
        unit: "cm",
        cm: undefined,
        feet: undefined,
        inches: undefined,
      },
      weight: {
        unit: "kg",
        kg: undefined,
        pounds: undefined,
      },
      meals: [],
    },
  });

  const onSubmit = (data: FormState) => {
    console.log(data);
    router.push("/results");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full w-full max-w-xl mx-auto px-4 sm:px-0"
      >
        {/* Header */}
        <div className="sticky top-0 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b text-center bg-background z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {stateToFormTitle(state.value)}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {state.matches("personal_questions") &&
              "Let's get to know you better."}
            {state.matches("your_metrics") && "Let's see some numbers."}
            {state.matches("meal_questions") &&
              "The fun part. Describe your meals."}
          </p>
        </div>

        {/* Content - Scrollable area */}
        <div className="flex-1 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {state.matches("personal_questions") &&
            personalInfoSchema.map((field, index) => (
              <DynamicField
                key={`${field.key}-${index}`}
                fieldData={field}
                form={form}
              />
            ))}

          {state.matches("your_metrics") &&
            metricsSchema.map((field, index) => (
              <DynamicField
                key={`${field.key}-${index}`}
                fieldData={field}
                form={form}
              />
            ))}

          {state.matches("meal_questions") &&
            mealsSectionSchema.map((field, index) => (
              <DynamicField
                key={`${field.key}-${index}`}
                fieldData={field}
                form={form}
              />
            ))}

          {state.matches("confirm") &&
            formDataSchema.map((field, index) => (
              <DynamicField
                key={`${field.key}-${index}`}
                fieldData={field}
                form={form}
              />
            ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 pt-3 sm:pt-4 pb-4 sm:pb-6 border-t bg-background z-10">
          <div className="flex justify-between gap-2">
            <Button
              type="button"
              className="min-w-[80px] sm:min-w-[100px]"
              onClick={(e) => {
                e.preventDefault();
                send({ type: "BACK" });
              }}
            >
              Back
            </Button>
            {state.matches("confirm") ? (
              <Button
                variant="destructive"
                type="submit"
                className="min-w-[80px] sm:min-w-[100px]"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="min-w-[80px] sm:min-w-[100px]"
                onClick={(e) => {
                  e.preventDefault();
                  send({ type: "NEXT" });
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
