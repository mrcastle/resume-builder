import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateResume = z.object({
  title: z.string(),
  userDisplayName: z.string(),
})

export default resolver.pipe(resolver.zod(CreateResume), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const resume = await db.resume.create({ data: input })

  return resume
})
