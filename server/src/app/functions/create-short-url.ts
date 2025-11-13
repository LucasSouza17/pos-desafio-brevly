import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight } from "@/shared/either";

const createShortUrlInput = z.object({
  fullUrl: z.url(),
  slug: z.string()
})

type CreateShortUrlInput = z.infer<typeof createShortUrlInput>

export async function createShortUrl(input: CreateShortUrlInput) {
  const parsed = createShortUrlInput.safeParse(input)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    const field = issue.path.join(".")
    const message = issue.message

    return makeLeft({
      statusCode: 400,
      message,
      field,
    })
  }

  const { fullUrl, slug } = parsed.data

  const sanitizedSlug = slug
    .replace(/\s+/g, "_")       // troca espaços por underscore
    .replace(/[^a-zA-Z0-9_]/g, "") // mantém letras, números, _ e -

  const urlExists = await db
    .select()
    .from(schema.urls)
    .where(eq(schema.urls.shortUrl, sanitizedSlug))
    .limit(1)

  if (urlExists.length > 0) {
    return makeLeft({
      statusCode: 400,
      message: "Short url already exists",
      field: "shortUrl",
    })
  }

  const result = await db.insert(schema.urls).values({
    fullUrl,
    shortUrl: sanitizedSlug,
  }).returning()

  const createdUrl = result[0]

  return makeRight({ ...createdUrl })
}