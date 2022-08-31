import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateTechnicalCategory = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTechnicalCategory),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalCategory = await db.technicalCategory.create({
      data: input,
    });

    return technicalCategory;
  }
);
