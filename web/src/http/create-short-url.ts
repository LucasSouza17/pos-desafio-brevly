import { api } from "./api-client";

interface CreateShortUrlRequest {
  fullUrl: string
  slug: string,
}

export async function createShortUrl({ slug, fullUrl }: CreateShortUrlRequest) {
  await api.post(`/urls`, { slug, fullUrl });

  return;
}