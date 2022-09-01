import { resolver } from "@blitzjs/rpc";
import db from "db";
import { UpdateTechnicalCategory } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateTechnicalCategory),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalCategory = await db.technicalCategory.update({
      where: { id },
      data,
    });

    return technicalCategory;
  }
);
