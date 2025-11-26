import { api } from "./api-client";

interface IncrementAccessRequest {
  slug: string,
}

export async function incrementAccess({ slug }: IncrementAccessRequest): Promise<void> {
  await api.post(`/urls/${slug}/increment`);

  return;
}