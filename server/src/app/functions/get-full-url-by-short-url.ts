import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const getFullUrlByShortUrlInput = z.object({
  shortUrl: z.string(),
})

type GetFullUrlByShortUrlInput = z.infer<typeof getFullUrlByShortUrlInput>

export async function getFullUrlByShortUrl(input: GetFullUrlByShortUrlInput) {
  const { shortUrl } = getFullUrlByShortUrlInput.parse(input)

  const response = await db.select().from(schema.urls).where(eq(schema.urls.shortUrl, shortUrl)).limit(1)

  if (response.length === 0) {
    return makeLeft({ type: 'NOT_FOUND', message: 'Short URL not found' })
  }

  const fullUrl = response[0].fullUrl

  return makeRight({ fullUrl: fullUrl })
}