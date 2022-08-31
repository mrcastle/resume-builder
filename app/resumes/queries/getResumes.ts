import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetResumesInput
  extends Pick<
    Prisma.ResumeFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetResumesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: resumes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.resume.count({ where }),
      query: (paginateArgs) =>
        db.resume.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      resumes,
      nextPage,
      hasMore,
      count,
    };
  }
);
