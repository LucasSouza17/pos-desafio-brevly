import { api } from "./api-client";

interface DeleteUrlRequest {
  slug: string,
}

export async function deleteUrl({ slug }: DeleteUrlRequest): Promise<void> {
  await api.delete(`/urls/${slug}`);

  return;
}