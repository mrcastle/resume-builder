import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteResume = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteResume),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resume = await db.resume.deleteMany({ where: { id } });

    return resume;
  }
);
