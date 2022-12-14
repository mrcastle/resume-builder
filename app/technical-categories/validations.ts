import { z } from "zod";

export const TechnicalCategory = z.object({
  name: z.string(),
  skills: z.array(z.string()),
});

export const UpdateTechnicalCategory = z.object({
  id: z.number(),
  name: z.string(),
  skills: z.array(z.string()),
});
