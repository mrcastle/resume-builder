import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateResume } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateResume),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    console.log("data", data);
    const resume = await db.resume.update({
      where: { id },
      data: {
        ...data,
        technicalCategories: {
          // deleteMany: { // ---> It will delete all "other" data not included in "others" list
          //   somethingId: id,
          //   NOT: others.map(({ id }) => ({ id })),
          // },
          upsert: data.technicalCategories.map((category) => ({
            where: { id: category.id || 0 },
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
