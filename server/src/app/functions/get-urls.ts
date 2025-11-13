import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";

export async function getUrls() {
  const urls = await db.select().from(schema.urls)

  return makeRight({ urls: urls })
}