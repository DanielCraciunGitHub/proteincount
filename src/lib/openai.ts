import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Type for chat completion response
export type ChatCompletionResponse = {
  content: string;
  role: "assistant" | "user" | "system";
};

/**
 * Send a message to OpenAI's chat completion API
 * @param messages Array of messages to send to the API
 * @param model The model to use (defaults to gpt-3.5-turbo)
 * @returns The assistant's response
 */
export async function getChatCompletion(
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  model: string = "gpt-4o-mini"
): Promise<ChatCompletionResponse> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const message = response.choices[0]?.message;
    if (!message) {
      throw new Error("No response from OpenAI");
    }

    return {
      content: message.content || "",
      role: message.role as "assistant" | "user" | "system",
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

/**
 * Example usage:
 *
 * const messages = [
 *   { role: 'system', content: 'You are a helpful assistant.' },
 *   { role: 'user', content: 'Hello, how are you?' }
 * ];
 *
 * const response = await getChatCompletion(messages);
 * console.log(response.content);
 */
