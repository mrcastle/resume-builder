import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateResume = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateResume),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const resume = await db.resume.update({ where: { id }, data });

    return resume;
  }
);
