import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { gptValidationSchema } from "@/types/validations/gpt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ChatCompletionResponse = {
  content: string;
  role: "assistant" | "user" | "system";
};

export async function getProteinCountCompletion(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  model: string = "gpt-4o-mini"
) {
  try {
    const response = await openai.responses.parse({
      model,
      input: messages,
      text: {
        format: zodTextFormat(gptValidationSchema, "gpt_response"),
      },
    });

    const message = response.output_parsed;
    if (!message) {
      throw new Error("No response from OpenAI");
    }

    return message;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
