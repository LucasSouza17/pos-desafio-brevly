import { eq, sql } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";

const incrementEntriesOnUrlInput = z.object({
  shortUrl: z.string(),
})

type IncrementEntriesOnUrlInput = z.infer<typeof incrementEntriesOnUrlInput>

export async function incrementEntriesOnUrl(input: IncrementEntriesOnUrlInput) {
  const { shortUrl } = incrementEntriesOnUrlInput.parse(input)

  await db
    .update(schema.urls)
    .set({ entries: sql`${schema.urls.entries} + 1` })
    .where(eq(schema.urls.shortUrl, shortUrl))

  return makeRight({})
}