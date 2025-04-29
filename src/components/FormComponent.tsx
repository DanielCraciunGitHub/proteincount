"use client";

import { useRouter } from "next/navigation";
import { formDataSchema } from "@/data/formDataSchema";
import { formMachine } from "@/data/formStateMachine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMachine } from "@xstate/react";
import { useForm } from "react-hook-form";

import { FormState, formStateSchema } from "@/types/validations/form";

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
      age: 0,
      allergies: [],
      activityLevel: "sedentary",
      dietType: "no diet",
      gender: "male",
      height: 0,
      weight: 0,
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
        className="flex flex-col gap-4"
      >
        <h1>Form</h1>
        <h2>{state.value}</h2>
        {state.matches("personalInfo") &&
          formDataSchema
            .slice(0, -1)
            .map((field, index) => (
              <DynamicField
                key={`${field.key}-${index}`}
                fieldData={field}
                form={form}
              />
            ))}
        <div className="flex gap-2">
          <Button type="button" onClick={() => send({ type: "BACK" })}>
            Back
          </Button>
          {state.matches("finalConfirmation") ? (
            <Button
              variant="destructive"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          ) : (
            <Button type="button" onClick={() => send({ type: "NEXT" })}>
              Next
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
