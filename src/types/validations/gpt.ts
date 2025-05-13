import { z } from "zod";

export const gptValidationSchema = z.object({
  proteinLowerBound: z.number(),
  proteinUpperBound: z.number(),
  proteinEstimate: z.number(),
});
