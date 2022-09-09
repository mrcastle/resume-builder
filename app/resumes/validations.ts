import {
  TechnicalCategory,
  UpdateTechnicalCategory,
} from "app/technical-categories/validations";
import { z } from "zod";

export const CreateResume = z.object({
  title: z.string(),
  userDisplayName: z.string(),
  summary: z.string(),
  technicalCategories: z.array(TechnicalCategory),
});

export const UpdateResume = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string(),
  userDisplayName: z.string(),
  technicalCategories: z.array(UpdateTechnicalCategory),
});
