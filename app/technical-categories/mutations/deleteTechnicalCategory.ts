import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteTechnicalCategory = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteTechnicalCategory),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalCategory = await db.technicalCategory.deleteMany({
      where: { id },
    });

    return technicalCategory;
  }
);
