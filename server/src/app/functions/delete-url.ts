import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";

const deleteUrlInput = z.object({
  shortUrl: z.string(),
})

type DeleteUrlInput = z.infer<typeof deleteUrlInput>

export async function deleteUrl(input: DeleteUrlInput) {
  const { shortUrl } = deleteUrlInput.parse(input)

  await db.delete(schema.urls).where(eq(schema.urls.shortUrl, shortUrl))

  return makeRight({})
}