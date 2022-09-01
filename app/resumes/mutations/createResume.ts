import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateResume } from "../validations";

export default resolver.pipe(
  resolver.zod(CreateResume),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resume = await db.resume.create({
      data: {
        ...input,
        technicalCategories: { create: input.technicalCategories },
      },
    });

    return resume;
  }
);
