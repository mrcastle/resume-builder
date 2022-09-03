import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateResume } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateResume),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const resume = await db.resume.update({
      where: { id },
      data: {
        ...data,
        technicalCategories: {
          deleteMany: {
            // delete any categories that are not in the included array
            resumeId: id,
            NOT: data.technicalCategories.map(({ id }) => ({ id })),
          },
          upsert: data.technicalCategories.map((category) => ({
            where: { id: category.id ?? 0 },
            create: category,
            update: category,
          })),
        },
      },
      include: {
        technicalCategories: true,
      },
    });

    return resume;
  }
);
