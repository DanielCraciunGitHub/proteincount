"use client";

import { useRouter } from "next/navigation";
import { formMachine } from "@/data/formStateMachine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMachine } from "@xstate/react";
import { useForm } from "react-hook-form";

import { FormState, formStateSchema } from "@/types/validations/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1>Form</h1>
        <h2>{state.value}</h2>
        {state.matches("personalInfo") && (
          <div>
            <Input type="text" name="name" />
            <Input type="number" name="age" />
          </div>
        )}
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
    </div>
  );
}
