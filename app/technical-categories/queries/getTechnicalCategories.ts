import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetTechnicalCategoriesInput
  extends Pick<
    Prisma.TechnicalCategoryFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({
    where,
    orderBy,
    skip = 0,
    take = 100,
  }: GetTechnicalCategoriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: technicalCategories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.technicalCategory.count({ where }),
      query: (paginateArgs) =>
        db.technicalCategory.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      technicalCategories,
      nextPage,
      hasMore,
      count,
    };
  }
);
